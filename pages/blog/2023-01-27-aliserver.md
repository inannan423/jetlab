---
slug: strapi-cms
title: Next.js + Strapi CMS + Ubuntu 搭建内容管理系统
authors: Chengzihan
tags: [React,Next.js,Strapi,Ubuntu]
---

## 前言

最近在为某公司搭建网站，需要一个内容管理系统，正好之前了解了 Strapi CMS，于是决定用它来搭建这个系统。这里涉及的技术栈有：  

- Next.js：搭建前端页面
- Tailwind CSS：编写前端样式
- Strapi CMS：搭建后端内容管理系统，生成 API
- Ubuntu：服务器
- Azure：云服务器
- PM2：Node.js 进程管理
- Nginx：反向代理
- ZeroSSL：免费 SSL 证书

什么？你说你不知道这些东西是干什么的？别急，往下看，这是一篇从 0 到 1 的教程。

## Next.js 搭建

首先，我们需要安装 Next.js，这里我们使用 `create-next-app` 来创建一个 Next.js 项目。在这里我把 Next.js 的文档丢给你，你可以看看 [Next.js 官方文档](https://nextjs.org/docs/getting-started)。

```bash
npx create-next-app@latest my-site --typescript
```

等待安装完成后，我们就可以进入项目目录了。

```bash
cd my-site
```

接着可以运行 `npm run dev` 来启动项目，然后在浏览器中打开 `http://localhost:3000`，就可以看到 Next.js 的欢迎页面了。

## Tailwind CSS 安装

> Why Tailwind? Because it's awesome!

Tailwind 是一个 CSS 框架，它的特点是：

- 无需编写 CSS，只需添加类名
- 简单的响应式设计
- 优化的 CSS 输出

从 [Github 趋势](https://ossinsight.io/collections/css-framework/) 上我们可以看出 Tailwind CSS 的受欢迎程度：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230127170649.png)

接下来我们需要安装 Tailwind CSS，这里我们使用 `create-tailwind-app` 来创建一个 Tailwind CSS 项目。在这里我也把 Tailwind CSS 的文档丢给你， [Next.js 安装 Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs)。

在我们项目的根目录下运行以下命令：

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

这时，脚手架会自动在项目根目录下创建一个 `tailwind.config.js` 文件，我们可以在这里配置 Tailwind CSS。我们需就要在 `tailwind.config.js` 文件中添加以下内容，主要是 `content` 字段中的内容：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```  

## Strapi CMS 安装

新建一个目录，然后进入这个目录，运行以下命令：

```bash
npx create-strapi-app@latest my-project --quickstart
```

官方文档在此 [Strapi 官方文档](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html#_1-install-strapi-and-create-a-new-project)。

待安装完毕之后，我们就可以进入项目目录了。

```bash
cd my-project
```

接着可以运行 `npm run develop` 来启动项目，然后在浏览器中打开 `http://localhost:1337/admin`，就可以看到 Strapi CMS 的欢迎页面了。初始界面时，会提示你创建一个管理员账号，这里我们就不多说了。请妥善保存你的管理员账号和密码。

## Strapi CMS 配置

以上工作做完之后，我们就可以开始了。  

### 汉化 Strapi CMS 面板

首先你可能想要一个中文面板的 Strapi ，那么我们可以在 `src/admin/` 中创建一个 `app.js` 文件，然后在这个文件中添加以下内容：

```js
export default {
  config: {
    locales: ["en", "zh-Hans"],
    tutorials: false,
  },
  bootstrap() {},
};
```

重启项目，然后在浏览器中打开 `http://localhost:1337/admin`。之后你可以点击左下角头像，然后选择 `Settings`，在 `Language` 中选择 `简体中文`，然后点击 `Save`，这时你就可以看到中文的 Strapi CMS 面板了。

### 接口分析

试想我们有如下的需求：即创建一个新闻中心应用，它包含了新闻列表和新闻详情两个页面。新闻列表页面需要展示新闻的标题、发布时间、新闻类别的信息，新闻详情页面需要展示新闻的主要内容。  

一条新闻应该包含以下字段：

- slug：新闻的唯一标识符
- title：新闻的标题
- desc：新闻的主要内容
- date：新闻的发布时间  
- from：新闻的来源(分类)

### 添加模型构建器

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674822265476.png)

点击添加集合类型，然后在面板中输入模型名称，并输入 API ID ，这将决定你的 API 的 URL。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230127202215.png)  

