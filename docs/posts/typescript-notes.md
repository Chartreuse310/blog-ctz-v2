---
title: TypeScript 类型体操笔记
date: 2026-06-25
excerpt: 整理 TypeScript 高级类型的使用技巧，包括条件类型、映射类型和模板字面量类型的实战总结。
tags:
  - TypeScript
  - 前端
---

# TypeScript 类型体操笔记

<div class="post-info">
  <time>2026-06-25</time>
  <span class="post-tag">TypeScript</span>
  <span class="post-tag">前端</span>
</div>

## 条件类型

条件类型是类型系统中的三元表达式，可以根据类型条件分发不同的类型结果。

```ts
type IsString<T> = T extends string ? 'yes' : 'no'

type A = IsString<'hello'> // 'yes'
type B = IsString<42>      // 'no'
```

### 分布式条件类型

当 `T` 是联合类型时，条件类型会自动分发：

```ts
type ToArray<T> = T extends any ? T[] : never

type Result = ToArray<string | number>
// string[] | number[]
```

## 映射类型

映射类型可以基于已有类型创建新类型，常用于工具类型：

```ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

type Partial<T> = {
  [K in keyof T]?: T[K]
}
```

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型，可以在类型层面操作字符串：

```ts
type EventName = 'click' | 'focus' | 'blur'
type Handler = `on${Capitalize<EventName>}`
// 'onClick' | 'onFocus' | 'onBlur'
```

## 实战：深度 Readonly

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K]
}

interface Config {
  db: { host: string; port: number }
  name: string
}

type ReadonlyConfig = DeepReadonly<Config>
// 所有嵌套属性都变成 readonly
```

掌握这些模式，可以应对大多数类型编程场景。
