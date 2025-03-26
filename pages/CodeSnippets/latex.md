# LateX 公式语法速查

LateX 是一种排版系统，用于生成数学公式。它是一种非常强大的工具，可以用来生成复杂的数学公式。在这里，我们将介绍一些常用的 LateX 公式语法。

## 基本语法

### 上标和下标

使用 `^` 和 `_` 符号来添加上标和下标。

```latex
x^{2} + y_{1}
```

输出结果为：$x^{2} + y_{1}$

### 分数

使用 `\frac` 命令来生成分数。frac 是 fraction 的缩写。表示分数。

```latex
\frac{a}{b}
```

输出结果为：$\frac{a}{b}$

### 根号

使用 `\sqrt` 命令来生成根号。

```latex
\sqrt{a}
```

输出结果为：$\sqrt{a}$

### 求和

使用 `\sum` 命令来生成求和符号。

```latex
\sum_{i=1}^{n} i
```

输出结果为：$\sum_{i=1}^{n} i$

### 积分

使用 `\int` 命令来生成积分符号。

```latex
\int_{a}^{b} f(x) dx
```

输出结果为：$\int_{a}^{b} f(x) dx$

### 矩阵

使用 `\begin{matrix} \end{matrix}` 环境来生成矩阵。

```latex
\begin{matrix}
1 & 2 \\
3 & 4
\end{matrix}
```

输出结果为：

$$
\begin{matrix}
1 & 2 \\
3 & 4
\end{matrix}
$$

这是不带括号的矩阵。如果需要带括号的矩阵，可以使用 `pmatrix` 环境。pmatrix 的 p 是括号（parenthesis）的缩写。

```latex
\begin{pmatrix}
1 & 2 \\
3 & 4
\end{pmatrix}
```

输出结果为：

$$
\begin{pmatrix}
1 & 2 \\
3 & 4
\end{pmatrix}
$$

正常的矩阵是带方括号，可以使用 `bmatrix` 环境来生成。bmatrix 的 b 是 bracket （方括号）的缩写。

```latex
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
```

输出结果为：

$$
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
$$

### 省略号

使用 `\ldots` 命令来生成省略号。

```latex
1, 2, \ldots, n
```

输出结果为：$1, 2, \ldots, n$

竖向的省略号可以使用 `\vdots` 命令来生成。

```latex
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
\vdots & \vdots & \vdots \\
7 & 8 & 9
\end{bmatrix}
```

输出结果为：

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
\vdots & \vdots & \vdots \\
7 & 8 & 9
\end{bmatrix}
$$

斜向的省略号可以使用 `\ddots` 命令来生成。例如生成一个 n*n 的单位矩阵：

```latex
\begin{bmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 1
\end{bmatrix}
```

输出结果为：

