# Vue 3 中实现相同功能的多种写法：TSX、h 函数、模板语法对比

在 Vue 3 中，我们可以通过多种方式来构建用户界面组件。本文将以一个简单的“输入框 + 按钮”组件为例，展示如何在 Vue 3 中使用 **TSX**、**h 函数** 和 **模板语法（SFC）** 三种不同的方式实现相同的功能：输入框绑定数据，点击按钮打印输入的值。

## 🎯 功能需求
我们希望实现一个简单的组件，包含：

- 一个输入框 `<input>`，用户可以输入文字；
- 一个按钮 `<button>`，点击后控制台打印输入框中的值。

## ✅ 方法一：Vue 3 模板语法（单文件组件 SFC）

这是 Vue 最常见、最直观的写法，适合大多数场景，尤其是需要快速开发、强类型提示不那么重要的项目。

### 📄 `TestBtn.vue`

```vue
<template>
  <div>
    <el-button type="primary" @click="submit">测试按钮</el-button>
    <input type="text" v-model="test" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'TestBtn',
  setup() {
    const test = ref('')

    const submit = () => {
      console.log('submit', test.value)
    }

    return {
      test,
      submit
    }
  }
})
</script>
```

### 🧠 特点

- 使用 Vue 的模板语法 `<template>`，直观易读；
- 使用 `v-model` 实现双向绑定；
- 基于 Composition API 的 `setup()` 函数管理响应式状态；
- 适合大多数业务开发场景，尤其是需要快速迭代的项目。

---

## ✅ 方法二：Vue 3 + TSX 写法

TSX 是 JavaScript 的语法扩展，允许你在 Vue 中使用类似 React 的 JSX 语法来描述组件。适合喜欢用 JSX、或者需要更高灵活性的开发者。

### 📄 `TestBtn.tsx`