完成后，添加上述字段。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230127202525.png)  

在高级设置中可以设置其默认值、是否必填、长度等。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230127202546.png)  

对于文章内容，这里我们选用富文本编辑器类型，这样我们就可以在编辑器中直接编辑文章内容了。  

模型添加完毕后，点击右上角的 `保存` 按钮。打开内容管理，我们可以看到我们刚刚添加的模型。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674822474933.png)  

### 添加内容

点击右上角的 `添加条目` 按钮，我们就可以添加新闻了。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230127202840.png)  

添加完成后，点击保存并发布，我们就可以在前端页面中看到我们刚刚添加的新闻了。  

这时，来到**设置**页面，进入**角色列表**，找到 `public` 角色，然后点击进入。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674822611259.png)  

找到刚刚创建的新闻模型的 `API` ，勾选 `find` 和 `findone` ，然后点击右上角的 `保存` 按钮。在权限的设置图标上，点击，可以查看对应操作的 `API` 地址。点击保存。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674822739231.png)  

### 接口测试

接着我们打开 `http://localhost:1337/api/news` ，可以看到我们刚刚添加的新闻。具体内容是一个 JSON 对象。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230127203355.png)  

可以通过 api 测试工具，如 postman 进行测试。这里用的是 [apifox](https://www.apifox.cn/) 。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674822970109.png)

## 列表页面编写

接下来我们就可以开始编写前端页面了。我们首先在 Next.js 中创建一个页面，命名为 `NewsList.tsx`，用于展示新闻列表。  

### 类型抽象

根据上面的接口测试，查看返回的结果，我们可以抽象出下面的类型：  

```typescript
type propType = {
    id: number,
    attributes: {
        slug: string,
        title: string,
        desc: string,
        date: string,
        from: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
    }
}
```

### 状态管理

创建组件，定义一些状态用来存储新闻列表、分页页码、筛选条件等。  

```typescript
const [newsList, setNewsList] = React.useState<propType[]>([]); // 新闻列表
const [pageNo, setPageNo] = React.useState(1);  // 当前页码
const [nowPage, setNowPage] = React.useState<propType[]>([]);   // 当前页的新闻列表
const [pageCount, setPageCount] = React.useState(2);    // 总页数
const [selectedArr, setSelectedArr] = React.useState<string[]>([]); // 筛选条件
```

### 接口"软编码"

接口地址不应该写死，我们应该采用软编码的方式，将接口地址**前缀**管理在文件中，方便后期维护。可以使用 `next.config.js` 来管理。  

```javascript
module.exports = {
    env: {
        API_URL: 'http://localhost:1337/api'
    }
}
```

调用时，可以使用 `process.env.API_URL` 来获取。

但是我这里使用了一个自定义 Hook 来管理接口地址。创建一个 Hooks 文件夹，创建 `useStrapiLink.ts` 文件，用于管理接口地址。  

```typescript
import React from "react";
import {useState} from "react";

const useStrapiLink = () => {
    const [strapiLink, setStrapiLink] = useState<string>("http://localhost:1337/api");
    return strapiLink;
}

export default useStrapiLink;
```

使用时，可以直接引入 `useStrapiLink`，然后调用即可。  

```typescript
import useStrapiLink from "../Hooks/useStrapiLink";

const strapiLink = useStrapiLink();
```

### 接口请求

在 `useEffect` 中，我们可以使用 `fetch` 来请求接口。  

```typescript
useEffect(() => {
    if (selectedArr.length == 0) {
        fetch(strapiLink + "/api/news")
            .then(res => res.json())
            .then(data => {
                setNewsList(data.data); // 将请求到的数据存储在 newsList 中
                setPageCount(Math.ceil(data.data.length));  // 计算总页数
            })
    } else {
        fetch(strapiLink + "/api/news?filters[from][$in][0]=" + selectedArr[0] + '&filters[from][$in][1]=' + selectedArr[1] + '&filters[from][$in][2]=' + selectedArr[2])
            .then(res => res.json())
            .then(data => {
                setNewsList(data.data);
                setPageCount(Math.ceil(data.data.length));
            })
    }
}, [strapiLink, selectedArr]);
```

在这里，我为副作用绑定了 `strapiLink` 和 `selectedArr` 两个状态，也就是 strapi 的接口地址和筛选条件。当这两个状态发生变化时，才会触发副作用。  

我们可以看到这里使用了 strapi 的 RESTful API，这里我使用了筛选条件，筛选条件的格式为 `filters[from][$in][0]=`，其中 `from` 是字段名，`$in` 是筛选条件，`[0]` 是数组下标，下标代表筛选条件的位次。这里我有三个条件可供筛选，并且它们之间满足的是或的关系，所以我使用了数组。  

筛选使用的是 Acro Design 的 Select 组件。  

```jsx
 <Select style={{width: 270}} mode='multiple' placeholder="全部"
        onChange={(value) => {
            setSelectedArr(value);
        }}
>
    {options.map((option, index) => (
        <Option key={index} value={option.option}>
            {option.option}
        </Option>
    ))}
</Select>
```

对于更多的 strapi 筛选条件，可以参考 [Strapi 文档中的这个条目](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering)。  

可以满足绝大多数的筛选需求。  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230127210021.png)

