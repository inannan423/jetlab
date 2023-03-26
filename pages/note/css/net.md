---
title: 图片网格遮罩
---
## 效果

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220719202317.png)  

## 实现

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>css网格遮罩</title>
</head>

<body>
    <div class="mask">
        <!-- 网格遮罩 -->
    </div>
    <div class="maxbox">
        <!-- 背景图片 -->
    </div>
</body>
<style>
    * {
        /* Reset */
        margin: 0;
        padding: 0;
    }

    .maxbox {
        width: 100%;
        height: 100%;
        /*background-image: url('https://s.nmxc.ltd/random-img/pc/s11.webp');*/
        /*上面的代码可以调用api随机图片*/
        background-image: url('https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220719201318.png');
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;
        /*置底*/
    }

    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(0deg,
                rgba(33, 234, 252, 0.632) 1%,
                rgba(0, 0, 0, 0.563) 5%),
            linear-gradient(rgba(33, 234, 252, 0.579) 1%, rgba(0, 0, 0, 0.563) 5%);
        /*
            调节深色色块颜色决定图片透明度，越白背景图越亮
            浅色色块是横线颜色
        */
        background-size: 10px 10px;
        z-index: -1;
        /*倒数第二层*/
    }
</style>

</html>
```
