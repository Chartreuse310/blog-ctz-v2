---
title: 从零搭建 Design System
date: 2026-06-10
excerpt: 记录从零搭建一套 Design System 的完整过程，包括 Token 设计、组件规范和文档体系的建立。
tags:
  - Design System
  - 组件库
  - CSS
---

# 从零搭建 Design System

<div class="post-info">
  <time>2026-06-10</time>
  <span class="post-tag">Design System</span>
  <span class="post-tag">组件库</span>
</div>

## 什么是 Design System

Design System 不仅是一套 UI 组件库，它是一套完整的设计语言，包含：

- **Design Token** — 颜色、间距、字体、圆角等基础变量
- **组件规范** — 按钮、输入框、卡片等组件的使用规则
- **设计原则** — 一致性、可访问性、可扩展性

## Token 体系设计

从最小粒度开始，逐层向上抽象：

```css
:root {
  /* Primitive tokens */
  --green-500: #40916c;

  /* Semantic tokens */
  --color-primary: var(--green-500);
  --color-success: var(--green-500);

  /* Component tokens */
  --button-bg: var(--color-primary);
  --button-radius: 8px;
}
```

三层 Token 体系的好处是：换肤只需修改 Primitive 层，组件行为只需修改 Component 层。

## 组件规范文档

每个组件需要定义以下内容：

1. **用途** — 什么时候用这个组件
2. **变体** — 有哪些状态和尺寸
3. **间距规则** — 内外边距的标准
4. **可访问性** — 键盘交互和 ARIA 属性

## 在实践中迭代

不要追求一步到位。先从最常用的组件开始（Button、Input、Card），在实际项目中验证，然后逐步扩展。Design System 的价值来自于使用，而不是完美。
