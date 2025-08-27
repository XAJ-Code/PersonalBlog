# SQLite 完整指南：轻量级数据库的核心概念与 Node.js 实践

## 摘要

SQLite 是一款嵌入式关系型数据库引擎，以其零配置、无服务器、单文件存储的特性闻名。本文将深入探讨 SQLite 的核心概念、与 MySQL 的关键区别，并详细介绍如何在 Node.js 项目中高效使用 SQLite，包括内存数据库与文件数据库的实战应用。

---

## 1. 什么是 SQLite？

SQLite 是一个 C 语言库，实现了一个**轻量级、磁盘文件为基础的、无需独立服务器进程的 SQL 数据库引擎**。一个完整的数据库就存储在一个独立的跨平台文件中。

### 核心特征
- **无服务器 (Serverless)**：无需单独的服务器进程。
- **自包含**：整个数据库就是一个独立的 `.db` 文件。
- **零配置**：开箱即用，无需复杂的安装和管理。
- **事务性**：完全支持 ACID 事务。

---

## 2. SQLite vs MySQL: 核心区别对比

| 特性 | **SQLite** | **MySQL** |
| :--- | :--- | :--- |
| **架构** | 嵌入式库，文件型数据库 | 客户端-服务器模型 |
| **部署** | 零配置，直接使用文件 | 需要安装、配置和管理服务器进程 |
| **存储** | 单个 `.db` 文件 | 多个文件和数据表空间 |
| **访问** | 直接文件读写 | 通过网络协议 (TCP/IP) 访问 |
| **并发** | 单写多读，文件锁机制 | 高并发，支持多写 |
| **用户权限**| 依赖操作系统文件权限 | 内置复杂的用户和权限管理系统 |
| **适用场景** | 嵌入式设备、移动应用、桌面软件、小型网站、测试 | 高并发Web应用、大型企业系统、分布式环境 |

**简单总结**：SQLite 像一个包含所有数据的**集装箱**，简单便携；MySQL 像一个需要管理和维护的**大型仓库**，功能强大但复杂。

---

## 3. Node.js 中使用 SQLite

### 安装依赖

```bash
npm install sqlite3
```

### 基本使用流程

```javascript
const sqlite3 = require('sqlite3').verbose();

// 1. 连接数据库（文件或内存）
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the database.');
  }
});

// 2. 使用 serialize 确保操作顺序执行
db.serialize(() => {
  // 创建表
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER
  )`);

  // 插入数据（使用参数化查询防止SQL注入）
  const stmt = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
  stmt.run("Alice", 25);
  stmt.run("Bob", 30);
  stmt.finalize(); // 不要忘记释放预处理语句

  // 查询数据
  db.each("SELECT id, name, age FROM users", (err, row) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${row.id}: ${row.name} is ${row.age} years old`);
    }
  });
});

// 3. 关闭连接
db.close((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database connection closed.');
  }
});
```

### 关键 API 说明
- `db.run()`: 执行不返回数据的 SQL 语句（如 `CREATE`, `INSERT`, `UPDATE`, `DELETE`）。
- `db.get()`: 执行 SQL 并返回**第一行**结果。
- `db.all()`: 执行 SQL 并返回**所有**结果作为一个数组。
- `db.each()`: 执行 SQL，并为**每一行**结果调用一次回调函数。
- `db.prepare()`: 创建一个预处理语句，适用于需要多次插入/更新的场景，高效且安全。

---

## 4. `:memory:` 内存数据库 vs `./file.db` 文件数据库

这是 SQLite 中两种重要的数据库连接方式。

| 方面 | **`:memory:`** | **`./file.db`** |
| :--- | :--- | :--- |
| **存储位置** | 应用程序内存 (RAM) 中 | 磁盘上的物理文件 |
| **持久性** | **非持久化**。程序退出或连接关闭后，数据立即丢失。 | **持久化**。数据永久保存在磁盘文件中。 |
| **性能** | **极快**。因为所有操作都在内存中进行，无磁盘 I/O 开销。 | **较快**。受磁盘读写速度限制。 |
| **用途** | - 单元测试<br>- 临时数据处理或计算<br>- 作为缓存层 | - 生产环境数据存储<br>- 需要持久化的任何应用<br>- 桌面/移动应用数据存储 |
| **示例代码** | `new sqlite3.Database(':memory:')` | `new sqlite3.Database('./app.db')` |

**选择建议**：
- 做**测试**或需要**极致速度**的临时操作 → 使用 `:memory:`
- 开发**实际项目**，需要数据**永久保存** → 使用 `./file.db`

---

## 5. 重要知识点与常见问题

### 主键与自增
- `INTEGER PRIMARY KEY` 仅定义主键，**不会自动递增**。
- 必须使用 `INTEGER PRIMARY KEY AUTOINCREMENT` 才能实现自动递增功能。
- 插入数据时无需指定自增主键的值，SQLite 会自动处理。

### 获取最后插入的 ID
在 `db.run()` 的回调函数中，使用 `this.lastID` 获取最后插入的行的 ID。
```javascript
db.run("INSERT INTO users (name) VALUES (?)", ["Alice"], function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Inserted successfully with ID: ${this.lastID}`); // 正确
    // 注意：此处必须使用普通函数，箭头函数中的 `this` 指向不对！
  }
});
```

### 异步操作与执行顺序
SQLite 的 Node.js 驱动是异步的。使用 `db.serialize()` 可以确保其中的数据库操作按顺序执行，避免竞态条件。

### 查看 .db 文件内容
`.db` 是二进制文件，不能用文本编辑器查看。推荐以下方法：
1.  **使用 VS Code 扩展**：安装 **SQLite** 或 **Database Client** 等扩展，可以直接连接和浏览 `.db` 文件。
2.  **使用命令行工具**：下载 `sqlite3` 命令行程序，执行 `sqlite3 ./mydatabase.db` 进入交互界面，使用 `.tables` 查看表，`SELECT * FROM users;` 查询数据。
3.  **使用图形化工具**：如 DB Browser for SQLite (SQLiteStudio)，是免费的桌面软件，提供完整的 GUI 操作界面。

---

## 6. SQLite 与 MySQL 的架构差异对比
1. MySQL（多数据库架构）
MySQL 服务器实例
├── database1 (逻辑数据库)
│   ├── users 表
│   └── products 表
├── database2 (逻辑数据库)  
│   ├── orders 表
│   └── logs 表
└── database3 (逻辑数据库)
2. SQLite（单数据库架构）
应用
├── app.db (物理数据库文件)
│   ├── users 表
│   └── products 表
├── test.db (另一个物理数据库文件)
│   ├── orders 表  
│   └── logs 表
└── backup.db (又一个物理数据库文件)
## 总结

SQLite 是一个强大而简单的工具，完美契合了“简单即是美”的设计哲学。

- **它的优势**在于**极简的部署**、**出色的便携性**和**良好的性能**，非常适合嵌入式系统、中小型应用、原型开发和测试。
- **它的局限**在于**缺乏高并发写入能力**和**内置的用户权限管理系统**。
- 就是说一个sqlite就是一个database,也只能有一个database,但是可以有多个table,而mysql可以有多个database,每个database可以有多个table.
- sqlite的database是一个物理文件,而mysql的database是逻辑上的概念,不是文件.