---
title: 路由 # 文章标题
date: 2022-08-20  # 文章修改时间
authors: Chengzihan # 作者昵称
tags: [Node.js,Express] # Tag标签
---
## 什么是路由

路由就是**映射关系**。比如拨打 10086 时，不同的数字按键可以映射不同的功能，数字按键和功能之间的关系就是映射关系。

## Express 中的路由

### 组成

**Express 中的路由** 指**客户端的请求**和**服务器处理函数**之间的映射关系。Express 中的路由由下面的三部分组成：  

- 请求的类型
- 请求的 URL 地址
- 处理函数

```js
app.METHOD(PATH,HANDLER)
// Method 指请求的类型，Path指请求的URL地址，HANDLER指处理函数
```

### 例子

对客户端请求的响应就是一个路由的例子：  

```js
app.get("/user", (req, res) => {
  res.send('HelloWorld');
});
```

### 匹配过程

每次客户端发起请求时，需要先进行路由匹配，只有匹配成功才会调用对应的函数。在路由匹配时，会按照函数编写的顺序**从上到下**进行匹配，直到匹配成功为止。**请求的类型和请求的URL地址必须同时满足才能匹配成功**。  

## 基本使用

### 挂载到 app

```js
// 挂载到get
app.get("/user", (req, res) => {
  res.send('HelloWorld');
});
// 挂载到post
app.post("/user", (req, res) => {
  res.send('HelloWorld');
});
```

### 模块化路由

为了对路由进行模块化管理，Express 不建议像上面一样直接在 app 上挂载，而是推荐将其抽离为单独的模块。  

- 创建路由模块对应的js文件
- 调用 `express.router()` 创建路由实例对象
- 向实例对象挂载具体的路由
- 使用 `module.exports` 向外共享路由对象
- 使用 `app.use` 函数注册路由模块

#### 创建路由模块  

```js title="router.js"
// router.js
const express = require('express')
// 创建路由对象
const router = express.Router()

// 挂载具体路由
// highlight-start
router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})
router.post('/user/add', (req, res) => {
  res.send('Add new user.')
})
// highlight-end
// 向外导出路由对象
module.exports = router
```

#### 注册路由模块  

```js title="useRouter.js"
// 导入express
const express = require("express");
// 创建服务器实例
const app = express();

// highlight-start
// 导入路由模块
const router = require("./06.router");

// 注册路由模块
app.use(router);
// highlight-end

// 监听接口
app.listen(80, () => {
  console.log("Express服务器运行在 http://127.0.0.1");
});
```

此时，使用 apifox 请求这个接口。  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820125151.png)
![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820125237.png)

得到了预期结果。实际上，这里的 `router` 就是一个中间件。

### 路由前缀

类似前面的托管静态资源，这里也可以为路由添加前缀。

```js
app.use('/api',router)
```
