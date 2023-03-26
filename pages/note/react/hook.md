# Hook

## FuctionComponent

React FunctionComponent 是一个函数，它接受 props 作为参数，并返回一个 ReactElement。

```tsx
import React from 'react';

interface Props {
  name: string;
}

const FunctionComponent: React.FC<Props> = (props) => {
  return <div>{props.name}</div>;
};

export default FunctionComponent;
```

将这个函数声明为 React.FC，可以让 TypeScript 识别这个函数是一个 React FunctionComponent。同时它就具有了 React.FC 的类型，可以使用 React.FC 的属性和方法。

## Hook 简介

Hook 是 React 16.8 版本新增的特性，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。在以往的函数式组件中，我们无法使用 state，也无法使用生命周期函数，但是使用 Hook 之后，我们就可以在函数式组件中使用 state 以及其他的 React 特性。

> 没有破坏性改动，完全向后兼容

因此，不需要移除以往的类组件，也不需要重写已有的类组件，就可以使用 Hook。

## useState

useState 是一个 Hook，它可以让你在函数组件中添加 state 特性。

```tsx
import React, { useState } from 'react';

const FunctionComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default FunctionComponent;
```

他返回的是一个数组，第一个元素是 state，第二个元素是更新 state 的方法。

如果使用变量而不使用状态的话，在变量改变时，组件不会重新渲染，但是使用状态的话，组件会重新渲染。这是为了保证组件的状态与视图保持一致，同时提升性能。

## useEffect

useEffect 是一个 Hook，它可以让你在函数组件中执行副作用操作。

:::tip 啥是副作用操作
副作用操作是指在函数执行过程中，除了返回值以外，还会对外部产生影响的操作。比如修改全局变量、修改参数、发送网络请求、操作 DOM 等。
:::

### 无需清除的副作用

无需清除的副作用指的是每次渲染都可以执行的操作。如：修改页面的 title、发送网络请求等。

```tsx
import React, { useState, useEffect } from 'react';

const FunctionComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    // 这里修改了页面的 title，这就是一个副作用操作
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default FunctionComponent;
```

useEffect 在每次渲染后都会执行。

### 需要清除的副作用

需要清除的副作用指的是在组件渲染后执行一次后，就要清除的操作。如：订阅事件、设置定时器等。

```tsx
import React, { useState, useEffect } from 'react';

const MouseTracker: React.FC = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log('add effect', positions.x);
    const updateMouse = (e: MouseEvent) => {
      console.log('inner');
      setPositions({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('click', updateMouse);
  }, []);
  return (
    <p>
      X: {positions.x}, Y: {positions.y}
    </p>
  );
};
```

在上面的代码中，运行后我们会发现，调用的次数比我们预期的要多，创建出了很多的监听器，这是因为每次渲染都会创建一个新的监听器，而上一个监听器并没有被清除，所以会导致内存泄漏。可以使用下面的代码来解决这个问题。

```tsx
import React, { useState, useEffect } from 'react';

const MouseTracker: React.FC = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log('add effect', positions.x);
    const updateMouse = (e: MouseEvent) => {
      console.log('inner');
      setPositions({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('click', updateMouse);
    // highlight-start
    return () => {
      console.log('remove effect', positions.x);
      document.removeEventListener('click', updateMouse);
    };
    // highlight-end
  }, []);
  return (
    <p>
      X: {positions.x}, Y: {positions.y}
    </p>
  );
};
```

### 控制 useEffect 的执行

现在我们知道了 useEffect 的基本用法，但是它的执行时机是在每次渲染后都会执行，如果我们只想在某个状态改变时执行，该怎么办呢？

```tsx
import React, { useState, useEffect } from 'react';

const FunctionComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Mary');
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);
  return (
    <div>
      <p>
        You clicked {count} times, your name is {name}
      </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setName('Lucy')}>Change name</button>
    </div>
  );
};

export default FunctionComponent;
```

上面的代码表示只有在 count 改变时才会执行 useEffect，如果 name 改变了，useEffect 不会执行。这样就可以避免不必要的副作用操作。

当然，也可以同时监听多个状态，只要把它们放到数组中即可。

```tsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count, name]);
```

这个关系是 "或" 的关系，只要 count 或 name 改变了，useEffect 就会执行。

## 自定义 Hook

自定义 Hook 是一种复用状态逻辑的方式，它不是 React API 的一部分，但是它是一种约定，如果函数的名字以 use 开头，并且调用了其他的 Hook，那么就称为自定义 Hook。

```tsx
import React, { useState, useEffect } from 'react';

const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log('add effect', positions.x);
    const updateMouse = (e: MouseEvent) => {
      console.log('inner');
      setPositions({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('click', updateMouse);
    return () => {
      console.log('remove effect', positions.x);
      document.removeEventListener('click', updateMouse);
    };
  }, []);
    // highlight-start
  return positions; // 返回状态
    // highlight-end
};

const MouseTracker: React.FC = () => {
  const positions = useMousePosition();
  return (
    <p>
      X: {positions.x}, Y: {positions.y}
    </p>
  );
};
```