### 分页

分页的逻辑比较简单，我们只需要将 `newsList` 中的数据按照页码进行切割即可。  

```typescript
useEffect(() => {
    setNowPage(newsList.slice((pageNo - 1) * 10, pageNo * 10));
}, [newsList, pageNo]);
```

同样是绑定了 `newsList` 和 `pageNo` 两个状态，当这两个状态发生变化时，才会触发副作用。每次切割的长度为 10，也就是每页显示 10 条数据。

这里使用了 Acro Design 的 Pagination 组件，它的使用方法很简单,如下：

```tsx
 <Pagination 
    pageSize={10}  // 每页显示的条数
    total={pageCount}  // 总条数
    onChange={(pageNumber) => {setPageNo(pageNumber);}} // 页码改变时的回调函数
/>
```

### 列表渲染

由于我们动态改变了当前页面的数据，所以我们需要在 `nowPage` 发生变化时，重新渲染列表。  

```tsx
{nowPage && nowPage.map((item, index) => {
    return (
        <div
            key={index}
            className="w-full transition-all ease-in-out duration-300 grid grid-cols-9 border-b-2 border-sky-300/20  py-4 justify-start items-center"
        >
            <div className={`col-span-3 lg:col-span-2 flex justify-start text-gray-400`}>
                {item.attributes.date}
            </div>
            <Link href={{pathname: '/NewsPage', query: {id: item.id}}}
                    className="col-span-6 flex items-center hover:underline">
                <div className={`truncate text-black font-normal text-md`}>
                    {item.attributes.title}
                </div>
            </Link>
            <div className={`hidden lg:block lg:col-span-1 flex justify-end text-gray-400`}>
                {item.attributes.from}
            </div>
        </div>
    )
})}
```

### 跳转到详情页

值得注意的是，这里使用了 Link 组件，它的作用是跳转到指定的页面，我们通过 `query` 属性传递了 `id` 参数，这个参数将会在详情页中使用,用来渲染指定数据的详情页的数据。

```tsx
<Link href={{pathname: '/NewsPage', query: {id: item.id}}}>
    // ...
</Link>
```

列表页的效果如下：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674824750849.png)

下面我们会讲到详情页的实现。  

## 详情页的创建

详情页我们要获得指定文章的 id ，然后通过 id 去请求数据，最后渲染出来。这里创建一个 NewsPage.tsx 文件。  

### 跳转参数 id 的获取

我们需要获取到 `query` 中的 `id` 参数，然后将其赋值给 `id` 状态。获取 `id` 参数的方法很简单，就是使用 `useRouter` 钩子函数，然后获取 `query` 中的 `id` 参数。  

```tsx
const {id} = useRouter().query;
```

### 新闻请求

我们需要通过 `id` 去请求数据，这里我们使用 `useEffect` 副作用，当 `id` 发生变化时，才会触发副作用。  

```tsx
useEffect(() => {
    fetch(strapiLink + "/api/news/"+ id ).then(
        res => res.json()
    ).then(
        data => {
            setArticle(data.data);
        }
    )
}, [strapiLink]);
```

