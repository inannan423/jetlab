---
title: 认识 Express # 文章标题
date: 2022-08-20  # 文章修改时间
authors: Chengzihan # 作者昵称
tags: [Node.js,Express] # Tag标签
---
## 学习目标

- 使用 `express.static()` 快速托管静态资源
- 使用 express 路由精简项目结构
- 使用 express 常见的中间件
- 使用 express 创建 API 接口
- 在 express 中启用 cors 跨域资源共享

## 什么是 Express

Express 是快速，开放，极简主义的 Web 框架，基于 Node.js 平台。它的作用与 Http 模块类似，专门用来创建 Web 服务。本质就是一个 **npm** 包。

[Express中文网](https://www.expressjs.com.cn/)。  

## 为什么 Express

- http 内置模块比较复杂
- Express 对其进行封装，提高了使用效率

## Express 能够做什么

- **Web网站服务器**：提供 Web 资源的服务器。
- **API接口服务器**：专门对外提供 API接口的服务器。

## 安装 Express

在项目所在目录中，运行下面的终端命令：  

```bash
npm i express@4.17.1
```
