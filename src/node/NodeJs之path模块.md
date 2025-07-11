# Node.js 路径：全面掌握 path 模块
<img 
  src="https://nodejs.org/static/images/logo.svg" 
  alt="Node.js Logo" 
  style="background-color: black;padding: 10px;"
/>

## 一、核心 API 解析
### 1. 路径基础方法
| API                | 作用                          | 示例（POSIX）               | 示例（Windows）           |
|--------------------|-----------------------------|---------------------------|-------------------------|
| `path.basename()`  | 获取路径最后部分（文件名）       | `/a/b.txt` → `b.txt`      | `C:\a\b.txt` → `b.txt`  |
| `path.dirname()`   | 获取目录路径                   | `/a/b/c.txt` → `/a/b`     | `C:\a\b.txt` → `C:\a`   |
| `path.extname()`   | 获取文件扩展名                 | `a.b.c.txt` → `.txt`      | `a.b.c.txt` → `.txt`    |

### 2. 路径解析与拼接
```javascript
// 解析路径序列（自动处理 ./ ../）
path.resolve('/foo', '/bar', 'baz') 
// POSIX: /bar/baz
// Windows: C:\bar\baz

// 安全拼接路径（自动处理分隔符）
path.join('src', 'app', '../config.json')
// 均返回: src/config.json
```

### 3. 路径格式转换
```javascript
// 标准化路径（处理冗余分隔符）
path.normalize('/foo//bar/../baz') 
// POSIX: /foo/baz
// Windows: \foo\baz

// 转换平台分隔符
path.win32.join('C:', 'foo', 'bar') // 强制Windows风格
path.posix.join('usr', 'local')     // 强制POSIX风格
```

## 二、ES Modules vs CommonJS 对比

### 1. `__dirname` 获取差异
| **模块系统**       | 获取方式                      | 注意事项                     |
|-------------------|-----------------------------|----------------------------|
| **CommonJS**       | 直接使用 `__dirname`          | 默认全局可用                 |
| **ES Modules**    | 需通过 `import.meta.url` 转换 | 需配合 `fileURLToPath` 使用  |

**ES Modules 实现方案**：
```javascript
import { dirname } from 'path'
import { fileURLToPath } from 'url'
// fileURLToPath--用于将文件协议的 URL（如 file://）转换为当前操作系统的文件系统路径
//dirname用于从完整文件路径中提取其所在的目录路径,
// 从完整文件路径中剥离文件名，返回父目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

path.dirname('/Users/project/src/index.js'); 
// 返回: '/Users/project/src'
```

### 2. 路径处理实战对比
**场景：读取同级配置文件**
```javascript
// CommonJS
const configPath = path.join(__dirname, 'config.json')

// ES Modules
const configPath = path.join(
  dirname(fileURLToPath(import.meta.url)), 
  'config.json'
)
```

## 三、关键 API 深度解析

### 1. `path.parse()` 路径解构
```javascript
path.parse('/home/user/file.txt')
/* 返回：
{
  root: '/',
  dir: '/home/user',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/
```

### 2. `path.relative()` 相对路径计算
```javascript
path.relative('/data/a', '/data/b/c.js') 
// 返回: '../b/c.js'
```

### 3. 平台特定方法
```javascript
// 检测路径是否为绝对路径
path.isAbsolute('/foo') // POSIX: true
path.isAbsolute('C:\\') // Windows: true

// 转换路径分隔符
path.sep // POSIX: '/'，Windows: '\'
```

## 四、最佳实践指南

### 1. 安全路径拼接原则
```javascript
// ❌ 危险做法（易受路径遍历攻击）
const unsafePath = `${__dirname}/../../${userInput}`

// ✅ 安全做法
const safePath = path.join(__dirname, '..', '..', userInput)
```

### 2. 跨平台开发技巧
```javascript
// 统一处理路径分隔符
function universalJoin(...args) {
  return path.join(...args).replace(/\\/g, '/')
}
```

### 3. 调试路径问题
```javascript
console.log({
  cwd: process.cwd(),
  __dirname,
  resolved: path.resolve('./src'),
  joined: path.join('..', 'config')
})
```

## 五、常见问题解决方案

### 1. 路径大小写问题（Windows）
```javascript
// 标准化路径比较
function isSamePath(a, b) {
  return path.resolve(a).toLowerCase() === path.resolve(b).toLowerCase()
}
```

### 2. ESM 中动态加载路径
```javascript
// 动态加载模块（基于当前文件路径）
const modulePath = path.join(dirname(fileURLToPath(import.meta.url)), 'lib.mjs')
const lib = await import(modulePath)
```

### 3. 处理特殊字符路径
```javascript
// 包含空格和中文的路径
const safePath = path.join('目录', '带 空格.txt')
fs.readFileSync(safePath) // 需确保文件系统编码支持
```

> **知识扩展**：Node.js 20+ 新增 `path.subpath()` 方法，可用于安全提取子路径，建议在需要路径隔离的场景使用。