### 渲染 Markdown

Strapi 的富文本编辑器是使用 Markdown 格式的，所以我们需要将 Markdown 转换为 HTML 格式，然后渲染出来。这里使用一个插件 `react-markdown`。  

首先安装插件：  

```bash
npm install react-markdown
```

接着只需要传入参数即可：  

```tsx
<ReactMarkdown
    children={article.attributes.desc
        // 将 ](/uploads 替换为 ](strapiLink+/uploads
        .replace(/\]\(\//g, `](${strapiLink}/`)}
    remarkPlugins={[remarkGfm]}
    className={`${styles.markdown} lg:pr-12`}
/>
```

这里也有个要点，就是 Strapi 富文本中图片的地址是 `/uploads` 开头的，并不会携带 URL 头，所以我们需要将其替换为 `strapiLink+/uploads`，这样才能正确的请求到图片。这里使用了**正则表达式**。  

`remarkPlugins` 插件是用来解析 Markdown 的，这里我们使用了 `remark-gfm` 插件，能够更好的解析 Markdown 一些高级语法。更多关于 `react-markdown` 可以参考[官方文档](https://github.com/remarkjs/react-markdown)  

## 配置服务器

### 配置和连接

这里肯定需要一台服务器来部署 strapi，当然，也有一些一键部署的服务，如 [Render](https://render.com/)，但是这里我们还是使用自己的服务器来部署。  

笔者这里使用的是 Github Student Pack 提供的 Azure 服务器，这里就不多说了，建议是学生的话，可以去申请一下。除了 Azure 服务器以外，学生包中还赠送了三个域名及 SSL 证书，还有一台 DigitalOcean 的服务器，嗯，很香😋。  

在 Azure 上创建实例，建议选择近一点的服务器如日本或者新加坡等。我这里使用的是 Ubuntu 镜像。  

设置 SSH 访问密码。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230127212517.png)

然后使用 SSH 连接到服务器。这里使用 FinalShell 连接。在这里可以下载 [FinalShell](https://www.hostbuf.com/t/988.html)。  

点击文件夹，然后点击 `新建`，选择 `SSH`，然后输入服务器的 IP 地址，用户名，密码，端口号。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674826068869.png)  

密码是刚才修改的密码。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230127212835.png)  

名称任意取。这里的**主机**一项需要填写 IP 地址，可以在服务器控制台获取。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674873395143.png)

注意要在 Azure 面板放行端口号22. 否则无法连接。

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674826229190.png)

### 安装 Node.js

首先安装 Node.js，注意需要安装 14.x 以上的版本。在 FinalShell 面板中输入以下命令：

```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash  -
sudo apt-get install -y nodejs
```

安装完成后，输入 `node -v` 查看版本号，如果是 14.x 以上的版本，说明安装成功。  

```bash
node -v
npm -v # 查看 npm 版本
```

### 安装 Nginx

Nginx 是一个高性能的 HTTP 和反向代理服务器，这里我们使用 Nginx 来做反向代理，将请求转发到 Strapi 服务器。  

```bash
apt update && apt upgrade -y &&  apt install nginx -y
```

安装完成后，输入 `nginx -v` 查看版本号,出现版本号说明安装成功。  

```bash
nginx -v
```

如果上述过程有失败的情况，可能需要提权，在指令前加上 `sudo`。  

### 安装 PM2

PM2 是一个 Node.js 进程管理器，可以帮助我们管理 Node.js 进程。在进程发生异常崩溃时，PM2 可以自动重启进程。  

```bash
sudo npm install -g pm2
```

检查是否安装成功，输入 `pm2 -help`，出现帮助信息说明安装成功。  

```bash
pm2 -help
```

### 上传 Strapi 工程文件

在 FinalShell 中的文件管理器中，将你的 Strapi 工程，除了 `node_modules` 文件夹外，上传到服务器,最好先打包好(npm run build)，在上传，否则小型服务器可能无法支持打包进程。一般上传到 `/www/wwwroot/` 文件夹下。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674827240884.png)  

进入到 Strapi 工程文件夹，安装依赖。  

```bash
cd /www/wwwroot/backend
sudo npm install
```

安装完毕后，尝试运行 Strapi 服务器(`npm run start`)，如果出现错误，可能是端口号被占用。  

