
# 📦 深入理解 npm 中的 `dependencies`、`devDependencies` 和 `peerDependencies`

在使用 npm（或 pnpm、yarn）管理前端或 Node.js 项目依赖时，我们经常会在 `package.json` 中看到三个重要的字段：

- `dependencies`
- `devDependencies`
- `peerDependencies`

它们看起来相似，但用途和意义却完全不同。理解它们的区别对于开发高质量的 npm 包或应用至关重要，尤其是在开发**库、插件、组件库**等需要被其他项目引用的场景下。

本文将通过通俗易懂的语言和实际例子，帮助你彻底掌握这三者的区别与正确用法。

---

## 🧩 一、先来认识三个字段

| 字段 | 作用 | 谁负责安装 | 是否会被打包进最终产物 |
|------|------|------------|------------------------|
| `dependencies` | 项目运行时依赖的外部包 | 当前包/项目自己安装 | ✅ 会打包进最终代码 |
| `devDependencies` | 开发阶段工具类依赖 | 当前包/项目自己安装 | ❌ 不会打包进最终代码 |
| `peerDependencies` | 宿主环境应该提供的依赖 | 使用你包的项目负责安装 | ❌ 不会打包进最终代码 |

---

## 🎯 二、它们各自的使用场景

### 1️⃣ `dependencies`：运行时必需的依赖

**用途**：你的库或应用在**运行时需要直接使用**的第三方包。

**谁来安装**：当前项目自己负责安装。

**是否打包**：会被打包进最终代码（比如前端项目的 `dist`，或 Node.js 的运行时环境）。

**典型例子**：

- `lodash`：你的库中直接使用了 `debounce` 或 `throttle` 方法。
- `axios`：你的库中发起 HTTP 请求。
- `moment` 或 `dayjs`：你的库中处理日期时间。

> ✅ 如果你的代码中直接 `import` 或 `require` 了这个包，那它就应该放在 `dependencies` 中。

---

### 2️⃣ `devDependencies`：开发阶段工具类依赖

**用途**：你的库或应用在**开发阶段需要用到的工具或构建类包**，比如 TypeScript 编译器、打包工具、测试框架等。

**谁来安装**：当前项目自己负责安装。

**是否打包**：不会被打包进最终代码，因为这些工具只在开发阶段使用。

**典型例子**：

- `typescript`：用于编写和编译 TypeScript 代码。
- `vite` / `webpack`：前端构建工具。
- `eslint` / `prettier`：代码风格检查和格式化工具。
- `vue-tsc`：Vue 的 TypeScript 类型检查工具。

> ✅ 如果这个包只是帮助你开发、构建、测试，但最终用户使用时不需要它，那就放在 `devDependencies` 中。

---

### 3️⃣ `peerDependencies`：宿主环境应该提供的依赖

**用途**：你的库**不自己安装某些依赖**，而是告诉使用者：“你得自己装这个包，我才能正常工作。”

**谁来安装**：使用你包的项目（宿主环境）负责安装。

**是否打包**：不会被打包进最终代码，因为你的库并不真正“包含”这个依赖。

**典型场景**：开发插件、组件库等需要“依附”在某个主框架（如 Vue、React）上的项目。

**典型例子**：

- `vue`：你的库是基于 Vue 开发的组件库，但你不希望自己再打包一份 Vue。
- `react`：你的 React 组件库依赖 React，但不希望自己安装 React。
- `element-plus`：你的 UI 组件库基于 Element Plus 开发，但不希望自己再装一份 Element Plus。

> ✅ 如果你的库是“插件类”或“扩展类”的，通常都会用到 `peerDependencies`。

---

## 🤔 三、什么时候该用 `peerDependencies`？什么时候该用 `dependencies`？

这是最容易混淆的地方，我们来对比几个常见场景。

### 场景 1：你的库是基于 Vue 开发的组件库

- **你是否在代码中直接使用了 Vue？**
  - 没有直接调用 Vue 的 API，只是遵循 Vue 的组件规范开发。
