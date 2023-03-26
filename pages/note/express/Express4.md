---
title: 中间件 # 文章标题
date: 2022-08-20  # 文章修改时间
authors: Chengzihan # 作者昵称
tags: [Node.js,Express] # Tag标签
---
## 什么是中间件

**中间件**（Middleware），是业务流程的中间处理环节。  

在污水处理时要经过**一级处理、二级处理、三级处理**才能排放出符合标准的污水。这三个处理换姐就是**中间件**，中间件都需要**输入和输出**。

## 调用流程

当一个请求到达 Express 服务器时，在无法直接完成处理的情况下，可以调用多个中间件，对这次的请求进行**预处理**。当所有处理完毕后，再交付给客户端。

## 格式

本质上就是一个 `function` 处理函数，包含 `req`, `res`, `next` 三个参数，`next()` 参数把流转关系交给下一个中间件或路由:  

```js
app.get('/',function(req,res,next){
    // 中间件函数
    next();
})
```

## next 函数

实现多个中间件连续调用的关键。它表示把流转关系转交给下一个**中间件**或者**路由**。

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/4b31d288d06ea910c7678d0362c33d2.jpg)

## 定义中间件

```js
const mw = function(req,res,next){
    console.log("这是一个中间件函数");
    // 必须调用next函数
    next();
}
```

## 全局中间件

服务端发起任何请求都会出发的中间件叫做全局生效中间件。调用 `app.use` 即可定义一个全局生效的中间件。  

```js
app.use(mw)
```

使用下面的脚本：  

```js
// 导入express
const express = require("express");
// 创建服务器实例
const app = express();

// 导入路由模块
const router = require("./06.router");

// 定义中间件函数
const mw = function (req, res, next) {
  console.log("这是一个中间件函数");
  next();
};

// 将mw注册为全局生效的中间件
app.use(mw);

app.get("/", (req, res) => {
  res.send("HomePage");
});

app.get("/user", (req, res) => {
  res.send("UserPage");
});

// 监听接口
app.listen(80, () => {
  console.log("Express服务器运行在 http://127.0.0.1");
});
```

在终端运行,并在 Apifox 中请求这个 `/` 接口：  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820144339.png)

控制台输出：  

```bash
[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json  
[nodemon] starting `node .\08.中间件.js` 
Express服务器运行在 http://127.0.0.1
这是一个中间件函数
```

请求 `/user` 接口：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820144508.png)

```bash
[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json  
[nodemon] starting `node .\08.中间件.js`    
Express服务器运行在 http://127.0.0.1
这是一个中间件函数
这是一个中间件函数
```

在这个例子中，中间件 mw 调用完成后，`next` 函数调用了下一个路由。

### 简化全局中间件

实际上，上面的定义和 `use` 操作是可以合并的：  

```js
app.use(function (req, res, next) {
  console.log("这是一个中间件函数");
  next();
});
```

### 多个全局中间件

服务器会按照定义的顺序进行中间件调用。  

```js
app.use(function (req, res, next) {
  console.log("这是一个中间件函数1");
  next();
});
app.use(function (req, res, next) {
  console.log("这是一个中间件函数2");
  next();
});
```

## 中间件的作用

在多个中间件的中间，**共享同一份req和res**，所以我们可以在上游中间件中统一为**req和res**添加自定义属性和方法，供下游的中间件和路由使用。

如下面的例子，我们将**获取时间**抽象成一个中间件，在这个中间件中，我们把请求到达的时间挂载到 `req` 对象上，这样，在下面监听请求时就可以从中间件获取请求到达的时间。

```js
// 导入express
const express = require("express");
// 创建服务器实例
const app = express();

// 导入路由模块
const router = require("./06.router");

// 定义中间件函数
const mw = function (req, res, next) {
  // 获取请求到达服务器的时间
  const time = Date.now();
  // 挂载到req
  // highlight-start
  req.startTime = time;
  // highlight-end
  console.log("这是一个中间件函数");
  next();
};

// 将mw注册为全局生效的中间件
app.use(mw);

app.get("/", (req, res) => {
    // highlight-start
  res.send("HomePage" + req.startTime);
  // highlight-end
});

app.get("/user", (req, res) => {
  res.send("UserPage" + req.startTime);
});

// 监听接口
app.listen(80, () => {
  console.log("Express服务器运行在 http://127.0.0.1");
});
```