```tsx
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'TestBtn',
  setup() {
    const testaa = ref('')

    const submit = () => {
      console.log('submit', testaa.value)
    }
    //可以直接在setup()中直接返回jsx给组件渲染
    return () => (
      <>
        <ElButton type="primary" onClick={submit}>测试按钮</ElButton>
        {/* 手动实现 v-model 双向绑定 */}
        <input
          type="text"
          value={testaa.value}
          onChange={(e) => {
            testaa.value = e.target.value
          }}
        />
      </>
    )
  }
})
```
- 一下写法是错误的：
 - TSX 是纯 JavaScript/TypeScript 的语法扩展，它​​不会自动理解 Vue 的响应式系统
 - 在 TSX 中，你需要​​手动使用 Vue 的 ref 或 reactive 来创建响应式状态，并且将这些状态通过 setup() 或直接在函数组件中返回给渲染函数使用
  - [函数式组件](https://cn.vuejs.org/guide/extras/render-function.html#functional-components)
  - 函数式组件是一种定义自身没有任何状态的组件的方式,很像纯函数,签名与 setup() 钩子相同
```tsx
/**
 * 这是函数式组件，不能在函数内部使用refAPI来声明响应式变量
 * 因为这个组件其实就是render函数，在render函数能不能使用refAPI来声明响应式变量
 */
const testBtn = () => {
  //错误-❌
  const test = ref('')
  const submit = () => {
    console.log('submit', test.value);
  }
  return (
    <>
    <ElButton type='primary' onClick={submit}>测试按钮</ElButton>
    <input type="text" v-model={test.value} /> //错误-❌
    </>
  )
}
```

### 🧠 特点

- 使用 JSX 语法，类似 React 的写法；
- 需要手动实现 `v-model` 的双向绑定（拆解为 `value` + `onChange`）；
- 适合喜欢 JSX、需要更高灵活性、或与 React 生态有交集的项目；
- 在 Vue 3 中需要配合 `defineComponent` 和 `setup()` 使用，否则响应式系统无法正常工作。
- 不能直接使用 `<script setup>` 中的 `defineProps` 语法，因为 `defineProps` 是 Vue 的 SFC（单文件组件）编译器宏（compiler macro），它是由 Vue 的 SFC 构建工具（如 Vite + `vue-loader`）在编译阶段处理的
- TSX 是纯 JavaScript/TypeScript 代码，不经过 SFC 编译器处理；
- 所以 **`defineProps` 在 TSX 中是无效的**。

> ⚠️ 注意：在 TSX 中**不能直接在函数内部使用 `ref()` 声明响应式变量**，必须将 `ref` 声明提升到 `setup()` 函数中。

---

## ✅ 方法三：Vue 3 使用 h 函数（渲染函数）

`h` 函数（hyperscript）是 Vue 的底层 API，用于以编程方式创建虚拟 DOM 节点。适合需要高度动态渲染、或者构建底层库/组件库的场景。

### 📄 `TestBtnH.ts`

```ts
import { defineComponent, ref, h } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'TestBtnH',
  setup() {
    const testaa = ref('')

    const submit = () => {
      console.log('submit', testaa.value)
    }

    return () =>
      h('div', {}, [
        h(ElButton, { type: 'primary', onClick: submit }, '测试按钮'),
        h('input', {
          type: 'text',
          value: testaa.value,
          onInput: (e: Event) => {
            const target = e.target as HTMLInputElement
            testaa.value = target.value
          }
        })
      ])
  }
})
```
### 在SPA 中使用：
#### 📄 `TestBtnH.vue`
```vue
<template>
  <div>
    <testDiv></testDiv>
  </div>
</template>

<script lang="ts" setup>
const testDiv = ()=>{
  return h('div','我是通过h函数创建的')
}
</script>
```

### 🧠 特点

- 使用 Vue 的底层 `h()` 函数创建虚拟 DOM；
- 完全手动控制渲染逻辑，适合高度动态或复杂的渲染场景；
- 没有模板语法，代码可读性相对较低，但灵活性极高；
- 适合开发底层组件库、需要极致性能优化的场景。

> ⚠️ 注意：`h()` 函数中不能直接使用 `v-model`，也需要手动实现双向绑定（拆解为 `value` + `onInput`）。


## 🔍 三种写法对比

| 特性 / 写法       | 模板语法 (SFC)         | TSX                    | h 函数                  |
|------------------|------------------------|------------------------|-------------------------|
| 语法风格         | 声明式模板             | JSX（类似 React）      | 函数式编程（虚拟 DOM） |
| 可读性           | ⭐⭐⭐⭐⭐（高）          | ⭐⭐⭐⭐（中高）          | ⭐⭐（中）               |
| 灵活性           | 中等                   | 高                     | 极高                   |
| 学习成本         | 低（Vue 原生支持）     | 中（需熟悉 JSX）       | 高（需理解虚拟 DOM）   |
| 适用场景         | 大多数业务开发         | 喜欢 JSX / React 风格 | 底层组件 / 动态渲染    |
| 双向绑定支持     | 原生支持 `v-model`     | 需手动实现             | 需手动实现             |
| TypeScript 支持 | 良好                   | 优秀                   | 良好                   |

## 🧩 总结

在 Vue 3 中，我们可以通过多种方式实现相同的功能：

- **模板语法** 是最常见、最推荐的方式，适合大多数业务场景；
- **TSX** 提供了类似 React 的开发体验，适合喜欢 JSX 或需要与 React 生态协作的开发者；
- **h 函数** 是 Vue 的底层 API，适合需要高度动态渲染或开发底层组件库的场景。

选择哪种方式取决于你的项目需求、团队技术栈和个人偏好。如果你是 Vue 开发者，推荐优先掌握 **模板语法 + Composition API**；如果你喜欢 JSX 或来自 React 背景，可以尝试 **Vue + TSX**；如果你在开发组件库或需要极致性能优化，可以深入了解 **h 函数**。

## 📚 参考资料

- [Vue 3 官方文档 - 渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html)
- [Vite + Vue 3 + TSX 配置指南](https://github.com/vuejs/babel-plugin-jsx)
- [Element Plus - Vue 3 组件库](https://element-plus.org/)

## 注意：
 - 在vue中使用jsx语法需要安装`"@vitejs/plugin-vue-jsx": "^4.2.0",`这个插件，版本忽略,
 - 在tsconfig.json中需要配置`"jsx": "preserve",`、`"jsxImportSource": "vue",`、`"allowImportingTsExtensions": true,`这个选项,
 - 在vite.config.js中`import vueJsx from '@vitejs/plugin-vue-jsx';`plugins:[vueJsx()]就可以了