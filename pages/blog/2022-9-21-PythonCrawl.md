---
slug: qiangzhi
title: 爬取强智教务系统获取课表信息
authors: Chengzihan
tags: [python, 爬虫]
---

本脚本仅用于交流学习，不得用于其他用途，如果因为恶意使用本脚本造成的一切后果，与本人无关。  

## 前言

又到了开学季，作为一个合格的大学生。每天我们都要上不同的课，前往不同的教室，需要我们一遍遍去查看课表。那么我们能不能编写一个脚本来帮我们自动获取课表呢？这篇文章就来说明我是如何使用Python爬取强智教务系统获取课表信息的。

## 获取课表接口

### 接口链接

强智系统是一个使用很广泛的系统，它的课表 API 也是统一的。经过抓包，找到了一个课表 API ，如下：  

```bash
<前缀>/jsxsd/xskb/xskb_list.do?Ves632DSdyV=NEW_XSD_PYGL
```

但是！这个 API 返回的竟然是 html 代码。那就需要我们使用**正则表达式**来提取我们需要的信息了。但这也太麻烦了，应该有 `json` 的 API 吧！果不其然，我这就发现了一个：  

```bash
<前缀>/app.do?method=getKbcxAzc&xh=<StudentID>&xnxqid=<Semester>&zc=<week>
```

注意，这是一个 POST 请求。`<前缀>` 代表你的学校的教务系统域名，请自行替换，如我的学校是：  

```bash
http://newjwxt.bjfu.edu.cn/app.do?method=getKbcxAzc&xh=<StudentID>&xnxqid=<Semester>&zc=<week>
```

### 参数说明

- `method`：固定为 `getKbcxAzc`。
- `StudentID`：学号
- `Semester`：学期，格式为 `2021-2022-1`，其中 `1` 表示第一学期，`2` 表示第二学期
- `week`：周次，从 `1` 开始

### 接口分析

现在，让我们使用 **APIFOX** 来分析一下这个 API 的返回值。填入学号、学期、周次，点击发送请求。  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1663725585999.png)

发送请求，返回值：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220921100020.png)

```bash
{
    "token": "-1"
}
```

这告诉我们，这个 API 是需要鉴权的。那么我们就需要先登录，拿到 API 的鉴权 token ，然后再发送请求。  

使用相同的方法获取登录 API ，如下：  

```bash
<前缀>/app.do?method=authUser&xh=<StudentID>&pwd=<pwd>
```

**参数说明**  

- `method`：固定为 `authUser`。
- `StudentID`：学号
- `pwd`：密码

同样，这是一个 POST 接口。填入学号密码，发送请求获取返回的 `TOKEN`。  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1663725855235.png)

返回值：  

```bash
{
    "success": true,
    "token": "eyJ0e...", // 这就是我们需要的 token
    "user": {
        "username": "你的姓名",
        "userdwmc": "你所在的学院",
        "usertype": "2",
        "userpasswd": "你的密码",
        "useraccount": "你的账号"
    },
    "usertype": "2",
    "userrealname": "你的姓名",
    "userdwmc": "你的学院"
}
```

复制返回值中的 TOKEN 值，填入课表 API 的请求参数中，发送请求。添加在 Header 中的 `token` 参数，如下：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1663726016705.png)

再次发送请求，返回值：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1663726068578.png)

这就是我们需要的课表数据 json 了。具体格式如下：  

```json
[
    {
        "jsxm": "教师姓名",
        "jsmc": "上课教室",
        "jssj": "课程开始时间",
        "kssj": "课程结束时间",
        "kkzc": "上课节数 第几到几节课",
        "kcsj": "10102",    // 课程时间
        "kcmc": "数据库应用",   // 课程名称
        "sjbz": "0"    // 未知
    },
    //...
]
```

分析各字段含义如下：  