当然，最好的方式是将自定义 hook 放到单独的文件中，这样可以全局调用。

:::warning 必须使用 use 开头
自定义 Hook 必须以 use 开头，这样可以让 React 识别出这是一个自定义 Hook。
:::

在同一文件中，可以多次调用自定义 Hook。他们之间**并不会共享状态**。

## 公共逻辑抽离

在类组件中，我们可以使用高阶组件（HOC,Hight Order Component）来抽离公共逻辑。

例如，我们需要有一个异步请求，在请求完成前显示 loading，请求完成后显示数据。我们可以把这个逻辑抽离出来，然后在需要的地方使用。

```tsx
import React, { Component } from 'react';

const withLoader = (url: string) => (WrappedComponent: any) => {
  return class WithLoader extends Component {
    state = {
      data: null,
    };
    async componentDidMount() {
      const res = await fetch(url);
      const data = await res.json();
      this.setState({ data });
    }
    render() {
      const { data } = this.state;
      return data ? <WrappedComponent data={data} /> : <div>loading...</div>;
    }
  };
};
```

HOC 的弊端是，它会在组件树中增加一层，这样会导致组件树变得复杂，不利于维护。同时代码难以理解。

```tsx title="Hook 写法"
import React, { useState, useEffect } from 'react';

const useLoader = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setData(data);
            setLoading(false);
        });
    }, [url]);
    return [data, loading];
};

const Profile = () => {
  const [data, loading] = useLoader('https://api.github.com/users/inannan423');
  if (loading) return <div>loading...</div>;
  return <div>{data.name}</div>;
};
```

## useRef

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。我们可以使用 useRef 来使不同次数的渲染之间共享数据。

如果使用 useState，每次渲染都会生成一个新的 state，这样会导致组件重新渲染，而 useRef 不会。

```tsx
import React, { useState } from 'react';

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          setTimeout(() => {
            setLike(like + 1);
            alert(`点赞了${like + 1}次`);
          }, 3000);
        }}
      >
        点赞
      </button>
    </>
  );
};
```

在上面的代码中，在我们点击按钮后的 3s 内继续点击按钮，会发现 alert 弹出的数字是不对的。最新弹出的数字是上一次点击按钮后的数字，而不是当前点击按钮后的数字。

```tsx
import React, { useRef } from 'react';

const LikeButton: React.FC = () => {
  const likeRef = useRef(0);
  const like = () => {
    setTimeout(() => {
      likeRef.current++;
      alert(`点赞了${likeRef.current}次`);
    }, 3000);
  };
  return <button onClick={like}>点赞</button>;
};
```

使用 useRef 之后，我们就可以在不同次数的渲染之间共享数据了。

还可以使用 useRef 来获取 DOM 节点。一个新的例子：

```tsx
import React, { useRef } from 'react';

const LikeButton: React.FC = () => {
  const likeRef = useRef(0);
  const like = () => {
    setTimeout(() => {
      likeRef.current++;
      alert(`点赞了${likeRef.current}次`);
    }, 3000);
  };
  const domRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    if (domRef && domRef.current) {
      domRef.current.focus();
    }
  };
  return (
    <>
      <input type="text" ref={domRef} />
      <button onClick={focusInput}>聚焦</button>
      <button onClick={like}>点赞</button>
    </>
  );
};
```

## useContext

useContext 的作用是让我们可以在函数组件中使用 context。它接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 value prop 决定。

比如，我们的全局有一个深浅色模式，有一个 `button` 组件，我们想要在 `button` 组件中使用这个全局的深浅色模式，我们可以使用 useContext 来实现。

```tsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

const Button: React.FC = () => {
  const theme = useContext(ThemeContext);
  return <button>{theme}</button>;
};

const App: React.FC = () => {
  return (
    // highlight-start
    <ThemeContext.Provider value="dark">
      <Button />
    </ThemeContext.Provider>
    // highlight-end
  );
};
```

如果想在别的文件中使用这个 context，可以这样导出：

```tsx
import React, { createContext } from 'react';

const ThemeContext = createContext('light');

export default ThemeContext;
```

这样导入：

``` tsx
import ThemeContext from './ThemeContext';
```

## Hook 规则

- 只能在函数最顶层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用（比如普通的函数或者类中）。

## 其他 Hook

除了上面介绍的这些 Hook，React 还提供了一些其他的 Hook，比如：

- useReducer：用于状态管理
- useMemo：用于性能优化
- useCallback：用于性能优化
- useImperativeHandle：用于暴露子组件的方法
- useLayoutEffect：用于在 DOM 更新之后同步调用
- useDebugValue：用于在 React DevTools 中显示自定义 hook 的标签