执行这个脚本：  
![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820154318.png)

上面就拿到了该时间。  

因此，我们发现，中间件可以**简化**代码的书写。

## 局部生效中间件

不使用 `app.use` 函数来声明中间件，就不会是全局的中间件。  

```js
// 导入express
const express = require("express");
// 创建服务器实例
const app = express();

// 导入路由模块
const router = require("./06.router");

// 定义中间件函数
const mw = function (req, res, next) {
  // 获取请求到达服务器的时间
  const time = Date.now();
  // 挂载到req

  req.startTime = time;

  console.log("这是一个中间件函数");
  next();
};

// 在下面增加一个参数，可以调用这个中间件。
  // highlight-start
app.get("/", mw, (req, res) => {
    // highlight-end
  res.send("HomePage" + req.startTime);
});

app.get("/user", (req, res) => {
  res.send("UserPage" + req.startTime);
});

// 监听接口
app.listen(80, () => {
  console.log("Express服务器运行在 http://127.0.0.1");
});
```

### 多个局部中间件

```js
app.get("/", mw1 , mw2 , mw3 , (req, res) => {
  res.send("HomePage" + req.startTime);
});
//或者
app.get("/", [mw1 , mw2 , mw3] , (req, res) => {
  res.send("HomePage" + req.startTime);
});
```

## 中间件注意事项

- 必须在路由之前定义中间件，否则就不会生效
- 客户端发送的请求可以连续调用多个中间件
- 中间件结束 `next()` 函数不可忽略，否则请求不会继续
- 防止逻辑混乱， `next()` 之后不要再编写其他代码
- 连续调用多个中间件时，公用 req 和 res 对象

## 中间件分类

Express 将中间件分成了**五类**的中间件：  

1. 应用级别的中间件
2. 路由级别的中间件
3. 错误级别的中间件
4. Express 内置中间件
5. 第三方中间件

### 应用级中间件

凡是通过 `app.use()` `app.get()` `app.post()` 之类绑定到 app 上的中间件都是应用级的中间件。上面的代码中的全局中间件和局部中间件都是应用级中间件。

```js
app.get("/", mw1 , mw2 , mw3 , (req, res) => {
  res.send("HomePage" + req.startTime);
});
```

### 路由级中间件

绑定到 `express.Router()` 实例上的中间件都是路由级别的中间件。  

```js
router.use(function(req,res,next){
    console.log("路由级中间件");0
    next();
})
```

### 错误级中间件

用于捕获项目中发生的错误，包含四个参数：`err,req,res,next`:  

```js
app.get('/'.function(req,res){
    // 人为制造错误
    throw new Error('服务器发生错误！');
    // 因为上一行发生错误，所以不会执行到这里
    res.send('HomePage');
})
app.use(function(err,req,res,next){
    console.log('发生了错误错误'+err.message);
    res.send('Error!'+err.message);
})
```

### 内置中间件

1. `express.static`快速托管静态资源的中间件（无兼容性）。
2. `express.json` 解析 json 格式的请求体数据（4.16.0+)。
3. `express.urlencoded` 解析 URL-encoded 格式的请求体数据（4.16.0+)。

```js
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
```

#### 从 Apifox 发送一个 json 数据到服务器

在 Apifox 中 Body 面板发送数据。  
![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1660983626411.png)
模拟一些数据：
![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820162629.png)

```js
// 导入express
const express = require("express");
// 创建服务器实例
const app = express();

app.post("/user", (req, res) => {
  // 使用 res.body 接收发来的请求体数据
  console.log(req.body);
  res.send("UserPage");
});

// 监听接口
app.listen(80, () => {
  console.log("Express服务器运行在 http://127.0.0.1");
});
```

控制台打印：  

```bash
Express服务器运行在 http://127.0.0.1
undefined
```

没有配置解析方式，所以这里无法解析表单。  

```js
// 导入express
const express = require("express");
// 创建服务器实例
const app = express();
// highlight-start
app.use(express.json());
// highlight-end
app.post("/user", (req, res) => {
  // 使用 res.body 接收发来的请求体数据
  console.log(req.body);
  res.send("UserPage");
});

// 监听接口
app.listen(80, () => {
  console.log("Express服务器运行在 http://127.0.0.1");
});
```

重新发送请求，控制台打印：  

```bash
Express服务器运行在 http://127.0.0.1
{ name: 'zs', age: 10 }
```

## 自定义中间件