```js
# "jsxm": "老师", // 教师姓名
# "jsmc": "一教101", // 教室名称
# "jssj": "9:35", // 结束时间
# "kssj": "08:00", // 开始时间
# "kkzc": "1", // 开课周次，有三种已知格式1)a - b、2)a, b, c、3)a - b, c - d
# "kcsj": "10102", // 课程时间，格式x0a0b，意为星期x的第a, b节上课
# "kcmc": "大学英语", // 课程名称
# "sjbz": "0" // 具体意义未知，据观察值为1时本课单周上，2时双周上
```

## 脚本编写

分析好 API 后，我们就可以开始编写脚本了。

### 创建 API 请求

首先我们必须创建 http 请求，这里我们使用 `requests` 库。并且我们要解析返回的 json 数据，这里我们使用 `json` 库。

```python
import requests
import json
```

然后创建函数执行请求,实现上面我们登录获取 Token 和获取课表的 API 的步骤。为便于管理，将各个参数封装成变量放到脚本顶部，便于修改和调用。  

```python
id = '201002001'  # 学号
pwd = 'aaa111111'  # 密码
semester = '2022-2023-1'  # 学期
```

**函数**如下：  

```python
def Crawl():
    # 登录 API
    loginLink = "http://newjwxt.bjfu.edu.cn/app.do?method=authUser&xh=" + id + "&pwd=" + pwd
    # 请求登录 API , 返回值为 json
    rep = requests.get(loginLink)
    # 解析 json
    res = json.loads(rep.text)
    # 获取返回值中的 token 字段值
    token = res["token"]
    # 课表 API
    tableUrl = "http://newjwxt.bjfu.edu.cn/app.do?method=getKbcxAzc&xh=" + id + "&xnxqid=" + semester + "&zc=" + week
    # 传入 token 参数
    header = {
        "token": token  # 鉴权
    }
    # 请求课表 API ，res 就是我们需要的课表数据
    res = requests.get(url=tableUrl, headers=header)
    schedule = json.loads(res.text)  # 读取课表 json
    # 打印课表
    print(schedule)
```

### 获取当前周次

我们想要的是完全自动化，每周手动改脚本算什么？！因此，我们来获取当前周次。要使用时间模块，我们需要先导入 `datetime` 模块。  

```python
import datetime
```  

脚本：  

```python
# 判断当前日期所在周数
def getWeek():
    # 获取现在时间
    now = datetime.datetime.now()
    # 第一周
    firstWeek = datetime.datetime.strptime(firstDay, '%Y-%m-%d')
    # 当前周数, 从第一周开始
    week = (now - firstWeek).days // 7 + 1
    print("第" + str(week) + "周")
    return week
```

### 获取今天星期几

课表是按照星期几排布的，所以我们需要获取今天是星期几。函数也很简单，如下：  

```python
# 判断今天星期几
def getWeekDay():
    d = datetime.datetime.now()
    weekd = d.weekday() + 1
    print("星期" + str(weekd))
    return int(weekd)
```

### 获取现在的时间应该在上哪节课  

这一步就稍微有点复杂了，不过也很好理解，我们需要判断当前时间在课表的哪个时间段，来判断现在应该要上哪一节课。  

先获取现在的时间，由于我想要提前进行提醒，所以我把时间**推迟**20分钟，这样就可以提前20分钟提醒了。（就是说要去查询20分钟后的课程）  

```python
# 获取现在时间
now = datetime.datetime.now()
# 获取现在时间的小时和分钟
hour = now.hour
minute = now.minute + 20 # 查询20分钟后的课程
second = now.second
# 分钟加20后，可能需要进行进位，如果分钟大于60，小时加1，分钟减60
if minute >= 60:
    hour += 1
    minute -= 60
```

接着，我们要把处理好的时间转换成字符串，方便后面的比较。  

```python
# 如果小时小于10，前面加0
if hour<=10:
    nowTime = '0' + str(hour) + ':' + str(minute) + ':' + str(second)
else :
    nowTime = str(hour) + ':' + str(minute) + ':' + str(second)
# 如果进位后时间为 24：00：00 ，则改为 00：00：00
if hour==24:
    nowTime = '00' + ':' + str(minute) + ':' + str(second)
```

