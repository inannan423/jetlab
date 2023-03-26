---
title: 基本使用 # 文章标题
date: 2022-08-20  # 文章修改时间
authors: Chengzihan # 作者昵称
tags: [Node.js,Express] # Tag标签
---
## 创建基本服务器

```js
// 导入
const express = require('express')
// 创建服务器实例
const app = express()

// 监听端口，启动服务器
app.listen(80,()=>{
    console.log('Express server running at http://127.0.0.1')
})
```

## 监听客户端请求

### GET 请求

通过 `app.get()` 方法，具体语法格式如下：  

- 参数1：客户端的URL地址
- 参数2：对应的处理函数
  - req：请求对象（请求的属性和方法）
  - res：响应对象（响应的属性和方法）

```js
app.get('请求URL',function(req,res){
    // 处理函数
})
```

### POST 请求

通过 `app.post()` 方法，具体语法格式如下：  

- 参数1：客户端的URL地址
- 参数2：对应的处理函数
  - req：请求对象（请求的属性和方法）
  - res：响应对象（响应的属性和方法）

```js
app.post('请求URL',function(req,res){
    // 处理函数
})
```

### 响应内容

通过 `res.send` 方法，即可把处理内容发送给客户端。  

```js
app.get('/user',function(req,res){
    // 向客户端返回一个 json 对象
    res.send({name:'za',age:20,gender:'男'})
})

app.post('/user',function(req,res){
    // 向客户端返回一个 json 对象
    res.send({name:'za',age:20,gender:'男'})
})
```

### 例子

```js title="01.js"
// 导入express
const express = require("express");
// 创建服务器实例
const app = express();

app.get("/user", (req, res) => {
  res.send({ name: "za", age: 20, gender: "男" });
});

// 监听接口
app.listen(80, () => {
  console.log("Express服务器运行在 http://127.0.0.1");
});
```

```bash
node 01.js
```

在浏览器打开 `<http://127.0.0.1/user>`:  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820095650.png)

或者使用 `Apifox` 进行测试，POST 同上，不在赘述：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820100522.png)

## 获取 URL 携带的查询参数

通过 `req.query` 对象，可以访问到**查询字符串**的方式，发送到服务器的参数：  

```js
app.get('/',(req,res)=>{
    // req.query 默认是一个空的对象
    // 客户端使用 ?name=zs&age=20 这种字符串查询方式，发送到服务端的参数可以通过
    // req.query 访问到
    console.log(req.query)
})
```

在 Apifox 中请求 `127.0.0.1?name=zs&age=20`，控制台打印：  

```bash
{ name: 'zs', age: '20' }
```

## 获取 URL 中的动态参数

可以通过 `req.params` 访问动态参数对象：  

```js
app.get('/user/:id',(req,res)=>{
    // :id 是一个动态参数
    console.log(req.params)
    res.send(req.params)
})
```

结果：  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820102859.png)

但实际上这里的 `:id` 并不是固定的写法，也可以叫做 `:ids` 等等，后面这个名称的值决定了参数名。也可以多个动态参数：  

```js
app.get('/user/:username/:id',(req,res)=>{
    // :id 是一个动态参数
    console.log(req.params)
    res.send(req.params)
})
```

## 静态资源托管

### 单个目录

- `express.static()`。  
 用于创建一个静态资源服务器，通过如下的代码即可把 public 目录下的所有资源对外公开访问。  

```js
app.use(express.static('public'))
```

如此，以下链接生效：  

- `<http://localhost:3000/images/bg.jpg>`
- `<http://localhost:3000/css/style.css>`
- `<http://localhost:3000/js/login.js>`

我们创建一个 clock 文件夹，内有静态资源。  

```js
// 导入express
const express = require("express");
// 创建服务器实例
const app = express();

// 使用 express.static 方法快速对外提供静态资源
app.use(express.static("./clock"));

// 监听接口
app.listen(80, () => {
  console.log("Express服务器运行在 http://127.0.0.1");
});
```

运行：  

```bash
node it
```

浏览器访问路径 `http://127.0.0.1/index.css` :  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220820110805.png)

### 多个资源目录

只需要连续多次调用这个函数即可。  

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

访问静态资源时，会按照调用顺序来查找相关资源，比如我们需要请求 `index.html` ，如果 `public` 已经存在了，就不会再去 `files` 中查找了。

### 挂载路径前缀

默认情况下资源访问不包含文件夹前缀。如果希望托管路径之前添加路径前缀，可以使用下面的方法：  

```js
app.use('/public',express.static('public'))
```

此时去访问会出现相应的前缀：`http://127.0.0.1/public/index.css`  

## nodemon

在写代码时，如果对代码进行了修改，那么我们要重启终端才生效，**nodemon** 为我们省下了这件事。它能够监听项目的变动，会帮我们自动**重启终端**。  

```bash
npm install -g nodemon
```  

这样一来，我们运行项目，就要替换成：  

```bash
nodemon hello.js
```

```bash
[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`  
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json    
[nodemon] starting `node .\04.动态参数对象.js`
Express服务器运行在 http://127.0.0.1
```
