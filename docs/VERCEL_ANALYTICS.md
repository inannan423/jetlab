# Vercel Analytics 配置说明

本项目已集成 Vercel Analytics 和 Speed Insights，为您提供详细的网站分析和性能监控。

## 功能特性

### Vercel Analytics
- 📊 页面浏览量统计
- 👥 访客数据分析
- 🌍 地理位置分布
- 📱 设备和浏览器统计
- 🔗 引荐来源分析

### Vercel Speed Insights
- ⚡ 页面加载性能监控
- 📈 Core Web Vitals 指标
- 🔍 性能问题诊断
- 📊 实时性能数据

## 自动启用

当您的项目部署到 Vercel 时，Analytics 和 Speed Insights 会自动启用，无需任何额外配置。

## 查看分析数据

1. 登录您的 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 点击 "Analytics" 标签页查看详细数据
4. 点击 "Speed Insights" 标签页查看性能数据

## 本地开发

在本地开发环境中，Analytics 组件会被加载但不会发送数据到 Vercel。只有在生产环境中才会收集实际的分析数据。

## 组件结构

```
app/components/
├── analytics.tsx          # 主分析组件（包含所有分析工具）
└── vercel-analytics.tsx   # Vercel 专用分析组件
```

## 双重分析支持

项目同时支持 Vercel Analytics 和 Beam Analytics：

- **Vercel Analytics**: 自动启用，提供详细的用户行为分析
- **Beam Analytics**: 可选配置，通过 `NEXT_PUBLIC_BEAM_TOKEN` 环境变量启用

## 隐私说明

- Vercel Analytics 遵循 GDPR 和其他隐私法规
- 不使用 cookies，不跟踪个人信息
- 所有数据都是匿名化的

## 相关链接

- [Vercel Analytics 文档](https://vercel.com/docs/analytics)
- [Vercel Speed Insights 文档](https://vercel.com/docs/speed-insights)
- [Vercel Analytics React 包](https://www.npmjs.com/package/@vercel/analytics)