- **那 Vue 是运行时依赖吗？**
  - 不是，你的库本身不打包 Vue，而是依赖使用者提供的 Vue 环境。
- **应该放在哪里？**
  - ✅ `peerDependencies`

### 场景 2：你的库在代码中直接使用了 `lodash`

- **你是否在代码中直接写了 `import { debounce } from 'lodash'`？**
  - 是的，你的库运行时真正依赖 `lodash` 提供的功能。
- **那 `lodash` 是运行时依赖吗？**
  - 是的。
- **应该放在哪里？**
  - ✅ `dependencies`

### 场景 3：你的库使用了 `vite` 作为构建工具

- **你是否在代码中直接调用了 Vite 的 API？**
  - 没有，Vite 只是在开发阶段用来启动服务、打包的工具。
- **那 Vite 是运行时依赖吗？**
  - 不是。
- **应该放在哪里？**
  - ✅ `devDependencies`

---

## 🧠 四、举个完整的例子

假设你正在开发一个基于 Vue 3 + Element Plus 的 UI 组件库，名字叫 `@zwj/test-ui`，它的 `package.json` 可能长这样：

```json
{
  "name": "@zwj/test-ui",
  "version": "0.0.1",
  "type": "module",
  "main": "./ui/lib/index.js",
  "module": "./ui/es/index.js",
  "files": ["ui"],
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "@types/node": "^22.9.1",
    "@vitejs/plugin-vue": "^5.1.4",
    "sass": "^1.81.0",
    "typescript": "~5.6.2",
    "vite": "^5.4.10",
    "vite-plugin-vue-setup-extend": "^0.4.0",
    "vue-tsc": "^2.1.8"
  },
  "peerDependencies": {
    "vue": "^3.5.12",
    "element-plus": "^2.8.8"
  }
}
```

我们来逐个分析：

| 包名 | 放在哪里 | 原因 |
|------|----------|------|
| `lodash` | `dependencies` | 你的库在代码中直接使用了 `lodash` 提供的功能，属于运行时依赖。 |
| `vue` | `peerDependencies` | 你的库是基于 Vue 开发的组件库，但不希望自己再安装一份 Vue，而是期望使用者提供。 |
| `element-plus` | `peerDependencies` | 你的库是基于 Element Plus 开发的 UI 组件库，同样期望使用者提供。 |
| `vite`、`typescript`、`sass` 等 | `devDependencies` | 这些都是开发阶段使用的工具，最终用户不需要它们。 |

---

## ⚠️ 五、重要注意事项

1. **npm v7+ 会自动安装 `peerDependencies`**  
   从 npm v7 开始，npm 在安装一个包时会尝试自动安装它的 `peerDependencies`。这可能导致版本冲突，所以建议：

   - 明确指定版本范围（如 `^3.5.12`）；
   - 在文档中写明所需的依赖版本；
   - 可搭配 `"engines"` 字段和 `.npmrc` 中的 `engine-strict=true` 做更严格的版本控制（适合对版本要求严格的库）。

2. **不是所有依赖都应该设为 `peerDependencies`**  
   只有那些你的库“依赖宿主项目已经提供的环境”的包才需要放在 `peerDependencies` 中，比如 Vue、React 等框架。其他运行时真正用到的包（如 `lodash`）应该放在 `dependencies` 中。

3. **`devDependencies` 永远不会被打包进生产环境**  
   所以可以放心地把所有开发工具类包都放在这里，不会影响最终产物的体积。

---

## ✅ 六、总结一句话

| 场景 | 放在哪里 |
|------|----------|
| 你的库在代码中直接使用了某个包（如 `lodash`） | `dependencies` |
| 你的库是基于某个框架/库开发的插件（如 Vue、Element Plus） | `peerDependencies` |
| 你的库在开发阶段用到的工具类包（如 `vite`、`typescript`） | `devDependencies` |

正确区分它们，能让你的库更健壮、更易用，也能避免很多潜在的版本冲突和打包问题！ 🚀