### PM2 启动 Strapi 服务器

在 backend 文件夹下创建文件 `server.js` 作为入口文件。  

```bash
const strapi = require('strapi');
strapi().start();
```

在该目录下启动 PM2 进程。  

```bash
pm2 start server.js
```

可以使用指令查看进程是否启动成功。  

```bash
pm2 list
```

- 如何在没有证书和域名时测试 Strapi ？  

使用 PM2 启动 Strapi 后，你就可以在 Azure 安全组中放行你的 Strapi 服务的端口，然后使用 IP 加端口的方式来访问你的 Strapi 服务。比如我这里是 1337 端口，所以我可以通过 `http://<IP>:1337/admin` 来访问 Strapi 的后台管理页面。当然，如果你不嫌麻烦，可以用 Nginx 配置反向代理，然后访问。

### Next.js 部署

步骤类似，这里不再赘述。上传打包后的工程，安装依赖，启动 PM2 进程即可。

### Nginx 配置

编辑 Nginx 配置文件。  

```bash
sudo vim /etc/nginx/nginx.conf
```

进入后，按 `i` 进入编辑模式，将 `http` 下修改为以下内容。  

```bash
server {
        listen       80;
        server_name  xxx.com;   # 你的域名
        return 301 https://$server_name$request_uri;    # 重定向到 https
}

server {
        listen       80;
        server_name  admin.xxx.com;  # 你的域名，用于后台管理
        return 301 https://$server_name$request_uri;
}

server{
        listen 443 ssl; 
        server_name xxx.com;
        ssl_certificate /etc/nginx/cert/ssl.crt;    # 你的证书路径
        ssl_certificate_key  /etc/nginx/cert/ssl.key;   # 你的证书密钥路径
        ssl_session_timeout  5m;    # 会话超时时间
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    # 加密套件
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    # 协议
        ssl_prefer_server_ciphers on;   # 优先使用服务器端加密套件

        location /{
                proxy_pass http://localhost:3000;   # 你的 Next.js 服务器端口
                proxy_http_version 1.1;    # http 版本
                proxy_set_header Upgrade $http_upgrade;   # 设置升级头
                proxy_set_header Connection 'upgrade';  # 设置连接头
                proxy_set_header Host $host;    # 设置主机头
                proxy_cache_bypass $http_upgrade;   # 设置缓存头
        }
}

server{
        listen 443 ssl; 
        server_name admin.xxx.com;
        ssl_certificate /etc/nginx/cert/adminssl.crt;   # 你的证书路径，另一个证书
        ssl_certificate_key  /etc/nginx/cert/adminssl.key;  # 你的证书密钥路径，另一个证书密钥
        ssl_session_timeout  5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        location /{
                proxy_pass http://localhost:1337;   # 你的 Strapi 服务器端口
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

添加完后，保存退出。  

```bash
:wq
```

这里监听了 80 和 443 端口，分别用于 http 和 https。我们将 80 端口的请求重定向到 443 端口，这样就可以使用 https 访问所有服务。

这里，你还没有申请域名和证书呢，所以我们暂时先别管这些，去申请证书和域名。

## 域名申请

域名我使用的是 GitHub Student Developer Pack 提供的域名，是 Name.com 的域名，可以免费申请一个 `.live` 的域名。点击下面的连接，使用 GitHub 账号登录，然后申请一个域名。  

[Name.com Student](https://www.name.com/partner/github-students)  

输入心仪的域名，按回车提交，在下面找到想要的域名，可以发现价格都是 0 元，加入购物车。  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674873229127.png)

接着在 My Domains 下找到你刚刚申请的域名，点击域名进入管理页面。  

点击管理 DNS 记录。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674873557904.png)  

添加两条 A 记录，一台的主机名为 `@`，另一台的主机名为 `admin`。**回答**都指向你的服务器 IP。TTL 设置为 300 秒。

## 证书申请

这里我们使用 ZeroSSL 来申请免费的证书。SSL 证书分为多种，有 DV（Domain Validation）、OV（Organization Validation）、EV（Extended Validation）等，DV 证书是最简单的，只需要验证域名的所有权，OV 和 EV 证书需要验证组织的所有权，需要更多的信息。DV 证书可以申请到免费的证书，OV 和 EV 证书需要付费。  

打开 [ZeroSSL](https://zerossl.com/)，点击 Get Free SSL。

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674873759717.png)  

使用邮箱注册账号。点击 New Certificate。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674873854607.png)  

输入你的域名，点击 Next。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230128104500.png)  

选择一张 90 天内有效的证书，点击 Next。（一年的证书需要付费）  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230128104533.png)  

接着一直点击 Next，直到新的页面出现。在验证页面，选择使用 DNS 验证。将 Name 和 Points To 的值复制下来。

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674874024637.png)

在 Name.com 的管理页面，添加一条 CNAME 记录，主机名为 Name，值为 Points To。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674874111665.png)  

由于有两个域名，所以申请两张证书。  

添加好后，回到 ZeroSSL 的验证页面，点击 Next。接着点击验证。验证成功后，点击下载 Nginx 证书。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1674874237630.png)  

每份证书都有两个文件，一个是证书文件，一个是私钥文件。将两个文件下载下来。下载好两张证书后，将份证书（共四张）上传到服务器的 `/etc/nginx/cert` 目录下。没有这个目录的话，可以自己创建。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20230128105442.png)

接着，在 Nginx 的配置文件中，修改证书的路径。  

```bash
sudo vim /etc/nginx/nginx.conf
```

```nginx title="/etc/nginx/nginx.conf"
ssl_certificate /etc/nginx/cert/ssl.crt;    # 你的证书路径
ssl_certificate_key  /etc/nginx/cert/ssl.key;   # 你的证书密钥路径
```

## 检查 Nginx 配置

待一切配置完成后，可以使用 `nginx -t` 来检查 Nginx 的配置是否正确。

```bash
sudo nginx -t
```

如果配置正确，会显示 `nginx: the configuration file /etc/nginx/nginx.conf syntax is ok`。  

接着重启 Nginx。

```bash
sudo nginx -s reload
```

## 放行端口

你需要在 Azure 的网络安全组中，放行 80 和 443 端口。这个上面放行 22 端口的时候已经讲过了，这里不再赘述。

## 常见问题

- 我的 Strapi 不会返回媒体数据（如图片）？  

这是因为 Strapi 默认不返回媒体数据，可以在接口后面加上 `?populate=*` 来返回媒体数据。详见 [文档](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.html#relation-media-fields)

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/img_v2_c2cf3653-d8ba-4718-b064-95da121367fg.jpg)

- 在操作 Ubuntu 时，经常出现无权限的问题，这是因为你的账号不是 root 账号，所以需要使用 `sudo` 命令来执行命令。

- 对于国内的服务器，可能在安装 npm 依赖时，会出现网络问题，这里可以使用 `cnpm` 来安装依赖。  

```bash
sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
```

- 明明都已经配置好了，但是访问网站时，还是会出现 `ERR_CONNECTION_REFUSED`。这是因为你的服务器没有放行 80 和 443 等相应的端口，所以需要在 Azure 的网络安全组中，放行 80 和 443 端口。

- Next 和 Strapi 服务启动失败。请现在本地启动 Next 和 Strapi 服务，进行测试，待没有问题后，再将服务部署到服务器上。  

- 如何在没有证书和域名时测试 Strapi ？  

使用 PM2 启动 Strapi 后，你就可以在 Azure 安全组中放行你的 Strapi 服务的端口，然后使用 IP 加端口的方式来访问你的 Strapi 服务。比如我这里是 1337 端口，所以我可以通过 `http://<IP>:1337/admin` 来访问 Strapi 的后台管理页面。  

- 服务器部署完后 Next.js 无法请求接口？  

那应该是你的软编码没改，需要将 `http://localhost:1337` 改为你的服务器的 IP 地址，或者你的域名。  

- 阿里云等服务器访问资源慢？

因为国内服务器限制带宽（为1-5M），而 Azure 不会，所以尽量压缩你的资源文件，比如图片、视频等。或者使用 Cloudflare 的 CDN 来加速你的网站。  

- Nginx 检查配置文件时，出现各种报错？  

这是因为你的配置文件语法或者格式有问题，需要检查你的配置文件。可以在下方留言，我会尽快回复你。  

如果对你有帮助，欢迎点赞和分享。  
