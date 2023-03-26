---
slug: gitrules
title: git commit 规范
authors: Chengzihan
tags: [git]
---

## 意义

受大佬 愧怍 的建议，我要规范一下自己的 Git Commit 规范，首先因为规范的提交命名一目了然，其次看起来也更高级，参考[愧怍的文档](https://kuizuo.cn/docs/skill/git/git-conmit-specification)，我也将相关规范记录如下。  

Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交。但是，一般来说，commit message 应该清晰明了，说明本次提交的目的。这样，就可以让其他人了解到你的代码提交的目的，从而更好地协作开发。  

目前，社区有多种 Commit message 的写法规范。本文介绍 [Angular 规范](https://link.jianshu.com/?t=https%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2F1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y%2Fedit%23heading%3Dh.greljkmo14y0) 是目前使用最广的写法，比较合理和系统化。  

## 语法

核心语法如下：  

```js
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

| type     | commit 的类型                                            |
| -------- | -------------------------------------------------------- |
| feat     | 新功能、新特性                                           |
| fix      | 修改 bug                                                 |
| perf     | 更改代码，以提高性能                                     |
| refactor | 代码重构（重构，在不影响代码内部行为、功能下的代码修改） |
| docs     | 文档修改                                                 |
| style    | 代码格式修改, 注意不是 css 修改（例如分号修改）          |
| test     | 测试用例新增、修改                                       |
| build    | 影响项目构建或依赖项修改                                 |
| revert   | 恢复上一次提交                                           |
| ci       | 持续集成相关文件修改                                     |
| chore    | 其他修改（不在上述类型中的修改）                         |
| release  | 发布新版本                                               |
| workflow | 工作流相关文件修改                                       |

## 示例

| commit message                     | 描述                      |
| ---------------------------------- | ------------------------- |
| chore: init                        | 初始化项目                |
| chore: update deps                 | 更新依赖                  |
| chore: wording                     | 调整文字（措词）          |
| chore: fix typos                   | 修复拼写错误              |
| chore: release v1.0.0              | 发布 1.0.0 版本           |
| fix: icon size                     | 修复图标大小              |
| fix: value.length -> values.length | value 变量调整为 values   |
| feat(blog): add comment section    | blog 新增评论部分         |
| feat: support typescript           | 新增 typescript 支持      |
| feat: improve xxx types            | 改善 xxx 类型             |
| style(component): code             | 调整 component 代码样式   |
| refactor: xxx                      | 重构 xxx                  |
| perf(utils): random function       | 优化 utils 的 random 函数 |
| docs: xxx.md                       | 添加 xxx.md 文章          |
