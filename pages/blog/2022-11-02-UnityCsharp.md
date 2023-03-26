---
slug: UnityCsharp
title: Unity 中的脚本
authors: Chengzihan
tags: [Unity]
---
## 为什么要使用脚本

游戏对象的行为由附加的**组件**控制。虽然 Unity 的内置组件可能用途很广泛，但是您很快就会发现，必须超越组件可提供的功能来实现自己的游戏功能。Unity 允许使用**脚本**来自行创建组件。使用脚本可以触发游戏事件，随时修改组件属性，并以所需的任何方式响应用户的输入。  
Unity 本身支持 C# 编程语言。C#（发音为 C-sharp）是一种类似于 Java 或 C++ 的行业标准语言。  

## 创建脚本

在 Unity 的**项目视图**中，右键单击**Assets**文件夹，然后选择**Create**>**C# Script**。然后将脚本拖拽到模型上或者模型的检查器中，即可完成脚本的创建。这个脚本便绑定了这个模型。

## 脚本模板概览

使用 JetBrains Rider 或 Visual Studio Code 编辑器打开脚本。您将看到一个类似于下面的模板：

```cpp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// 类名和脚本名是一样的
public class Move : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
```

## 脚本的生命周期

`Awake`:只会被调用一次，在Start方法之前被调用。主要用于字段值的初始化工作，禁用脚本，创建游戏对象，或者 `Resources.Load(Prefab)` 对象。  

`Start`:只执行一次，在Awake方法执行结束后执行，但在 `Update` 方法执行前执行，主要用于程序 UI 的初始化操作，比如获取游戏对象或者组件。  

`FixedUpdate`:以固定频率调用的函数(默认0.02s)。  

`Update`：以非固定的频率调用的函数，该频率与设备的性能和程序自身有关(每帧)。  

`LateUpdate`：每当Update调用完之后立马调用。  

`OnDisable` ：游戏对象消失(销毁/隐藏)的那一刻调用。  

`OnDestroy` ：游戏对象销毁的那一刻调用。

:::tip Unity 输出
在 Unity 中我们使用 `debug.log()` 来输出信息，调试错误。
:::

下面是一个完整生命周期的例子：  

```cpp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// 类名和脚本名是一样的
public class Move : MonoBehaviour
{
    // 最先执行的 awake 函数
    private void Awake()
    {
        // 控制台输出
        Debug.Log("Awake");
    }

    private void OnEnable()
    {
        // 激活组件调用，可能调用多次
        Debug.Log("激活组件");
    }
    
    // 在第一次 onEnable 之后，只调用一次
    void Start()
    {
        Debug.Log("开始");
    }

    // 每一帧调用一次
    void Update()
    {
        // 每帧调用
    }
    
    // 在 Update 之后调用
    private void LateUpdate()
    {
        // 在刷新后调用
    }
    
    // 默认调用，与帧间隔无关
    private void FixedUpdate()
    {
        // 固定调用
    }
    
    // 对象消失时调用
    private void OnDisable()
    {
        // 消失时调用
    }
    
    // 销毁时调用
    private void OnDestroy()
    {
        // 销毁时才会调用
    }
}
```

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220914091724.png)

## 多个脚本运行顺序

当某个对象有多个脚本时，与检查器中的脚本顺序无关。但是我们可以利用脚本的生命周期来控制脚本的执行顺序。  

:::warning 注意
在脚本执行时，先把所有脚本的 Awake 函数执行完，再执行所有脚本的 Start 函数，然后执行所有脚本的 Update 函数，以此类推。  
:::

```cpp title="Move1.cs"
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class Move1 : MonoBehaviour
{
    // 最先执行的 awake 函数
    private void Awake()
    {
        // 控制台输出
        Debug.Log("这是要先执行的");
    }
    void Start()
    {
        Debug.Log("开始");
    }
}
```

```cpp title="Move2.cs"
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class Move2 : MonoBehaviour
{
    // 最先执行的 awake 函数
    private void Awake()
    {
        // 空
    }
    void Start()
    {
        Debug.Log("这是后执行的");
    }
}
```

当然，也可以在 Project 设置中直接修改脚本执行顺序。

## 常用脚本

### 响应键盘

```c#
// 键盘按下 W A S D 时，相机沿着对应的方向移动
if (Input.GetKey(KeyCode.W))
{
    character.transform.Translate(Vector3.forward * Time.deltaTime * 10);
}
if (Input.GetKey(KeyCode.A))
{
    character.transform.Translate(Vector3.left * Time.deltaTime * 10);
}
if (Input.GetKey(KeyCode.S))
{
    character.transform.Translate(Vector3.back * Time.deltaTime * 10);
}
if (Input.GetKey(KeyCode.D))
{
    character.transform.Translate(Vector3.right * Time.deltaTime * 10);
}
```
