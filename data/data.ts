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
        name: 'nekoken',
        link: 'http://www.zounuo.cc/',
        desc: 'nekoken\'s blog:)',
        type: 'friend',
        avatar: '/avatar/nekoken.png'
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
    id: 1,
    name: '前端框架',
    desc: '前端时代，框架层出不穷，以下是当前最流行的几大框架',
    navs: [
      {
        name: 'React',
        link: 'https://reactjs.org/',
        desc: '用于构建用户界面的 JavaScript 库',
        type: 'nav'
      },
      {
        name: 'Vue',
        link: 'https://vuejs.org/',
        desc: '渐进式 JavaScript 框架',
        type: 'nav'
      },
      {
        name: 'Angular',
        link: 'https://angular.io/',
        desc: '一套框架，多种平台',
        type: 'nav'
      },
      {
        name: 'Svelte',
        link: 'https://svelte.dev/',
        desc: 'Svelte 是前端新秀，它的目标是提供一种更好的方式来构建应用程序',
        type: 'nav'
      },
      {
        name: 'Solid',
        link: 'https://solidjs.com/',
        desc: 'Solid 不使用虚拟 DOM，而是使用原生 DOM，前端新秀',
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
        name: 'W3C',
        link: 'https://www.w3.org/',
        desc: 'W3C 是万维网联盟的核心组织，致力于 Web 技术的发展',
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
    desc: '技术就该在社区中交流',
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
    id: 5,
    name: '前端基础',
    desc: '前端基础知识',
    navs: [
      {
        name: 'JavaScript',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
        desc: 'JavaScript 是前端之基',
        type: 'nav'
      },
      {
        name: 'HTML',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML',
        desc: 'HTML 是前端三座大山之一',
        type: 'nav'
      },
      {
        name: 'CSS',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS',
        desc: 'CSS 是前端三座大山之一',
        type: 'nav'
      },
      {
        name: 'ES6',
        link: 'https://es6.ruanyifeng.com/',
        desc: 'ECMAScript 6 是下一代 JavaScript 语言的标准',
        type: 'nav'
      },
      {
        name: 'TypeScript',
        link: 'https://www.tslang.cn/',
        desc: 'TypeScript 是 JavaScript 的一个超集',
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
      {
        name: 'neumorphism',
        link: 'https://neumorphism.io/#e0e0e0',
        desc: '阴影生成器',
        type: 'nav'
      },
      {
        name: 'coolhue',
        link: 'https://webkul.github.io/coolhue/',
        desc: '渐变色生成器',
        type: 'nav'
      },
      // https://cssgradient.io/
      {
        name: 'cssgradient',
        link: 'https://cssgradient.io/',
        desc: '渐变色生成器',
        type: 'nav'
      },
      {
        name: 'Bounce',
        link: 'http://www.htmleaf.com/Demo/201502231412.html',
        desc: 'CSS3 可视化动画生成',
        type: 'nav'
      },
      // https://pixelmap.amcharts.com/
      {
        name: 'pixelmap',
        link: 'https://pixelmap.amcharts.com/',
        desc: '地图生成器',
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
      },
      {
        name: 'builder.io',
        link: 'https://www.builder.io/',
        desc: '网页转为设计稿',
        type: 'nav'
      },
      {
        name: 'carbon',
        link: 'https://carbon.now.sh/',
        desc: '代码生成图片',
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
    id: 9,
    name: 'Vue 生态',
    desc: 'Vue 全家桶',
    navs: [
      {
        name: 'Vue',
        link: 'https://cn.vuejs.org/',
        desc: 'Vue 官网',
        type: 'nav'
      },
      {
        name: 'Vue Router',
        link: 'https://router.vuejs.org/zh/',
        desc: 'Vue Router 官网',
        type: 'nav'
      },
      {
        name: 'Vuex',
        link: 'https://vuex.vuejs.org/zh/',
        desc: 'Vuex 是一个状态管理库',
        type: 'nav'
      },
      {
        name: 'Pinia',
        link: 'https://pinia.esm.dev/',
        desc: 'Pinia 是一个 Vue 状态管理库',
        type: 'nav'
      },
      {
        name: 'Nuxt.js',
        link: 'https://nuxt.com/',
        desc: 'Nuxt.js 是一个 Vue 服务端渲染框架',
        type: 'nav'
      }
    ]
  },
  {
    id: 10,
    name: 'CSS',
    desc: 'CSS 相关',
    navs: [
      {
        name: 'SCSS',
        link: 'https://sass-lang.com/',
        desc: 'SCSS 是一个 CSS 预处理器',
        type: 'nav'
      },
      {
        name: 'Less',
        link: 'http://lesscss.cn/',
        desc: 'Less 是一个 CSS 预处理器',
        type: 'nav'
      },
      {
        name: 'Stylus',
        link: 'https://stylus.bootcss.com/',
        desc: 'Stylus 是一个 CSS 预处理器',
        type: 'nav'
      },
      {
        name: 'PostCSS',
        link: 'https://postcss.org/',
        desc: 'PostCSS 是一个 CSS 处理器',
        type: 'nav'
      },
      {
        name: 'Tailwind CSS',
        link: 'https://tailwindcss.com/',
        desc: 'Tailwind CSS 是一个 CSS 框架',
        type: 'nav'
      },
      {
        name: 'Windi',
        link: 'https://windicss.org/',
        desc: 'Windi 是一个 CSS 框架',
        type: 'nav'
      },
      {
        name: 'Uno CSS',
        link: 'https://unocss.org/',
        desc: 'Uno CSS 是一个 CSS 框架',
        type: 'nav'
      },
      {
        name: 'Twind',
        link: 'https://twind.dev/',
        desc: '更小的 Tailwind CSS',
        type: 'nav'
      },
      {
        name: 'CSS Inspiration',
        link: 'https://csscoco.com/inspiration/',
        desc: 'CSS Inspiration',
        type: 'nav'
      },
      {
        name: 'CSS FX',
        link: 'https://cssfx.netlify.app/',
        desc: '漂亮的可复制的 CSS 样式',
        type: 'nav'
      },
      {
        name: 'Universe',
        link: 'https://uiverse.io/',
        desc: '漂亮的可复制的 CSS 样式',
        type: 'nav'
      },
      {
        name: 'Glassmorphism',
        link: 'https://hype4.academy/tools/glassmorphism-generator',
        desc: 'Glassmorphism 生成器',
        type: 'nav'
      }
    ]
  },
  {
    id: 11,
    name: 'UI 组件库',
    desc: '当前最流行的 UI 组件库',
    navs: [
      {
        name: 'chakra',
        link: 'https://chakra.com/',
        desc: 'Chakra 是美观强大的 React 组件库',
        type: 'nav'
      },
      {
        name: 'Ant Design',
        link: 'https://ant.design/',
        desc: 'Ant Design 是一个企业级 UI 设计语言和 React 组件库',
        type: 'nav'
      },
      {
        name: 'Element',
        link: 'https://element.eleme.cn/#/zh-CN',
        desc: 'Element 是一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的组件库',
        type: 'nav'
      },
      // ELEMENT PLUS
      {
        name: 'Element Plus',
        link: 'https://element-plus.gitee.io/#/zh-CN',
        desc: 'Element Plus 是 Vue 3.0 的组件库',
        type: 'nav'
      },
      {
        name: 'Material-UI',
        link: 'https://material-ui.com/',
        desc: 'Material-UI 是一个 React 组件库，它实现了 Google 的 Material Design 规范',
        type: 'nav'
      },
      {
        name: 'Bootstrap',
        link: 'https://getbootstrap.com/',
        desc: 'Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目',
        type: 'nav'
      },
      {
        name: 'Vuetify',
        link: 'https://vuetifyjs.com/zh-Hans/',
        desc: 'Vuetify 是一个 Vue UI 组件库，它实现了 Google 的 Material Design 规范',
        type: 'nav'
      },
      {
        name: 'Next UI',
        link: 'https://nextui.org/',
        desc: 'Next UI 是一个基于 React 的 UI 组件库',
        type: 'nav'
      },
      {
        name: 'DaisyUI',
        link: 'https://daisyui.com/',
        desc: 'DaisyUI 是一个基于 Tailwind CSS 的 UI 组件库',
        type: 'nav'
      },
      {
        name: 'Acro Design',
        link: 'https://arco.design/',
        desc: 'Acro Design 是字节跳动的一套设计语言',
        type: 'nav'
      },
      {
        name: 'Semi Design',
        link: 'https://semi.design/',
        desc: 'Semi Design 是飞书业务组件库',
        type: 'nav'
      },
      // https://www.radix-ui.com/docs/primitives/overview/introduction
      {
        name: 'Radix UI',
        link: 'https://www.radix-ui.com/',
        desc: 'Radix UI 是一个 React 组件库，它提供了一组可组合的原语',
        type: 'nav'
      },
      // https://mantine.dev/pages/getting-started/
      {
        name: 'Mantine',
        link: 'https://mantine.dev/',
        desc: 'Mantine 是一个 React 组件库',
        type: 'nav'
      },
      // TDesign
      {
        name: 'TDesign',
        link: 'https://tdesign.tencent.com/',
        desc: 'TDesign 是腾讯云设计体系',
        type: 'nav'
      },
      {
        name: 'NutUI',
        link: 'https://nutui.jd.com/#/zh-CN',
        desc: 'NutUI 是京东凹凸实验室的一套移动端组件库',
        type: 'nav'
      },
      {
        name: 'Vant',
        link: 'https://vant-contrib.gitee.io/vant/#/zh-CN/',
        desc: 'Vant 是有赞前端团队开源的移动端组件库',
        type: 'nav'
      },
      {
        name: 'Headless UI',
        link: 'https://headlessui.dev/',
        desc: 'Headless UI 是 Tailwind Labs 开发的一套完全无样式的 UI 组件库',
        type: 'nav'
      },
      {
        // https://saas-ui.dev/
        name: 'Saas UI',
        link: 'https://saas-ui.dev/',
        desc: 'Saas UI 是一个 SaaS 产品的 React 组件库',
        type: 'nav'
      },
      // https://ui.shadcn.com/docs/primitives/separator
      {
        name: 'Shadcn UI',
        link: 'https://ui.shadcn.com/',
        desc: 'Shadcn UI 是一个基于 Radix 的 React 组件库',
        type: 'nav'
      },
      // https://vuesax.com/
      {
        name: 'Vuesax',
        link: 'https://vuesax.com/',
        desc: 'Vuesax 是一个 Vue 组件库',
        type: 'nav'
      },
      {
        name: 'Naive UI',
        link: 'https://www.naiveui.com/zh-CN/os-theme',
        desc: 'Naive UI 是一个基于 Vue 3.0 的 UI 组件库',
        type: 'nav'
      }
    ]
  },
  {
    id: 12,
    name: '跨平台',
    desc: '跨平台可行的方案',
    navs: [
      {
        // electron
        name: 'Electron',
        link: 'https://www.electronjs.org/',
        desc: 'Electron 是一个使用 JavaScript、HTML 和 CSS 构建跨平台桌面应用程序的开源库',
        type: 'nav'
      },
      {
        name: 'Flutter',
        link: 'https://flutter.dev/',
        desc: 'Flutter 是 Google 开发的跨平台移动应用开发框架',
        type: 'nav'
      },
      {
        // https://tauri.app/
        name: 'Tauri',
        link: 'https://tauri.studio/zh-CN/',
        desc: 'Tauri 是一个使用 Rust 和 Web 技术构建跨平台桌面应用程序的框架',
        type: 'nav'
      },
      {
        name: 'React Native',
        link: 'https://reactnative.dev/',
        desc: 'React Native 是 Facebook 开发的跨平台移动应用开发框架，基于 React',
        type: 'nav'
      },
      {
        name: 'Weex',
        link: 'https://weex.apache.org/',
        desc: 'Weex 是 Apache 开发的跨平台移动应用开发框架',
        type: 'nav'
      },
      {
        name: 'Taro',
        link: 'https://taro.jd.com/',
        desc: 'Taro 是一个遵循 React 语法规范的多端统一开发框架',
        type: 'nav'
      },
      {
        name: 'uni-app',
        link: 'https://uniapp.dcloud.io/',
        desc: 'uni-app 是一个使用 Vue.js 开发所有前端应用的框架',
        type: 'nav'
      }
    ]
  },
  {
    id: 13,
    name: '数据可视化',
    desc: '数据可视化方案',
    navs: [
      {
        name: 'ECharts',
        link: 'https://echarts.apache.org/zh/index.html',
        desc: 'ECharts 是一个使用 JavaScript 实现的开源可视化库',
        type: 'nav'
      },
      {
        name: 'G2Plot',
        link: 'https://g2plot.antv.vision/zh',
        desc: 'G2Plot 是 AntV 推出的一套基于 G2 的图表库',
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
    id: 16,
    name: '工程化',
    desc: '前端工程化相关',
    navs: [
      {
        name: 'Webpack',
        link: 'https://webpack.js.org/',
        desc: 'Webpack 是一个现代 JavaScript 应用程序的静态模块打包器',
        type: 'nav'
      },
      {
        name: 'Rollup',
        link: 'https://rollupjs.org/',
        desc: 'Rollup 是一个 JavaScript 模块打包器',
        type: 'nav'
      },
      {
        name: 'Vite',
        link: 'https://cn.vitejs.dev/',
        desc: 'Vite 是一个由原生 ES 模块支持的下一代前端构建工具',
        type: 'nav'
      },
      {
        // esbuild
        name: 'esbuild',
        link: 'https://esbuild.github.io/',
        desc: 'esbuild 是一个 JavaScript 和 CSS 的快速打包器和压缩器',
        type: 'nav'
      },
      {
        name: 'Turbopack',
        link: 'https://turbo.build/pack',
        desc: 'Turbopack 是一个基于 Rust 的构建器',
        type: 'nav'
      },
      // https://rspack.dev/
      {
        name: 'RSPack',
        link: 'https://rspack.dev/',
        desc: 'RSPack 是字节跳动开源的基于 Rust 的构建器',
        type: 'nav'
      },
      {
        // eslint
        name: 'ESLint',
        link: 'https://eslint.org/',
        desc: 'ESLint 是一个用于识别和报告 JavaScript 代码中的模式问题的工具',
        type: 'nav'
      },
      {
        // prettier
        name: 'Prettier',
        link: 'https://prettier.io/',
        desc: 'Prettier 是一个代码格式化工具',
        type: 'nav'
      },
      {
        // stylelint
        name: 'Stylelint',
        link: 'https://stylelint.io/',
        desc: 'Stylelint 是一个用于识别和报告 CSS 中的模式问题的工具',
        type: 'nav'
      },
      {
        // commitlint
        name: 'Commitlint',
        link: 'https://commitlint.js.org/',
        desc: 'Commitlint 是一个用于检查提交信息的工具',
        type: 'nav'
      },
      {
        // husky
        name: 'Husky',
        link: 'https://typicode.github.io/husky/',
        desc: 'Husky 是一个 Git 钩子工具',
        type: 'nav'
      },
      {
        // leran
        name: 'Lerna',
        link: 'https://lerna.js.org/',
        desc: 'Lerna 是一个 monorepo 管理工具',
        type: 'nav'
      },
      {
        // turborepo
        name: 'Turborepo',
        link: 'https://turbo.build/repo',
        desc: 'Turborepo 是一个 monorepo 管理工具',
        type: 'nav'
      },
      {
        // jest
        name: 'Jest',
        link: 'https://jestjs.io/',
        desc: 'Jest 是一个测试框架',
        type: 'nav'
      },
      {
        // react testing library
        name: 'React Testing Library',
        link: 'https://testing-library.com/docs/react-testing-library/intro/',
        desc: 'React Testing Library 是一个测试框架',
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
    id: 18,
    name: 'NPM 包',
    desc: '常用的 NPM 包',
    navs: [
      {
        name: 'NPM',
        link: 'https://www.npmjs.com/',
        desc: 'NPM 是一个 Nodejs 包管理器',
        type: 'nav'
      },
      {
        name: 'Yarn',
        link: 'https://yarnpkg.com/',
        desc: 'Yarn 是一个 Nodejs 包管理器',
        type: 'nav'
      },
      {
        name: 'pnpm',
        link: 'https://pnpm.io/',
        desc: 'pnpm 是一个更快、更可靠、更节省空间的 Node.js 包管理器',
        type: 'nav'
      },
      {
        name: 'dayjs',
        link: 'https://npmjs.com/package/dayjs',
        desc: 'dayjs 是一个轻量的处理时间和日期的 JavaScript 库',
        type: 'nav'
      },
      {
        name: 'smoothscroll-polyfill',
        link: 'https://npmjs.com/package/smoothscroll-polyfill',
        desc: 'smoothscroll-polyfill 是一个平滑滚动的 polyfill',
        type: 'nav'
      },
      {
        name: 'axios',
        link: 'https://npmjs.com/package/axios',
        desc: 'axios 是一个基于 Promise 的 HTTP 库',
        type: 'nav'
      },
      {
        name: 'qs',
        link: 'https://npmjs.com/package/qs',
        desc: 'qs 是一个 JavaScript 库，用于解析和序列化 URL 查询字符串',
        type: 'nav'
      },
      {
        name: 'lodash',
        link: 'https://npmjs.com/package/lodash',
        desc: 'lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库',
        type: 'nav'
      },
      {
        name: 'cobe',
        link: 'https://npmjs.com/package/cobe',
        desc: 'cobe 是一个轻量的 WebGL 地球',
        type: 'nav'
      },
      {
        // cookie
        name: 'js-cookie',
        link: 'https://npmjs.com/package/js-cookie',
        desc: 'js-cookie 是一个轻量的操作 cookie 的库',
        type: 'nav'
      },
      {
        // clipboard
        name: 'clipboard.js',
        link: 'https://npmjs.com/package/clipboard.js',
        desc: 'clipboard.js 是一个操作剪贴板的库',
        type: 'nav'
      },
      {
        // 彩屑
        name: 'confetti',
        link: 'https://www.npmjs.com/package/canvas-confetti',
        desc: 'confetti 是一个彩屑动画的库',
        type: 'nav'
      }
    ]
  },
  {
    id: 19,
    name: '3D 和动画',
    desc: '3D 和动画框架及库',
    navs: [
      {
        name: 'three.js',
        link: 'https://threejs.org/',
        desc: 'three.js 是一个基于 WebGL 的 JavaScript 3D 库',
        type: 'nav'
      },
      {
        name: 'GreenSock',
        link: 'https://greensock.com/',
        desc: 'GreenSock 是一个动画库',
        type: 'nav'
      },
      {
        name: 'anime.js',
        link: 'https://animejs.com/',
        desc: 'anime.js 是一个动画库',
        type: 'nav'
      },
      {
        // https://pixijs.com/
        name: 'PixiJS',
        link: 'https://pixijs.com/',
        desc: 'PixiJS 是一个 2D 渲染引擎',
        type: 'nav'
      },
      // https://animista.net/play/attention/wobble
      {
        name: 'Animista',
        link: 'https://animista.net/',
        desc: 'Animista 是一个 CSS 动画库',
        type: 'nav'
      },
      {
        name: 'aframe',
        link: 'https://aframe.io/',
        desc: 'aframe 是一个 WebVR 框架',
        type: 'nav'
      }
    ]
  },
  {
    id: 20,
    name: '设计',
    desc: '设计相关的网站',
    navs: [
      {
        name: 'Dribbble',
        link: 'https://dribbble.com/',
        desc: 'Dribbble 是一个设计师的社区',
        type: 'nav'
      },
      {
        name: '即时设计',
        link: 'https://js.design/',
        desc: '即时设计是一个国产的设计工具',
        type: 'nav'
      },
      {
        name: 'MasterGo',
        link: 'https://mastergo.com/',
        desc: 'MasterGo 是一个设计工具',
        type: 'nav'
      },
      {
        // figma
        name: 'Figma',
        link: 'https://www.figma.com/',
        desc: 'Figma 是一个设计工具',
        type: 'nav'
      },
      {
        // sketch
        name: 'Sketch',
        link: 'https://www.sketch.com/',
        desc: 'Sketch 是一个设计工具',
        type: 'nav'
      }
    ]
  },
  {
    id: 21,
    name: '字体和图标和插画',
    desc: '常用的字体和图标和插画',
    navs: [
      {
        name: 'Font Awesome',
        link: 'https://fontawesome.com/',
        desc: 'Font Awesome 是一个图标库',
        type: 'nav'
      },
      {
        name: 'iconfont',
        link: 'https://www.iconfont.cn/',
        desc: 'iconfont 是一个图标库',
        type: 'nav'
      },
      {
        name: 'iconify',
        link: 'https://iconify.design/',
        desc: 'iconify 是一个图标库',
        type: 'nav'
      },
      {
        name: 'google fonts',
        link: 'https://fonts.google.com/',
        desc: 'google fonts 是一个字体库',
        type: 'nav'
      },
      // https://react-iconly.jrgarciadev.com/
      {
        name: 'iconly',
        link: 'https://iconly.jrgarciadev.com/',
        desc: 'iconly 是一个图标库',
        type: 'nav'
      },
      {
        name: 'React icons',
        link: 'https://react-icons.github.io/react-icons/',
        desc: 'React icons 是适用于 React 的图标库集合',
        type: 'nav'
      },
      {
        // https://www.pexels.com/
        name: 'Pexels',
        link: 'https://www.pexels.com/',
        desc: 'Pexels 是一个免费的图片库',
        type: 'nav'
      },
      {
        // https://heroicons.com/
        name: 'Heroicons',
        link: 'https://heroicons.com/',
        desc: 'Heroicons 是一个图标库',
        type: 'nav'
      },
      {
        // https://undraw.co/illustrations
        name: 'unDraw',
        link: 'https://undraw.co/illustrations',
        desc: 'unDraw 是一个插画库',
        type: 'nav'
      }
    ]
  },
  {
    id: 22,
    name: '站点生成器',
    desc: '站点生成器,SSG 方案',
    navs: [
      {
        name: 'Nextra',
        link: 'https://nextra.site/',
        desc: 'Nextra 是一个 Next.js 驱动的静态站点生成器',
        type: 'nav'
      },
      {
        name: 'Gatsby',
        link: 'https://www.gatsbyjs.com/',
        desc: 'Gatsby 是一个静态站点生成器',
        type: 'nav'
      },
      {
        name: 'VuePress',
        link: 'https://vuepress.vuejs.org/',
        desc: 'VuePress 是一个 Vue 驱动的静态站点生成器',
        type: 'nav'
      },
      {
        name: 'VitePress',
        link: 'https://vitepress.vuejs.org/',
        desc: 'VitePress 是一个 Vue 驱动的静态站点生成器',
        type: 'nav'
      },
      {
        name: 'island.js',
        link: 'https://island.js.org/',
        desc: 'island.js 是一个基于孤岛架构的 SSG',
        type: 'nav'
      },
      {
        name: 'Docusaurus',
        link: 'https://docusaurus.io/',
        desc: 'Docusaurus 是一个静态站点生成器',
        type: 'nav'
      },
      {
        name: 'Docus',
        link: 'https://docus.dev/',
        desc: 'Docus 是 Nuxt Labs 开源的静态站点生成器',
        type: 'nav'
      }
    ]
  },
  {
    id: 23,
    name: 'CMS',
    desc: '站点管理系统',
    navs: [
      {
        name: 'Strapi',
        link: 'https://strapi.io/',
        desc: 'Strapi 是一个开源的无头 CMS',
        type: 'nav'
      },
      {
        name: 'Sanity',
        link: 'https://www.sanity.io/',
        desc: 'Sanity 是一个开源的无头 CMS',
        type: 'nav'
      },
      {
        name: 'Helo',
        link: 'https://halo.run/',
        desc: 'Helo 是一个开源的 CMS，基于 Java',
        type: 'nav'
      },
      {
        name: 'Ghost',
        link: 'https://ghost.org/',
        desc: 'Ghost 是一个开源的 CMS，基于 Node.js',
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
  },
  {
    id: 25,
    name: 'ORM',
    desc: '对象关系映射',
    navs: [
      {
        name: 'Prisma',
        link: 'https://www.prisma.io/',
        desc: 'Prisma 是一个方便快捷的 ORM 库',
        type: 'nav'
      },
      {
        name: 'TypeORM',
        link: 'https://typeorm.io/#/',
        desc: 'TypeORM 是一个 ORM 库',
        type: 'nav'
      }
    ]
  },
  {
    id: 26,
    name: 'Serverless',
    desc: 'Serverless 无服务器提供商',
    navs: [
      {
        name: 'Vercel',
        link: 'https://vercel.com/',
        desc: 'Vercel 是最流行的服务器无关的部署平台',
        type: 'nav'
      },
      {
        name: 'Netlify',
        link: 'https://www.netlify.com/',
        desc: 'Netlify 是一个静态站点托管平台',
        type: 'nav'
      },
      {
        name: 'Supabase',
        link: 'https://supabase.io/',
        desc: 'Supabase 是一个开源的 Firebase 替代品',
        type: 'nav'
      },
      {
        name: 'Railway',
        link: 'https://railway.app/',
        desc: 'Railway 是项目部署平台',
        type: 'nav'
      },
      {
        name: 'Render',
        link: 'https://render.com/',
        desc: 'Render 是一个托管平台',
        type: 'nav'
      }
    ]
  }
]
