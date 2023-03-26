---
title: Flask（PythonWeb）+MongoDB 实现简单Web后端
date: 2022-10-27  
authors: Chengzihan
tags: [Flask,MongoDB]
---
## 介绍

Flask 是一个基于 Python 的 Web 后端框架。通过 Flask 可以快速写出一个 API 接口。MongoDB 是一个基于分布式文件存储的数据库。本文将介绍如何使用 Flask 和 MongoDB 实现简单的 Web 后端。  

## 前端部分

由于涉及插值以及条件渲染，这里简单地使用到了 Vue.js 框架。首先进行框架引入：

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

接着，创建基本的输入框和按钮：

```html
<body>
    <div id="app" class="main">
        <h1>输入姓名查询学号</h1>
        <!-- 值绑定，监听输入框的内容变化，如果 Input 内内容改变，data.id就改变为这个值 -->
        <input v-model="id" type="text" placeholder="学号" />
        <!-- @onclick 触发事件名，后面的函数在 method 中 -->
        <button class="button" id="signIn" @click="Query">查询</button>
    </div>
</body>
```

在这里，我们将数据用 `v-model` 方法绑定到 `input` 之上，当 `input` 的值发生变化时，数据值也会发生变化。当我们点击 `button` 时，我们将调用 `Query` 函数。

下面，创造 Vue 实例：  

注意，上面的 `div` 被绑定了实例名 `app`。  

```jsx
<div id="app" class="main">
    <!-- ... -->
</div>
```

那么，现在我们就可以在 `script` 中创建 Vue 实例了：

```html
<script>
    // 创建vue实例
    const app = new Vue({
        // 交代宿主是谁，id用 # 查询
        el: "#app",
        // 数据容器
        data: {
            id:"",
            result:"",
        },
        // 函数方法
        methods: {
            Query() {
                // ... 查询方法
            }
        },
    })
</script>
```

在这里可以看到，我们在 `data` 中初始化了两个变量，分别是 `id` 和 `result`。`id` 用于存储输入框的值，`result` 用于存储查询结果。当 `input` 的值发生变化时，`id` 的值也会跟踪发生变化。  

用 VScode 插件 `Live Server` 启动一个本地服务器，打开 `index.html`（或直接打开），可以看到如下界面：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221028101028.png)

## Flask API接口

接下来，我们需要实现一个 API 接口，用于接收前端传来的数据，查询数据库，返回查询结果。  

在 Python 中，`import` 用于导入模块，`from` 用于导入模块中的某个函数。这里需要 Flask 的 `Flask` 和 `request` 函数，用于实现http服务器。  

```python
from flask import Flask, request
```

为了服务器能被直接访问，我们需要设置跨域访问。  

```python
from flask_cors import CORS

CORS(app, resources=r'/*')  # 注册 CORS, "/*" 允许访问所有api
```

接着，可以创建一个 Flask 实例：  

```python
app = Flask(__name__)
```

然后，我们需要创建一个路由，用于接收前端传来的数据，接受使用 GET 进行访问，访问路径为 `/getname`：  

```python
@app.route('/getname', methods=['GET'])
```

接着，我们需要获取前端传来的数据，这里我们需要用到 `request` 函数，它可以获取前端传来的数据：  

```python
def check():
    # 默认返回内容，result是根据查询结果要返回的
    return_dict = {'return_code': '200', 'return_info': '处理成功', 'result': False}
    # 判断入参是否为空
    if request.args is None:
        return_dict['return_code'] = '5004'
        return_dict['return_info'] = '请求参数为空'
        # 告知前端，查询失败
        return json.dumps(return_dict, ensure_ascii=False)
    # 获取传入的参数
    get_data = request.args.to_dict()
    # 获取参数中名为 ID 的参数值
    ID = get_data.get('ID')
    # 对参数进行操作，用 ID 去查询数据库
    return_dict['result'] = getMongo(ID)
    # 返回查询结果
    return json.dumps(return_dict, ensure_ascii=False)
```

在这里，还没有写查询数据库的方法，我们先把这个方法写出来一个简单的应答，然后一会再去实现查询数据库的方法。  

```python
def getMongo(ID):
    # 这里是查询数据库的方法
    # 这里先返回一个简单的应答
    return True
```

最后，在主函数中，启动 Flask 服务器：  

```python
if __name__ == "__main__":
    app.run(debug=True)
```

这里的 `debug=True` 是为了方便调试，可以在控制台看到错误信息。并在本地进行运行。

## 接口测试

这里，我们先不管数据库，对接口进行简单的测试。在这里，我使用 [Apifox](https://www.apifox.cn/)，进行接口测试。下载后打开。  

点击新建团队：  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666923789380.png)

然后，新建项目：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666923831156.png)

打开项目后，选择**快捷请求**：  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666923863144.png)

在 Pycharm 中，运行 `getname.py`。  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221028102543.png)

可以看到下方控制台提示，服务器已经启动。访问地址为 `http://127.0.0.0:5000`。我们复制这个地址，然后在 Apifox 中，粘贴到地址栏中，在地址后添加访问的接口名：`/getname`，填写 Params 参数 ID 的值，随便填一个，因为上面写了无论什么时候都返回 True，所以预期结果是 True，点击发送：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666924468361.png)  

