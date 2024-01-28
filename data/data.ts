import { type NavCatagory } from '../types'

export const NavData: NavCatagory[] = [
  {
    id: 0,
    name: '友链',
    desc: '朋友们的博客，欢迎交换友链',
    navs: [
      {
        name: '愧怍',
        link: 'https://kuizuo.cn/',
        desc: '愧怍的小站',
        type: 'friend',
        avatar: 'https://kuizuo.cn/img/logo.webp'
      },
      {
        name: 'swfoodt',
        link: 'https://swfoodt.netlify.app/',
        desc: 'swfoodt的个人博客',
        type: 'friend',
        avatar: 'https://swfoodt.netlify.app/img/Cylogo.png'
      },
      {
        name: 'OYY',
        link: 'https://anticounter.netlify.app/',
        desc: 'Wow, OYY is here!',
        type: 'friend',
        avatar: 'https://jcqn.oss-cn-beijing.aliyuncs.com/img_blog/site%20logo.jpg'
      },
      {
        name: 'XBan',
        link: 'https://xblc.netlify.app/',
        desc: 'XBan的个人博客',
        type: 'friend',
        avatar: 'https://s2.loli.net/2022/12/30/4wLbUj5hEmveOAt.png'
      },
      {
        name: '派兹',
        link: 'https://sakkana.me/',
        desc: '派兹的小站',
        type: 'friend',
        avatar: 'https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/zdtxi.svg'
      }
    ]
  },
  {
  //   深度学习
    id: 3,
    name: '深度学习',
    desc: '深度学习和机器学习相关资源',
    navs: [
      {
        name: 'Deep Learning',
        link: 'https://www.deeplearningbook.org/',
        desc: '花书',
        type: 'nav'
      },
      {
        name: '机器学习速成课程',
        link: 'https://developers.google.com/machine-learning/crash-course',
        desc: '谷歌提供的机器学习入门课程',
        type: 'nav'
      },
      {
        name: '吴恩达 AI 课程',
        link: 'https://www.coursera.org/specializations/deep-learning',
        desc: '由 Andrew Ng 教授主讲的深度学习系列课程',
        type: 'nav'
      },
      {
        name: 'Kaggle',
        link: 'https://www.kaggle.com/',
        desc: '数据科学竞赛平台，含有大量数据集和教程',
        type: 'nav'
      },
      {
        name: 'arXiv - 机器学习',
        link: 'https://arxiv.org/list/cs.LG/recent',
        desc: '最新的机器学习研究论文',
        type: 'nav'
      },
      {
        name: 'TensorFlow',
        link: 'https://www.tensorflow.org/',
        desc: '一个开源的机器学习库，由 Google 开发',
        type: 'nav'
      },
      {
        name: 'PyTorch',
        link: 'https://pytorch.org/',
        desc: '一个流行的开源机器学习库',
        type: 'nav'
      },
      {
        name: 'Keras',
        link: 'https://keras.io/',
        desc: '一个用于深度学习的高级神经网络 API',
        type: 'nav'
      },
      {
        name: 'MIT OpenCourseWare',
        link: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/',
        desc: 'MIT 提供的免费机器学习课程',
        type: 'nav'
      },
      {
        name: 'AI Experiments',
        link: 'https://experiments.withgoogle.com/collection/ai',
        desc: '谷歌提供的一系列人工智能实验',
        type: 'nav'
      },
      {
        name: 'Stanford 机器学习课程',
        link: 'http://cs229.stanford.edu/',
        desc: '斯坦福大学提供的机器学习课程',
        type: 'nav'
      }
    ]
  },
  {
    id: 2,
    name: '技术文档',
    desc: '技术文档，这里收录了一些我认为不错的技术文档',
    navs: [
      {
        name: 'Quick Reference',
        link: 'https://quickref.me/',
        desc: '技术速查表',
        type: 'nav'
      },
      {
        name: 'Quick Reference cn',
        link: 'https://quickref.cn/',
        desc: '技术速查表中文版',
        type: 'nav'
      },
      {
        name: 'MDN',
        link: 'https://developer.mozilla.org/zh-CN/',
        desc: 'MDN Web Docs 提供了开放的 Web 技术文档',
        type: 'nav'
      },
      {
        name: '菜鸟教程',
        link: 'https://www.runoob.com/',
        desc: '菜鸟教程是一个面向初学者的编程技术学习网站',
        type: 'nav'
      },
      {
        name: 'roadmap.sh',
        link: 'https://roadmap.sh/',
        desc: '旨在帮助开发人员了解他们应该学习哪些技术',
        type: 'nav'
      }
    ]
  },
  {
    id: 3,
    name: '技术社区',
    desc: '这里收录了一些我认为不错的技术社区',
    navs: [
      {
        name: '稀土掘金',
        link: 'https://juejin.cn/',
        desc: '新兴的技术社区，有很多优质的文章',
        type: 'nav'
      },
      {
        name: 'Stack Overflow',
        link: 'https://stackoverflow.com/',
        desc: 'Stack Overflow 是一个问答网站，它旨在为程序员提供一个互相帮助的平台',
        type: 'nav'
      },
      {
        name: 'SegmentFault',
        link: 'https://segmentfault.com/',
        desc: 'SegmentFault 思否是中国领先的新一代开发者社区和专业的技术媒体',
        type: 'nav'
      },
      {
        name: 'reddit',
        link: 'https://www.reddit.com/',
        desc: 'reddit 是一个由用户自行创建的内容聚合网站',
        type: 'nav'
      },
      {
        name: 'V2EX',
        link: 'https://www.v2ex.com/',
        desc: 'V2EX 是一个关于分享和探索的地方',
        type: 'nav'
      }
    ]
  },
  {
    id: 4,
    name: '开源社区',
    desc: '全球代码集中地',
    navs: [
      {
        name: 'GitHub',
        link: 'https://github.com',
        desc: 'GitHub 是全球最大的代码托管平台',
        type: 'nav'
      },
      {
        name: 'Gitee',
        link: 'https://gitee.com/',
        desc: '码云是一个面向开源及私有软件项目的托管平台',
        type: 'nav'
      },
      {
        name: 'GitLab',
        link: 'https://about.gitlab.com/',
        desc: 'GitLab 是一个开源的软件开发平台',
        type: 'nav'
      },
      {
        name: 'coding',
        link: 'https://coding.net/',
        desc: 'coding 是一个面向开发者的云端开发平台',
        type: 'nav'
      }
    ]
  },
  {
    id: 6,
    name: '在线工具',
    desc: '方便快捷的在线工具',
    navs: [
      {
        name: 'JSON 格式化',
        link: 'https://www.bejson.com/jsonviewernew/',
        desc: 'JSON 格式化工具',
        type: 'nav'
      },
      {
        name: 'Base64 编码',
        link: 'https://tool.lu/base64/',
        desc: 'Base64 编码工具',
        type: 'nav'
      },
      {
        name: 'RegexVis',
        link: 'https://regex-vis.com/',
        desc: '正则表达式在线测试工具',
        type: 'nav'
      },
      {
        name: '最优图片优化',
        link: 'https://zh.recompressor.com/',
        desc: '最优图片优化工具',
        type: 'nav'
      },
      {
        name: 'convertio',
        link: 'https://convertio.co/zh/',
        desc: '文件转换器',
        type: 'nav'
      },
      {
        name: 'MuseTransfer',
        link: 'https://musetransfer.com/',
        desc: '在线文件传输',
        type: 'nav'
      },
      {
        name: 'particles.js',
        link: 'https://vincentgarreau.com/particles.js/',
        desc: '粒子背景生成器',
        type: 'nav'
      },
      // processon
      {
        name: 'processon',
        link: 'https://www.processon.com/',
        desc: '在线流程图工具',
        type: 'nav'
      },
      // 翻译 deepl
      {
        name: 'deepl',
        link: 'https://www.deepl.com/translator',
        desc: '在线翻译工具',
        type: 'nav'
      }
    ]
  },
  {
    id: 7,
    name: '在线编码',
    desc: '在线编码工具',
    navs: [
      {
        name: 'Google Colab',
        link: 'https://colab.research.google.com/',
        desc: '谷歌提供的 python notebook 以及 GPU',
        type: 'nav'
      },
      {
        name: 'CodePen',
        link: 'https://codepen.io/',
        desc: '在线编码工具老牌',
        type: 'nav'
      },
      {
        name: 'CodeSandbox',
        link: 'https://codesandbox.io/',
        desc: '在线前端IDE',
        type: 'nav'
      },
      {
        name: 'JSFiddle',
        link: 'https://jsfiddle.net/',
        desc: '在线编码工具',
        type: 'nav'
      },
      {
        name: 'StackBlitz',
        link: 'https://stackblitz.com/',
        desc: '在线前端IDE',
        type: 'nav'
      },
      {
        name: 'GitHub Codespaces',
        link: 'https://github.com',
        desc: '在线前端IDE',
        type: 'nav'
      }
    ]
  },
  {
    id: 8,
    name: 'React 生态',
    desc: 'React 全家桶',
    navs: [
      {
        name: 'React',
        link: 'https://react.dev/',
        desc: 'React 官网',
        type: 'nav'
      },
      {
        name: 'React Router',
        link: 'https://reactrouter.com/',
        desc: 'React Router 官网',
        type: 'nav'
      },
      {
        name: 'Redux',
        link: 'https://redux.js.org/',
        desc: 'Redux 是一个状态管理库',
        type: 'nav'
      },
      {
        name: 'Redux Toolkit',
        link: 'https://redux-toolkit.js.org/',
        desc: 'Redux Toolkit 是一个 Redux 工具包',
        type: 'nav'
      },
      {
        name: 'MobX',
        link: 'https://mobx.js.org/README.html',
        desc: 'MobX 是一个状态管理库',
        type: 'nav'
      },
      {
        name: 'Next.js',
        link: 'https://nextjs.org/',
        desc: 'Next.js 是一个 React 服务端渲染框架',
        type: 'nav'
      },
      // Ahooks
      {
        name: 'ahooks',
        link: 'https://ahooks.js.org/zh-CN',
        desc: 'Ahooks 是封装了一系列 React Hooks 的库',
        type: 'nav'
      },
      {
        name: 'Gatsby',
        link: 'https://www.gatsbyjs.com/',
        desc: 'Gatsby 是一个 React 网站生成器',
        type: 'nav'
      },
      {
        name: 'Remix',
        link: 'https://remix.run/',
        desc: 'Remix 是一个 React 服务端渲染框架',
        type: 'nav'
      },
      // SWR
      {
        name: 'swr',
        link: 'https://swr.vercel.app/',
        desc: 'SWR 是一个 React Hooks 库，用于数据获取',
        type: 'nav'
      },
      {
        name: 'React Query',
        link: 'https://react-query.tanstack.com/',
        desc: 'React Query 是一个 React Hooks 库，用于数据获取',
        type: 'nav'
      },
      {
        name: 'UmiJS',
        link: 'https://umijs.org/zh-CN',
        desc: 'UmiJS 是一个 React 应用框架',
        type: 'nav'
      },
      {
        name: 'Mordern.js',
        link: 'https://modern-js.dev/',
        desc: 'Mordern.js 是一个 React 应用框架',
        type: 'nav'
      }
    ]
  },
  {
    id: 14,
    name: '后端语言',
    desc: '流行的后端开发语言',
    navs: [
      {
        name: 'Go',
        link: 'https://golang.org/',
        desc: 'Go 是 Google 开发的一种静态类型、编译型的编程语言',
        type: 'nav'
      },
      {
        name: 'Python',
        link: 'https://www.python.org/',
        desc: 'Python 是一种面向对象的解释型计算机程序设计语言',
        type: 'nav'
      },
      {
        name: 'Node.js',
        link: 'https://nodejs.org/',
        desc: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时',
        type: 'nav'
      },
      {
        name: 'Rust',
        link: 'https://www.rust-lang.org/',
        desc: 'Rust 是一种系统编程语言，由 Mozilla 研究院开发',
        type: 'nav'
      },
      {
        name: 'C++',
        link: 'https://www.cplusplus.com/',
        desc: 'C++ 是一种通用的程序设计语言',
        type: 'nav'
      },
      {
        name: 'Java',
        link: 'https://www.java.com/',
        desc: 'Java 是一种面向对象的编程语言',
        type: 'nav'
      },
      {
        name: 'PHP',
        link: 'https://www.php.net/',
        desc: 'PHP 是一种通用开源脚本语言',
        type: 'nav'
      }
    ]
  },
  {
    id: 15,
    name: '后端框架',
    desc: '流行的后端开发框架',
    navs: [
      {
        // Nest.js
        name: 'Nest.js',
        link: 'https://nestjs.com/',
        desc: 'Nest.js 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架',
        type: 'nav'
      },
      {
        name: 'Spring Boot',
        link: 'https://spring.io/projects/spring-boot',
        desc: 'Spring Boot 是 Spring 框架的一个子项目，用于简化新 Spring 应用的初始搭建以及开发过程',
        type: 'nav'
      },
      {
        name: 'Express',
        link: 'https://expressjs.com/',
        desc: 'Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架',
        type: 'nav'
      },
      {
        name: 'Flask',
        link: 'https://flask.palletsprojects.com/',
        desc: 'Flask 是一个使用 Python 编写的轻量级 Web 应用框架',
        type: 'nav'
      },
      {
        name: 'Django',
        link: 'https://www.djangoproject.com/',
        desc: 'Django 是一个高级 Python Web 框架，鼓励快速开发和优雅的设计',
        type: 'nav'
      },
      {
        name: 'FastAPI',
        link: 'https://fastapi.tiangolo.com/',
        desc: 'FastAPI 是一个现代、快速（高性能）的 Web 框架，用于构建 API 服务',
        type: 'nav'
      },
      {
        name: 'Laravel',
        link: 'https://laravel.com/',
        desc: 'Laravel 是一个 PHP 框架',
        type: 'nav'
      },
      {
        name: 'Deno',
        link: 'https://deno.land/',
        desc: 'Deno 是一个 JavaScript 和 TypeScript 的运行时',
        type: 'nav'
      },
      // https://fresh.deno.dev/
      {
        name: 'Fresh',
        link: 'https://fresh.deno.dev/',
        desc: 'Fresh 是一个 Deno 的 Web 框架',
        type: 'nav'
      }
    ]
  },
  {
    id: 17,
    name: '平台与服务',
    desc: 'BaaS、PaaS、SaaS 等平台与服务',
    navs: [
      {
        name: 'Vercel',
        link: 'https://vercel.com/',
        desc: 'Vercel 是一个现代的网站托管平台',
        type: 'nav'
      },
      {
        name: 'Netlify',
        link: 'https://www.netlify.com/',
        desc: 'Netlify 是一个现代的网站托管平台',
        type: 'nav'
      },
      {
        name: 'Railway',
        link: 'https://railway.app/',
        desc: 'Railway 是一个现代的网站托管平台',
        type: 'nav'
      },
      {
        name: 'Coolify',
        link: 'https://coolify.io/',
        desc: 'Coolify 可自建的现代网站托管平台',
        type: 'nav'
      },
      {
        name: 'Supabase',
        link: 'https://supabase.io/',
        desc: 'Supabase 是一个开源的 Firebase 替代品',
        type: 'nav'
      },
      {
        name: 'Render',
        link: 'https://render.com/',
        desc: 'Render 是一个现代的网站托管平台',
        type: 'nav'
      },
      {
        name: 'Heroku',
        link: 'https://www.heroku.com/',
        desc: 'Heroku 是一个现代的网站托管平台',
        type: 'nav'
      },
      {
        name: 'MogoDB Atlas',
        link: 'https://www.mongodb.com/cloud/atlas',
        desc: 'MogoDB Atlas 是云端的 MongoDB 数据库',
        type: 'nav'
      }
    ]
  },
  {
    id: 24,
    name: '运行环境',
    desc: '操作系统相关',
    navs: [
      {
        name: 'Linux',
        link: 'https://www.linux.org/',
        desc: 'Linux 是一个开源的操作系统',
        type: 'nav'
      },
      {
        name: 'Ubuntu',
        link: 'https://ubuntu.com/',
        desc: 'Ubuntu 是一个基于 Debian 的 Linux 发行版',
        type: 'nav'
      },
      {
        name: 'Docker',
        link: 'https://www.docker.com/',
        desc: 'Docker 是一个开源的应用容器引擎',
        type: 'nav'
      }
    ]
  }
]