然后，我们要判断现在时间在课表的哪个时间段，来判断现在应该要上哪一节课。我们**把课表的几个关键点创建为变量**。例如，我们学校的时间表如下：  

```bash
# 8:00-9:35 第1-2节
# 9:50-12:15 第3-5节
# 13:30-15:05 第6-7节
# 15:20-16:55 第8-9节
# 18:30-20:55 第10-12节
```

我们只需要记录开始时间。  

```python
dt1 = datetime.datetime.strptime('08:00:00', '%H:%M:%S')
dt2 = datetime.datetime.strptime('09:50:00', '%H:%M:%S')
dt3 = datetime.datetime.strptime('13:30:00', '%H:%M:%S')
dt4 = datetime.datetime.strptime('15:20:00', '%H:%M:%S')
dt5 = datetime.datetime.strptime('18:30:00', '%H:%M:%S')
```

将现在的时间（准确来说是二十分钟后的时间）存为变量。

```python
dtNow = datetime.datetime.strptime(nowTime, '%H:%M:%S')
```

然后计算整个时间段的秒数。例如 `8:00-9:35` 的秒数为 `95 * 60 = 5700`，依此类推。用**现在的时间减去课程开始的时间**，如果结果大于 0 且小于这个时间段的秒数，那么就是在这个时间段。  

```python  
if 0 <= (dtNow - dt1).seconds < 5700:
    return 1
elif 0 <= (dtNow - dt2).seconds < 8700:
    return 3
elif 0 <= (dtNow - dt3).seconds < 5700:
    return 6
elif 0 <= (dtNow - dt4).seconds < 5700:
    return 8
elif 0 <= (dtNow - dt5).seconds < 8700:
    return 10
else:
    return -1
```

该函数的完整代码：  

<details>

```python
# 判断当前所在第几节课
def getNowClass():
    # 获取现在时间
    now = datetime.datetime.now()
    # 获取现在时间的小时和分钟
    year = now.year
    hour = now.hour
    minute = now.minute + 20
    second = now.second
    # 如果分钟大于60，小时加1，分钟减60
    if minute >= 60:
        hour += 1
        minute -= 60
    # 拼接为时间格式
    if hour <= 10:
        nowTime = '0' + str(hour) + ':' + str(minute) + ':' + str(second)
    else:
        nowTime = str(hour) + ':' + str(minute) + ':' + str(second)

    if hour == 24:
        nowTime = '00' + ':' + str(minute) + ':' + str(second)
    # 判断当前时间所在第几节课
    # 如果当前时间位于 8:00 到 9:35 之间，返回 1
    dt1 = datetime.datetime.strptime('08:30:00', '%H:%M:%S')
    dt2 = datetime.datetime.strptime('09:50:00', '%H:%M:%S')
    dt3 = datetime.datetime.strptime('13:30:00', '%H:%M:%S')
    dt4 = datetime.datetime.strptime('15:20:00', '%H:%M:%S')
    dt5 = datetime.datetime.strptime('18:30:00', '%H:%M:%S')
    dtNow = datetime.datetime.strptime(nowTime, '%H:%M:%S')
    # print((dtNow - dt1).seconds)
    if 0 <= (dtNow - dt1).seconds < 5700:
        return 1
    elif 0 <= (dtNow - dt2).seconds < 8700:
        return 3
    elif 0 <= (dtNow - dt3).seconds < 5700:
        return 6
    elif 0 <= (dtNow - dt4).seconds < 5700:
        return 8
    elif 0 <= (dtNow - dt5).seconds < 8700:
        return 10
    else:
        return -1

```

</details>

### 解析 json 为列表字典

现在我们要将 json 数据按照**星期几**和**第几节课**进行解析，存为列表。由于我们的 json 每条数据的格式为：  

```json
{'jsxm': '无', 'jsmc': '无', 'jssj': '00:00', 'kssj': '00:00', 'kkzc': '0', 'kcsj': '00000', 'kcmc': '本节无课','sjbz': '0'}
```