可以看到，下面的控制台提示，接口调用成功（200，OK），返回结果为 True。  

现在，可以关闭 Apifox 了。

## 在前端中请求接口  

上面 Vue 代码中，我们空了一个方法 `Query()`，这个方法就是用来请求接口的。现在我们使用 `XMLHttpRequest` 对象来请求接口。  

首先初始化一个 `XMLHttpRequest` 对象：  

```javascript
const request = new XMLHttpRequest();
```

接着，去发起请求：  

```javascript
request.open("GET", "http://127.0.0.1:5000/getname" +"?ID="+ this.id);
```

这里的 `GET` 是请求方式，`http://127.0.0.1:5000` 是服务器地址，`/getname` 是接口名，`?ID=` 是参数名，`this.id` 是参数值。`this.id` 是在 Vue 中调用一个变量的方法。接着，监听请求状态：  

```javascript
request.onreadystatechange = () => {
    // readyState 为 4 时，请求已完成，request.status 为 200 时，请求成功
    if (request.readyState === 4 && request.status === 200) {
        // 格式化返回值为json
        const obj = JSON.parse(request.responseText);
        // 打印来看看
        console.log(obj);
        // 让 data 里面的 result 变成这个值
        this.result = obj.result;
        // 打印来看看
        console.log(this.result);
    }
};
```

最后，发送请求：  

```javascript
request.send();
```

完整的 `Query()` 方法如下：  

```javascript
Query() {
    console.log(this.id);
    // 开始 http 请求
    const request = new XMLHttpRequest();   // Ajax 初始化异步请求
    // 发起 http 请求
    request.open("GET", "http://127.0.0.1:5000/getname" +"?ID="+ this.id);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            // 格式化返回值为json
            const obj = JSON.parse(request.responseText);
            // 让 data 里面的 result 变成这个值
            this.result = obj.result;
            console.log(this.result);
        }
    };
    request.send();
    // end
}
```

在保持 Pycharm 运行的情况下，我们在浏览器中打开 `index.html`，输入 ID，点击查询，按F12查看控制台打印，可以看到服务器向前端返回了 一条应答，状态码为 200，OK，返回结果为 True。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666925074800.png)

## MongoDB 数据库

倘若你不需要配置数据库，或者用 csv 本地文件代替数据库，可以跳过这一节。上面就够用了，你只需要将 MongoDB 函数改写成查询自己的 csv 文件即可。  

### 注册 MongoDB 账号

MongoDB 数据库为每个用户提供了 512MB 的免费存储空间，你可以在 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 上注册一个免费的数据库。（用来存储你的任务数据完全足够了）  
Mongo Atlas 提供云数据库服务，这意味着你可以在远程访问你的数据库，而不需要在本地搭建数据库。  

### 账号注册

你首先需要注册一个 MongoDB 账号，点击 [这里](https://www.mongodb.com/cloud/atlas/register) 注册。这可能需要你提供邮箱等个人信息。  

### 创建数据库

登陆后，你将看到下面的界面：  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027084814.png)  

点击右上角 Create 。  

选择 **shared** 类型的集群，接着选择一家服务提供商，这里是亚马逊，当然，可以试一下微软的 Azure ，说不定国内访问更快。然后选择一个离你最近的地区，比如中国香港，点击 **Create Cluster** 。  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027085107.png)  

点击右下角的 **Create Cluster** 。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027085308.png)  

在出现的窗口中，添加连接 IP 地址。我们需要允许从任何地方访问。因此，单击“允许从任何地方访问”按钮，然后单击“添加 IP 地址”进行设置。选择云环境，即Cloud Environment，IP 地址填写为 `0.0.0.0`。  

接下来，我们需要创建一个用户来连接到此数据库。在“创建数据库用户”窗体上，输入自定义用户名、密码，然后单击“创建数据库用户”。请记住这个密码。

### 连接数据库

点击 **Connect**按钮，连接数据库。  
![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666832058438.png)

选择 **Connect your application** ，然后选择 **Python** ，接着选择 **3.12 or later** 。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666925390219.png)

接着，出现了一个连接地址，不勾选 "Include full example" 这个地址就是你的数据库连接地址，你需要将它复制下来，稍后会用到。（请一定妥善保存）  

链接格式如下：  

```md
mongodb+srv://YourName:<password>@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority
```

将其中的 `<password>` 替换为刚刚你输入的自定义密码。这个才是需要用到的代码，请妥善保存。  

举例：  

