# Web Components 核心技术详解

## 🌟 概述
Web Components 是一套**浏览器原生组件化**技术，包含以下三大核心标准：
1. **Custom Elements**（自定义元素）
2. **Shadow DOM**（影子DOM）
3. **HTML Templates**（HTML模板）

> 📌 优势：无需框架、真正隔离、跨框架复用

---

## 🔧 核心API

### 1. Custom Elements
```javascript
class MyComponent extends HTMLElement {
  constructor() {
    super();
    // 组件初始化
  }

  connectedCallback() {
    // 元素插入DOM时触发
  }

  disconnectedCallback() {
    // 元素从DOM移除时触发
  }
}

customElements.define('my-component', MyComponent);
```

**生命周期方法**：
- `connectedCallback` → 挂载时
- `disconnectedCallback` → 卸载时
- `attributeChangedCallback` → 属性变化时
- `adoptedCallback` → 被移动到新文档时

---

### 2. Shadow DOM
- DOM隔离​​：外部无法直接访问 shadow DOM 内的元素
- ​样式封装​​：shadow DOM 内的样式不会影响外部
- 组成（Composition）​​:通过slot实现内容分发

```javascript
const shadowRoot = this.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = `<style>:host { display: block; }</style>`;
```

**两种模式**：
| 模式 | 访问性 | 典型场景 |
|------|--------|----------|
| `open` | 可通过`element.shadowRoot`访问 | 需要外部交互的组件 |
| `closed` | 完全隔离，返回`null` | 高安全性需求组件 |

**关键特性**：
- **样式隔离**：内部样式不会影响外部
- **DOM封装**：外部无法直接操作内部DOM
- **::host伪类**：用于设置宿主元素样式

---

### 3. HTML Templates
```html
<template id="my-template">
  <style>/* 仅模板内有效 */</style>
  <div>内容骨架</div>
</template>

<script>
  const template = document.getElementById('my-template');
  shadowRoot.appendChild(template.content.cloneNode(true));
</script>
```

---

## 🛠️ 实战技巧

### 属性与Property同步
```javascript
static get observedAttributes() {
  return ['title']; // 监听属性变化
}

attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'title') {
    this._title = newValue; // 同步到property
  }
}

get title() { return this._title; }
set title(v) { 
  this._title = v;
  this.setAttribute('title', v); // property变化同步到attribute
}
```

### 插槽(Slot)内容分发
```html
<!-- 组件定义 -->
<div>
  <slot name="header"></slot>
  <slot></slot> <!-- 默认插槽 -->
</div>

<!-- 组件使用 -->
<my-component>
  <h1 slot="header">自定义标题</h1>
  <p>默认内容</p>
</my-component>
```

---

## 💡 最佳实践

1. **命名规范**：必须包含连字符（如`my-component`）
2. **渐进增强**：考虑JS禁用时的降级方案
3. **性能优化**：
   ```javascript
   // 使用requestAnimationFrame避免布局抖动
   connectedCallback() {
     requestAnimationFrame(() => {
       // 初始化操作
     });
   }
   ```
4. **样式方案**：
   - 使用`::part()`暴露可样式化部分
   - 通过CSS变量提供主题化支持

---

## ⚠️ 常见问题

### Q：Shadow DOM内的元素能被外部JS选中吗？
A：仅`open`模式下可通过`element.shadowRoot.querySelector()`访问

### Q：如何全局覆盖Shadow DOM样式？
A：通过`::part()`或CSS自定义变量：
```css
my-component::part(button) {
  color: red;
}
```

## 📚 学习资源
1. https://developer.mozilla.org/zh-CN/docs/Web/Web_Components
2. https://developers.google.com/web/fundamentals/web-components
3. https://github.com/webcomponents/awesome-webcomponents