那我们就可以初始化一个二维列表，每个元素都是一个上面的模板值。  

```python
table = [[{'jsxm': '无', 'jsmc': '无', 'jssj': '00:00', 'kssj': '00:00', 'kkzc': '0', 'kcsj': '00000', 'kcmc': '无课',
              'sjbz': '0'} for i in range(1, 100)] for j in range(1, 100)]
```

:::tip 列表推导
这是 Python 语法中一个列表推导(List Comprehension)的例子，可以用来初始化一个列表。  

```python
arr = [0 for i in range(1000)]
```

`for` 前面的 `0` 表示列表中的每个元素都是 `0`，`for` 后面的 `i` 表示循环变量，`range(1000)` 表示循环 1000 次。同理，也可以举一反三初始化一个字符串列表：  

```python
arr = ['' for i in range(1000)]
```

它们的区别只是 `for` 前面的值不同。同理，也可以初始化一个字典列表：  

```python
arr = [{'name': '无', 'age': 0} for i in range(1000)]
```

:::

现在，我们可以把 `schedule` 变量中的数据按照**星期几**和**第几节课**进行解析，存为列表了。  

等一下，怎么获取这节课是星期几上的呢？别急，我们来复习一下 课表json 的结构。  

```js
# "jsxm": "老师", // 教师姓名
# "jsmc": "一教101", // 教室名称
# "jssj": "9:35", // 结束时间
# "kssj": "08:00", // 开始时间
# "kkzc": "1", // 开课周次，有三种已知格式1)a - b、2)a, b, c、3)a - b, c - d
// highlight-start
# "kcsj": "10102", // 课程时间，格式x0a0b，意为星期x的第a, b节上课
// highlight-end
# "kcmc": "大学英语", // 课程名称
# "sjbz": "0" // 具体意义未知，据观察值为1时本课单周上，2时双周上
```

仔细看看 `kcsj` 这个字段，它的格式是 `x0a0b`，意为星期 x 的第 a, b 节上课。那么我们提取出这个字段的第一个数，不就是星期几了吗，获取到第二、三个数，不就是第几节课了吗。  

如 `"kcsj": "10102"` 标识周1第1、2节课上课，那么我们就可以把这个课程信息存到 `table[1][1]`中。  

```python
i['kcsj'][1] # 第二个数 下标从0开始,在10102中为0
i['kcsj'][2] # 第三个数 下标从0开始,在10102中为1
```

然后将其拼接并转为整数：  

```python
classNum = int(i['kcsj'][1] + i['kcsj'][2])
```

这一部分的完整代码：  

```python
# 将 schedule 中的课程信息赋值给 table
for i in schedule:
    # 课程的节数
    classNum = int(i['kcsj'][1] + i['kcsj'][2])
    # 将课程信息写入列表
    # 课程在星期几
    wd = int(i['kcsj'][0])
    table[wd][classNum] = i
```

### 查询当前课程

获取现在的星期和节数，就可以从 table 中查询到当前上的课了。  

```python
def QueryClass():
    nowClass = getNowClass()    # 获取当前节数
    nowWd = getWeekDay()    # 获取当前星期几
    if nowClass == -1:
        print("当前无课")
    else:
        print("当前第" + str(nowClass) + "节课")
    print(table[nowWd][nowClass])
    return table[nowWd][nowClass]
```

### 脚本仓库

已开源：[代码地址](https://github.com/inannan423/classCrawl)

## 运行结果

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1663729680933.png)

## 应用

使用此脚本，你可以将其部署到你的服务器，推送到微信，或者使用此接口编写课表小程序。

## 安全提示

:::warning
本脚本涉及隐私（包含学号和密码）使用时请自己部署自己使用，不要泄露给他人。如果要分享脚本，请删除上述信息。
:::

## 支持我

如果您觉得这篇文章有帮到您，请到 GitHub 为我留下一颗 ⭐ 。