$$
\begin{bmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 1
\end{bmatrix}
$$

### 空格

在 LateX 中，空格是被忽略的。如果需要添加空格，可以使用 `\quad`、`\qquad`、`\,`、`\:`、`\;` 等命令。quad 和 qquad 是空格的长度，分别是 1em 和 2em。quad 是 quarter 的缩写，qquad 是 double quarter 的缩写。

```latex
a \quad b \qquad c \, d \: e \; f
```

输出结果为：$a \quad b \qquad c \, d \: e \; f$

### 括号

使用 `\left` 和 `\right` 命令来生成括号。

```latex
\left( a + b \right)
```

输出结果为：$\left( a + b \right)$

$(a + b)$ 和 $\left( a + b \right)$ 的区别是，前者的括号是固定大小的，后者的括号是根据括号内的内容自动调整大小的。例如：

```latex
\left( \frac{a}{b} \right)
```

输出结果为：$\left( \frac{a}{\frac{b}{c}} \right)$，而不是 $( \frac{a}{\frac{b}{c}})$。

不同类型的括号可以使用不同的命令。例如，使用 `\{` 和 `\}` 命令来生成大括号。

```latex
\left\{ a + b \right\}
```

输出结果为：$\left\{ a + b \right\}$

方括号可以使用 `\left[ \right]` 命令来生成。

```latex
\left[ a + b \right]
```

输出结果为：$\left[ a + b \right]$

### 箭头

使用 `\rightarrow` 命令来生成箭头。

```latex
a \rightarrow b
```

输出结果为：$a \rightarrow b$

### 点

使用 `\cdot` 命令来生成点。

```latex
a \cdot b
```

输出结果为：$a \cdot b$

### 绝对值

使用 `\left|` 和 `\right|` 命令来生成绝对值。

```latex
\left| a \right|
```

输出结果为：$\left| a \right|$

### 三角函数

三角函数可以使用 `\sin`、`\cos`、`\tan`、`\cot`、`\sec`、`\csc` 等命令来生成。

```latex
\sin x, \cos x, \tan x, \cot x, \sec x, \csc x
```

输出结果为：$\sin x, \cos x, \tan x, \cot x, \sec x, \csc x$

### 对数

对数可以使用 `\log`、`\ln` 等命令来生成。

```latex
\log x, \ln x
```

输出结果为：$\log x, \ln x$

### 极限

极限可以使用 `\lim` 命令来生成。

```latex
\lim_{x \to \infty} f(x)
```

输出结果为：$\lim_{x \to \infty} f(x)$

### 矢量

矢量可以使用 `\vec` 命令来生成。

```latex
\vec{a}
```

输出结果为：$\vec{a}$

### 矢量的模

矢量的模可以使用 `\left\|` 和 `\right\|` 命令来生成。

```latex
\left\| \vec{a} \right\|
```

输出结果为：$\left\| \vec{a} \right\|$

### 矢量的分量

矢量的分量可以使用 `\hat` 命令来生成。

```latex
\hat{i}, \hat{j}, \hat{k}
```

输出结果为：$\hat{i}, \hat{j}, \hat{k}$

### 向量表示

向量表示可以使用 `\overrightarrow` 命令来生成。

```latex
\overrightarrow{AB}
```

输出结果为：$\overrightarrow{AB}$

### 概率

概率可以使用 `\Pr` 命令来生成。

```latex
\Pr(A)
```

输出结果为：$\Pr(A)$

### 排列组合

排列可以使用 `\mathrm{P}` 命令来生成。

```latex
\mathrm{P}(n, k)
```

输出结果为：$\mathrm{P}(n, k)$

组合可以使用 `\mathrm{C}` 命令来生成。例如 5 个球中取 3 个的组合数：

```latex
\mathrm{C}(5, 3)
```

输出结果为：$\mathrm{C}(5, 3)$

### 逻辑运算

逻辑运算可以使用 `\land`、`\lor`、`\lnot`、`\implies`、`\iff` 等命令来生成。

```latex
p \land q, p \lor q, \lnot p, p \implies q, p \iff q
```

输出结果为：$p \land q, p \lor q, \lnot p, p \implies q, p \iff q$

### 集合运算

集合运算可以使用 `\cup`、`\cap`、`\setminus`、`\in`、`\notin` 等命令来生成。

```latex
A \cup B, A \cap B, A \setminus B, a \in A, a \notin A
```

输出结果为：$A \cup B, A \cap B, A \setminus B, a \in A, a \notin A$

### 逻辑量词

逻辑量词可以使用 `\forall`、`\exists` 等命令来生成。表示全称量词和存在量词。

```latex
\forall x \in A, \exists y \in B
```

输出结果为：$\forall x \in A, \exists y \in B$

### 三角形

三角形可以使用 `\triangle` 命令来生成。

```latex
\triangle ABC
```

输出结果为：$\triangle ABC$

还可以用 `\angle` 命令来生成角度。

```latex
\angle ABC
```

输出结果为：$\angle ABC$

### 平行和垂直

平行可以使用 `\parallel` 命令来生成。

```latex
AB \parallel CD
```

输出结果为：$AB \parallel CD$

垂直可以使用 `\perp` 命令来生成。

```latex
AB \perp CD
```

输出结果为：$AB \perp CD$

### 粗体

使用 `\mathbf` 命令来生成粗体。

```latex
\mathbf{a}
```

输出结果为：$\mathbf{a}$

### 斜体

使用 `\mathit` 命令来生成斜体。

```latex
\mathit{a}
```

输出结果为：$\mathit{a}$

### 黑体

使用 `\mathbb` 命令来生成黑体。

```latex
\mathbb{R}
```

输出结果为：$\mathbb{R}$

### 空集

使用 `\emptyset` 命令来生成空集。

```latex
\emptyset
```

输出结果为：$\emptyset$

### 无穷大

使用 `\infty` 命令来生成无穷大。

```latex
\infty
```

输出结果为：$\infty$

## 希腊字母

LateX 支持希腊字母。例如，输入 `\alpha` 可以生成 $\alpha$。

| 希腊字母 | 大写字母 | 希腊字母 | 大写字母 |
| --- | --- | --- | --- |
| $\alpha$ | A | $\Alpha$ | A |
| $\beta$ | B | $\Beta$ | B |
| $\gamma$ | $\Gamma$ | $\delta$ | $\Delta$ |
| $\epsilon$ | E | $\varepsilon$ | E |
| $\zeta$ | Z | $\eta$ | H |
| $\theta$ | $\Theta$ | $\vartheta$ | $\Theta$ |
| $\iota$ | I | $\kappa$ | K |
| $\lambda$ | $\Lambda$ | $\mu$ | M |
| $\nu$ | N | $\xi$ | $\Xi$ |
| $\pi$ | $\Pi$ | $\varpi$ | $\Pi$ |
| $\rho$ | P | $\varrho$ | P |
| $\sigma$ | $\Sigma$ | $\varsigma$ | $\Sigma$ |
| $\tau$ | T | $\upsilon$ | $\Upsilon$ |
| $\phi$ | $\Phi$ | $\varphi$ | $\Phi$ |
| $\chi$ | X | $\psi$ | $\Psi$ |
| $\omega$ | $\Omega$ | | |

## 数学运算

LateX 支持各种数学运算符号。

### 加法

```latex
a + b
```

输出结果为：$a + b$

### 减法

```latex
a - b
```

输出结果为：$a - b$

### 乘法

```latex
a \times b
```

输出结果为：$a \times b$

### 除法

div 是 divide 的缩写。

```latex
a \div b
```

输出结果为：$a \div b$

### 等于

```latex
a = b
```

输出结果为：$a = b$

### 不等于

neq 是 not equal 的缩写。

```latex
a \neq b
```

输出结果为：$a \neq b$

### 大于

```latex
a > b
```

输出结果为：$a > b$

### 小于

```latex
a < b
```

输出结果为：$a < b$

### 大于等于

geq 是 greater than or equal 的缩写。

```latex
a \geq b
```

输出结果为：$a \geq b$

### 小于等于

leq 是 less than or equal 的缩写。

```latex
a \leq b
```

输出结果为：$a \leq b$

### 约等于

approx 是 approximately equal 的缩写。

```latex
a \approx b
```

输出结果为：$a \approx b$

### 等价

equiv 是 equivalent 的缩写。

```latex
a \equiv b
```

输出结果为：$a \equiv b$

### 导数

prime 是 prime derivative 的缩写。

```latex
f'(x)
```

输出结果为：$f'(x)$

### 偏导数

partial 是 partial derivative 的缩写。

```latex
\frac{\partial f}{\partial x}
```

输出结果为：$\frac{\partial f}{\partial x}$