```md
mongodb+srv://inannan:12345678@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 创建数据集

点击集群名 Cluster0 进入集群。点击添加数据库：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666832678590.png)  

图中有其他数据库，不用管。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221028105200.png)  

创建成功：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666925551416.png)

插入几条示例数据：  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666925695569.png)

重复几次，示例如下：  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221028105537.png)  

OK了。  

现在我们来看看如何在 Python 中使用 MongoDB。  

首先引入需要的依赖：  

```python
import json
from flask_cors import CORS
import pymongo
from bson import json_util
```

查询过程：  

```python
def getMongo(ID):
    # 链接 MongoDB atlas
    myclient = pymongo.MongoClient('mongodb+srv://inannan:12345678@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority') # 数据库的连接地址，改成你自己的
    mydb = myclient['mydb']  # 数据库名称
    mycol = mydb['db1']  # 集合名称
    myquery = {"id": ID}    # 查询条件
    mydoc = mycol.find(myquery)     # 查询结果
    # 取出其中的数据格式为json
    for x in mydoc:
        # 将x转换为对象
        x = json.loads(json_util.dumps(x))
        print(x)
        return x
```

这里，返回的是一个对象。  

重新打开 Apifox，创建一个新的接口，接口地址为：`/getname`，请求方式为 `GET`。携带参数 `ID`，值为 `201000000`，因为上面在 Mongodb 中插入的数据中，有一个 `id` 为 `201000000` 的数据。所以这里就用这个值来测试。  

由此可见，我们已经成功的从 MongoDB 中查询到了数据。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666926021403.png)  

返回的结果是一个 `json` 数据，例如：  

```json
{
    "return_code": "200", 
    "return_info": "处理成功", 
    "result": {
        "_id": {"$oid": "635a918c1be53239a161f777"}, 
        "id": "201000000",
        "name": "JZ", 
        "class": "数媒20"
    }
}
```

可以这样访问 `name` 的值：  

```javascript
result.name
```

让我们修改前端页面，将数据展示出来。首先创建结果显示框，使用条件渲染，当 `result` 有值时，才显示结果。  
  
```html
<div v-if="result">
    姓名：{{result.name}}
    <br/>
    班级：{{result.class}}
</div>
```

## Flask 多个接口

我们可以创建多个接口，例如：  

```python
@app.route('/getname', methods=['GET'])
def getname():
    ID = request.args.get('ID')
    result = getMongo(ID)
    return jsonify(result)

@app.route('/getclass', methods=['GET'])
def getclass():
    ID = request.args.get('ID')
    result = getMongo(ID)
    return jsonify(result)
```

在访问时，只需要在接口地址后面加上 `/getname` 或者 `/getclass` 即可。  

## 扩展应用

这只是最简单的一个例子，实际上，我们可以在这个基础上做很多事情。例如：  

- 实现 MongoDB 的增删改查操作，实现注册、登录等功能。
- 将多个数据存储到一个集合中，实现多个数据的查询。如爬取结果。

## 部署

[腾讯云服务器部署 Flask 接口](https://blog.csdn.net/weixin_43409302/article/details/85912717)  
[腾讯云 Serverless 部署Flask接口](https://cloud.tencent.com/document/product/1154/40495)  
[Ubuntu Nginx 部署 Flask 接口](https://www.cnblogs.com/sdadx/p/10360208.html)  
[Windows Nginx 部署 Flask 接口](https://blog.csdn.net/weixin_44406200/article/details/104117583)  
[Vercel 部署 Flask 接口](https://dev.to/andrewbaisden/how-to-deploy-a-python-flask-app-to-vercel-2o5k)

## 开源源代码

[GitHub](https://github.com/inannan423/flask-mongodb-web)

<!-- ## 腾讯云部署 Flask

### 注册

注册腾讯云并实名认证。不讲了~

### 点击进入控制台

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666881485604.png)  

点击进入 serverless 应用中心。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027223933.png)

### 创建应用

点击创建应用。  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666881645217.png)  

选择 Flask 模板。  

![4](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666881716735.png)

填写信息。先选择模板代码。  

![4](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666881817476.png)

填写环境变量，值为之前注册 MongoDB 时的 token。  

```md
key:DBtoken
value:mongodb+srv://<Username>:<password>@cluster0.xxxxxxx.mongodb.net/?retryWrites=true&w=majority
```

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666881906504.png)

### 部署

点击部署，显示部署中：  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666882105644.png)  

部署成功：  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666882193596.png)

记住这个访问路径：  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027225041.png)  

右上角点击访问，可以看到：  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027225134.png)

### 代码部署

由于 SCF 云上标准环境内未提供 Flask 依赖库，此处必须将依赖文件安装完成后，与项目代码一起打包上传。先在本地新建 `requirements.txt` 文件，文件内容如下：  

```txt
argparse==1.4.0
certifi==2022.9.24
cffi==1.15.1
charset-normalizer==2.1.1
click==8.1.3
colorama==0.4.6
cors==1.0.1
dnspython==2.2.1
filelock==3.8.0
Flask-Cors==3.0.10
Flask==2.2.2
future==0.18.2
gevent==22.10.1
greenlet==1.1.3.post0
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.1
pip==21.1.2
pycparser==2.21
pymongo==4.3.2
PySocks==1.7.1
requests-file==1.5.1
requests==2.28.1
setuptools==57.0.0
six==1.16.0
tldextract==3.4.0
urllib3==1.26.12
Werkzeug==0.16.0
wheel==0.36.2
zope.event==4.5.0
zope.interface==5.5.0
``` 
执行以下命令进行安装：  -->
