---
slug: first-blog-post
title: 认识Vue框架
authors: Chengzihan
tags: [Vuejs]
---

## Vue.js简介

### 定义它

Vue.js是一个用于创建用户界面的开源渐进式`JavaScript`框架，也是一个创建单页应用的Web应用框架。Vue.js是目前前端界三大框架之一（其他两个分别是React和Angular），旨在更好地组织与简化Web开发。Vue所关注的核心是MVC模式中的**视图层**，同时，它也能方便地获取数据更新，并通过组件内部特定的方法实现视图与模型的交互。  

### 谁创造了他？

提到Vue就必须提到他的创造者**尤雨溪**，它是中国程序员的骄傲。尤雨溪出生于中国无锡，上海念了三年高中，高中毕业后去美国念大学，尤雨溪的大学专业是**室内艺术和艺术史**，在Parsons读了一个美术设计和技术的硕士。尤雨溪被JavaScript吸引，JS能够快速构建一些东西并分享给别人，这是吸引尤雨溪开始Web开发和JavaScript编程的原因。尤雨溪在Google创意实验室工作的时候，工作需要在浏览器上进行大量原型设计，尤雨溪最初使用Angular，尤雨溪将喜欢的部分从Angular中提出来建立一个非常轻巧的库，Vue大概就这么开始了。  

## Vue.js的特点

- 组件

把构建web界面比喻为装修房子，当你的家里需要三张床的时候，如果你使用原生js，那么你就必须将这床的代码重复三次。而如果你使用vue，你只需要在某处定义它，在需要的地方调用即可，这就大大增强了开发效率和代码的可维护性，当所有床，比如上千张、上万张需要修改的时候，你就不再需要一张一张地去修改它，你只需要将模板修改掉就行，全局就会一起修改。  
下面是vue编写一个按钮组件的范例：  

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

- 控件跟数据自动绑定
在使用vue之前，想在页面上显示 `Hello World` ，(注意，此时的Hello World是作为一个使用js从后端读取来的数据，因此不能直接使用`<div>Hello World</div>`这样的代码）。
原生的js ：  

```js
<div id = 'app'></div>

<script>
// 先定义字符串
var string = 'Hello World';
// 获取 html dom
var app = document.getElementById('#app');
// 最后显示数据（挂载更新到页面上）
app.innerHtml = string
</script>
```

而使用vue之后：  

```js
<div id='#app'>{{message}}</div>
/*{{}} 是插值表达式， message 作为变量名*/
<script>
var. vm = new Vue({
    el:'#app', 
    // 挂载（绑定），相当于app 这个div 跟vue 实例绑定了， 在这个容器（div）里，就可以用vue来操作了
    data:{
    message:'Hello World'
    }
})
</script>
```

最后，在页面上展示的效果肯定是Hello World 而不是{{message}},此时的message已经被vue 解析成了 Hello World,这里并没有出现document.getElementById等操作dom的语法， 它只是对我们的数据进行了操作，这就是vue 其中的奥秘之处，它内部创建虚拟dom 来说实时跟踪，数据的变化，最后一次性的更新到页面上。  
此时你会觉得，这不就是换一种方法嘛？但实际上不是的，原生js操作html dom去更新页面很耗资源，他要重新加载新dom树（刷新页面），随着现代前端的发展，一个页面的功能和交互越来越多，当要重新加载新的dom树，就显得尤为浪费，加载的时间就会很长，vue就是解决这一问题的方法之一。  

:::tip 参考文献
<https://zhuanlan.zhihu.com/p/78855665>
:::

## Vue的生命周期

Vue生命周期是指vue实例对象从创建之初到销毁的过程，vue所有功能的实现都是围绕其生命周期进行的，在生命周期的不同阶段调用对应的钩子函数可以实现组件数据管理和DOM渲染两大重要功能。  
![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220713165130.png)  

## Vue-cli

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：  

- 通过 @vue/cli 实现的交互式的项目脚手架。
- 通过 @vue/cli + @vue/cli-service-global 实现的零配置原型开发。
- 一个运行时依赖 (@vue/cli-service)，该依赖：

>可升级；  
>基于 webpack 构建，并带有合理的默认配置；  
>可以通过项目内的配置文件进行配置；  
>可以通过插件进行扩展。  

- 一个丰富的官方插件集合，集成了前端生态中最好的工具。
- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。
