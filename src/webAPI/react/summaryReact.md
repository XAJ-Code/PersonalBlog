# React 完整知识点总结

## 目录
- [React 简介](#react-简介)
- [环境搭建](#环境搭建)
- [JSX 语法](#jsx-语法)
- [组件基础](#组件基础)
- [Props 和 State](#props-和-state)
- [事件处理](#事件处理)
- [条件渲染](#条件渲染)
- [列表和 Keys](#列表和-keys)
- [表单处理](#表单处理)
- [组件生命周期](#组件生命周期)
- [Hooks](#hooks)
- [Context API](#context-api)
- [性能优化](#性能优化)
- [路由](#路由)
- [状态管理](#状态管理)
- [测试](#测试)
- [部署](#部署)

---

## React 简介

React 是由 Facebook 开发的用于构建用户界面的 JavaScript 库。它采用组件化的开发模式，让开发者可以创建可复用的UI组件。

### 核心特性
- **声明式编程**：描述UI应该是什么样子，而不是如何实现
- **组件化**：将UI拆分成独立、可复用的组件
- **虚拟DOM**：提高渲染性能
- **单向数据流**：数据从父组件流向子组件

### React 的优势
- 学习曲线相对平缓
- 强大的生态系统
- 活跃的社区支持
- 高性能的虚拟DOM
- 组件可复用性强

---

## 环境搭建

### 1. 使用 Create React App
```bash
npx create-react-app my-app
cd my-app
npm start
```

### 2. 手动配置
需要安装以下依赖：
```bash
npm install react react-dom
npm install --save-dev @babel/core @babel/preset-react webpack webpack-cli
```

### 3. 开发工具推荐
- **React Developer Tools**：浏览器扩展，用于调试React应用
- **VS Code扩展**：ES7+ React/Redux/React-Native snippets

---

## JSX 语法

JSX（JavaScript XML）是React的语法扩展，让你可以在JavaScript中写HTML-like的语法。

### 基础语法
```jsx
// 基本元素
const element = <h1>Hello, World!</h1>;

// 嵌入表达式
const name = 'React';
const element = <h1>Hello, {name}!</h1>;

// 属性
const element = <img src={user.avatarUrl} alt="Avatar" />;

// 子元素
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX 规则
- 必须有一个根元素（或使用Fragment）
- 标签必须闭合
- 使用 camelCase 命名属性
- `className` 代替 `class`
- `htmlFor` 代替 `for`

### Fragment 的使用
```jsx
// 使用 React.Fragment
return (
  <React.Fragment>
    <h1>Title</h1>
    <p>Description</p>
  </React.Fragment>
);

// 简写语法
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);
```

---

## 组件基础

React 组件有两种定义方式：函数组件和类组件。

### 函数组件
```jsx
// 简单函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 箭头函数组件
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// 使用组件
function App() {
  return <Welcome name="React" />;
}
```

### 类组件
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 组件命名规则
- 组件名必须以大写字母开头
- 文件名通常与组件名相同
- 一个文件通常只定义一个组件

---

## Props 和 State

### Props（属性）
Props 是组件的输入，用于从父组件向子组件传递数据。

```jsx
// 父组件传递props
function App() {
  return <UserCard name="张三" age={25} />;
}

// 子组件接收props
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>年龄：{props.age}</p>
    </div>
  );
}

// 解构props
function UserCard({name, age}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>年龄：{age}</p>
    </div>
  );
}
```

### Props 验证
```jsx
import PropTypes from 'prop-types';

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};

UserCard.defaultProps = {
  age: 18
};
```

### State（状态）
State 是组件的内部状态，可以改变。

```jsx
// 类组件中的state
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div>
        <p>计数：{this.state.count}</p>
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}
```

---

## 事件处理

### 合成事件
React 使用合成事件（SyntheticEvent）来处理事件，提供了跨浏览器的兼容性。

```jsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('按钮被点击了');
  };

  return (
    <button onClick={handleClick}>
      点击我
    </button>
  );
}
```

### 事件传参
```jsx
function TodoList() {
  const handleDelete = (id) => {
    console.log('删除项目：', id);
  };

  return (
    <div>
      {/* 方法1：使用箭头函数 */}
      <button onClick={() => handleDelete(1)}>删除</button>
      
      {/* 方法2：使用bind */}
      <button onClick={handleDelete.bind(this, 1)}>删除</button>
    </div>
  );
}
```

### 常用事件
- `onClick`：点击事件
- `onChange`：表单元素值改变
- `onSubmit`：表单提交
- `onFocus/onBlur`：焦点事件
- `onMouseOver/onMouseOut`：鼠标悬停事件

---

## 条件渲染

### 使用 if 语句
```jsx
function Greeting({isLoggedIn}) {
  if (isLoggedIn) {
    return <h1>欢迎回来！</h1>;
  }
  return <h1>请先登录</h1>;
}
```

### 使用三元运算符
```jsx
function LoginButton({isLoggedIn}) {
  return (
    <button>
      {isLoggedIn ? '退出' : '登录'}
    </button>
  );
}
```

### 使用逻辑 && 运算符
```jsx
function Notification({hasMessages, messageCount}) {
  return (
    <div>
      <h1>邮箱</h1>
      {hasMessages && 
        <h2>您有 {messageCount} 条未读消息</h2>
      }
    </div>
  );
}
```

### 阻止渲染
```jsx
function Warning({show}) {
  if (!show) {
    return null;
  }
  
  return (
    <div className="warning">
      警告信息
    </div>
  );
}
```

---

## 列表和 Keys

### 渲染列表
```jsx
function TodoList({todos}) {
  const todoItems = todos.map((todo) => 
    <li key={todo.id}>
      {todo.text}
    </li>
  );

  return (
    <ul>
      {todoItems}
    </ul>
  );
}

// 或者内联写法
function TodoList({todos}) {
  return (
    <ul>
      {todos.map(todo => 
        <li key={todo.id}>{todo.text}</li>
      )}
    </ul>
  );
}
```

### Keys 的重要性
Keys 帮助 React 识别哪些元素改变了，应该：
- 在兄弟节点之间是唯一的
- 保持稳定，不应该随时间改变
- 避免使用数组索引作为key（如果列表会重新排序）

```jsx
// ❌ 不好的做法
{todos.map((todo, index) => 
  <li key={index}>{todo.text}</li>
)}

// ✅ 好的做法
{todos.map(todo => 
  <li key={todo.id}>{todo.text}</li>
)}
```

---

## 表单处理

### 受控组件
表单元素的值由React组件的state控制。

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交数据：', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="姓名"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="邮箱"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="留言"
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 非受控组件
使用 ref 来获取表单值。

```jsx
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('姓名：', nameRef.current.value);
    console.log('邮箱：', emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} placeholder="姓名" />
      <input type="email" ref={emailRef} placeholder="邮箱" />
      <button type="submit">提交</button>
    </form>
  );
}
```

---

## 组件生命周期

生命周期方法只在类组件中可用，函数组件使用Hooks来实现类似功能。

### 挂载阶段
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log('1. constructor');
    this.state = { data: null };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('4. componentDidMount');
    // 适合进行API调用、设置订阅等
    this.fetchData();
  }

  render() {
    console.log('3. render');
    return <div>{this.state.data}</div>;
  }
}
```

### 更新阶段
```jsx
class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // 每次更新都会调用
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 返回false可以阻止更新
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 在DOM更新前调用
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // DOM更新后调用
    if (prevProps.userId !== this.props.userId) {
      this.fetchData();
    }
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}
```

### 卸载阶段
```jsx
class MyComponent extends React.Component {
  componentWillUnmount() {
    // 清理工作：取消网络请求、移除事件监听器等
    clearInterval(this.timer);
  }

  render() {
    return <div>Component</div>;
  }
}
```

---

## Hooks

Hooks 让你在函数组件中使用state和其他React特性。

### useState
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}

// 函数式更新
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

### useEffect
```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('获取用户数据失败：', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // 依赖数组

  // 清理副作用（相当于componentWillUnmount）
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器运行中...');
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (loading) return <div>加载中...</div>;
  if (!user) return <div>用户不存在</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### useContext
```jsx
import { createContext, useContext, useState } from 'react';

// 创建Context
const ThemeContext = createContext();

// Provider组件
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用Context
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      className={theme === 'light' ? 'btn-light' : 'btn-dark'}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      切换主题
    </button>
  );
}
```

### useReducer
```jsx
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      计数：{state.count}
      <button onClick={() => dispatch({type: 'increment'})}>
        +1
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>
        -1
      </button>
      <button onClick={() => dispatch({type: 'reset'})}>
        重置
      </button>
    </div>
  );
}
```

### 自定义Hook
```jsx
// 自定义Hook：使用本地存储
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// 使用自定义Hook
function Settings() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="输入姓名"
    />
  );
}
```

---

## Context API

Context 提供了一种在组件之间共享数据的方式，避免了通过多层组件传递props。

### 创建和使用Context
```jsx
import { createContext, useContext, useState } from 'react';

// 1. 创建Context
const UserContext = createContext();

// 2. 创建Provider组件
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. 创建自定义Hook
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// 4. 在组件中使用
function App() {
  return (
    <UserProvider>
      <Header />
      <MainContent />
    </UserProvider>
  );
}

function Header() {
  const { user, logout } = useUser();

  return (
    <header>
      {user ? (
        <div>
          欢迎，{user.name}
          <button onClick={logout}>退出</button>
        </div>
      ) : (
        <div>请登录</div>
      )}
    </header>
  );
}
```

---

## 性能优化

### React.memo
防止不必要的重新渲染。

```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ name, age }) {
  console.log('ExpensiveComponent 渲染');
  return (
    <div>
      <h2>{name}</h2>
      <p>年龄：{age}</p>
    </div>
  );
});

// 自定义比较函数
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
}, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
});
```

### useMemo
缓存计算结果。

```jsx
function ExpensiveCalculation({ numbers }) {
  const sum = useMemo(() => {
    console.log('计算总和...');
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return <div>总和：{sum}</div>;
}
```

### useCallback
缓存函数引用。

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // 缓存函数，避免子组件不必要的重新渲染
  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList 
        todos={todos} 
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

### 代码分割
```jsx
import { lazy, Suspense } from 'react';

// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>加载中...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

---

## 路由

React Router 是React的官方路由库。

### 安装和基本使用
```bash
npm install react-router-dom
```

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/users">用户</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
```

### 嵌套路由
```jsx
function Users() {
  return (
    <div>
      <h2>用户列表</h2>
      <nav>
        <Link to="/users/1">用户1</Link>
        <Link to="/users/2">用户2</Link>
      </nav>
      
      <Routes>
        <Route path=":id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}
```

### 程序式导航
```jsx
import { useNavigate, useParams } from 'react-router-dom';

function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1); // 返回上一页
  };

  const handleGoHome = () => {
    navigate('/'); // 导航到首页
  };

  return (
    <div>
      <h2>用户详情 - {id}</h2>
      <button onClick={handleGoBack}>返回</button>
      <button onClick={handleGoHome}>回到首页</button>
    </div>
  );
}
```

---

## 状态管理

### Context + useReducer
```jsx
// 状态管理
const AppContext = createContext();

const initialState = {
  user: null,
  todos: [],
  loading: false
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TODO':
      return { 
        ...state, 
        todos: [...state.todos, action.payload] 
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    addTodo: (todo) => dispatch({ type: 'ADD_TODO', payload: todo }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}
```

### 使用第三方状态管理
```jsx
// Redux Toolkit 示例
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>
        +1
      </button>
      <span>{count}</span>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>
        -1
      </button>
    </div>
  );
}
```

---

## 测试

### 使用 Testing Library
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('计数器初始值为0', () => {
  render(<Counter />);
  const countElement = screen.getByText(/计数：0/);
  expect(countElement).toBeInTheDocument();
});

test('点击按钮增加计数', () => {
  render(<Counter />);
  const button = screen.getByText('+1');
  
  fireEvent.click(button);
  
  const countElement = screen.getByText(/计数：1/);
  expect(countElement).toBeInTheDocument();
});

// 异步测试
test('加载用户数据', async () => {
  render(<UserProfile userId="1" />);
  
  const loadingElement = screen.getByText('加载中...');
  expect(loadingElement).toBeInTheDocument();
  
  const userNameElement = await screen.findByText('张三');
  expect(userNameElement).toBeInTheDocument();
});
```

### 自定义Hook测试
```jsx
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

test('useCounter 初始值', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
});

test('useCounter 增加', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

---

## 部署

### 构建生产版本
```bash
npm run build
```

### 部署到不同平台

#### Netlify
```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod --dir=build
```

#### Vercel
```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

#### GitHub Pages
```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 在 package.json 中添加
"homepage": "https://yourusername.github.io/yourrepo",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# 部署
npm run deploy
```

### 环境变量
```bash
# .env 文件
REACT_APP_API_URL=https://api.example.com
REACT_APP_VERSION=1.0.0
```

```jsx
// 在组件中使用
const apiUrl = process.env.REACT_APP_API_URL;
```

---

## 最佳实践

### 1. 项目结构
```
src/
  components/
    common/
    ui/
  hooks/
  contexts/
  utils/
  services/
  pages/
  styles/
```

### 2. 组件设计原则
- 保持组件小而专注
- 使用组合而不是继承
- 优先使用函数组件和Hooks
- 合理使用Props类型检查

### 3. 性能优化
- 使用React.memo避免不必要的重渲染
- 合理使用useMemo和useCallback
- 实现代码分割和懒加载
- 优化bundle大小

### 4. 代码规范
- 使用ESLint和Prettier保持代码一致性
- 遵循组件命名约定
- 编写有意义的注释
- 保持函数和组件简洁

### 5. 状态管理策略
- 本地状态优先使用useState
- 复杂状态逻辑使用useReducer
- 跨组件共享状态使用Context
- 大型应用考虑Redux或Zustand

---

## 常用开发工具和库

### 开发工具
- **Create React App**：快速启动React项目
- **Vite**：更快的构建工具
- **React Developer Tools**：浏览器调试扩展
- **Storybook**：组件开发和文档工具

### UI库
- **Ant Design**：企业级UI库
- **Material-UI**：Google Material Design风格
- **Chakra UI**：现代化组件库
- **React Bootstrap**：Bootstrap的React版本

### 状态管理
- **Redux Toolkit**：官方推荐的Redux工具
- **Zustand**：轻量级状态管理
- **Recoil**：Facebook实验性状态管理
- **Jotai**：原子化状态管理

### 表单处理
- **React Hook Form**：高性能表单库
- **Formik**：构建表单的React库
- **React Final Form**：高性能订阅式表单状态管理

### HTTP请求
- **Axios**：基于Promise的HTTP客户端
- **React Query**：服务器状态管理
- **SWR**：数据获取库
- **Apollo Client**：GraphQL客户端

### 样式方案
- **Styled Components**：CSS-in-JS库
- **Emotion**：高性能CSS-in-JS库
- **Tailwind CSS**：实用工具优先的CSS框架
- **CSS Modules**：局部作用域CSS

---

## React 18 新特性

### 并发特性
```jsx
import { startTransition, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  // 延迟值，降低优先级
  const deferredQuery = useDeferredValue(query);
  
  const handleSearch = (value) => {
    setQuery(value);
    
    // 将状态更新标记为过渡更新
    startTransition(() => {
      setResults(searchResults(value));
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="搜索..."
      />
      <SearchResults query={deferredQuery} results={results} />
    </div>
  );
}
```

### Suspense 改进
```jsx
import { Suspense } from 'react';

function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <UserProfile />
        <Posts />
      </Suspense>
    </div>
  );
}

// 数据获取组件
function UserProfile() {
  const user = use(fetchUser()); // React 18+ 的数据获取
  return <div>{user.name}</div>;
}
```

### 自动批处理
```jsx
// React 18 会自动批处理这些更新
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 只会重新渲染一次，而不是两次
}

// 如果需要强制多次渲染，可以使用 flushSync
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);
  });
  // React 会在这里渲染一次
  
  flushSync(() => {
    setFlag(f => !f);
  });
  // React 会在这里再渲染一次
}
```

---

## 调试技巧

### React Developer Tools
- 组件树查看和编辑
- Props和State实时查看
- Profiler性能分析
- Hooks状态追踪

### 常用调试方法
```jsx
// 1. console.log调试
function MyComponent({ data }) {
  console.log('MyComponent渲染，data:', data);
  return <div>{data.name}</div>;
}

// 2. 使用debugger
function handleClick() {
  debugger; // 浏览器会在这里暂停
  setCount(count + 1);
}

// 3. 自定义Hook用于调试
function useWhyDidYouUpdate(name, props) {
  const previous = useRef();
  
  useEffect(() => {
    if (previous.current) {
      const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
        if (previous.current[k] !== v) {
          ps[k] = [previous.current[k], v];
        }
        return ps;
      }, {});
      
      if (Object.keys(changedProps).length > 0) {
        console.log('[why-did-you-update]', name, changedProps);
      }
    }
    previous.current = props;
  });
}

// 使用调试Hook
function MyComponent(props) {
  useWhyDidYouUpdate('MyComponent', props);
  return <div>{props.name}</div>;
}
```

### 错误边界
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('错误边界捕获到错误：', error, errorInfo);
    // 可以将错误报告给错误监控服务
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>出错了！</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// 使用错误边界
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

---

## 进阶主题

### 高阶组件 (HOC)
```jsx
// 高阶组件：添加loading状态
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    if (props.loading) {
      return <div>加载中...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// 使用HOC
const UserListWithLoading = withLoading(UserList);

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  return (
    <UserListWithLoading 
      loading={loading} 
      users={users} 
    />
  );
}
```

### Render Props模式
```jsx
// Render Props组件
function DataProvider({ children, url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return children({ data, loading });
}

// 使用Render Props
function App() {
  return (
    <DataProvider url="/api/users">
      {({ data, loading }) => (
        loading ? 
          <div>加载中...</div> : 
          <UserList users={data} />
      )}
    </DataProvider>
  );
}
```

### 复合组件模式
```jsx
// 复合组件：Tab组件
const TabsContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      className={`tab ${activeTab === index ? 'active' : ''}`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ children, index }) {
  const { activeTab } = useContext(TabsContext);
  
  return activeTab === index ? (
    <div className="tab-panel">{children}</div>
  ) : null;
}

// 使用复合组件
function App() {
  return (
    <Tabs defaultTab={0}>
      <TabList>
        <Tab index={0}>Tab 1</Tab>
        <Tab index={1}>Tab 2</Tab>
        <Tab index={2}>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel index={0}>内容 1</TabPanel>
        <TabPanel index={1}>内容 2</TabPanel>
        <TabPanel index={2}>内容 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

// 导出所有子组件
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;
```

---

## 总结

React 是一个强大而灵活的前端库，通过组件化的思想让我们能够构建复杂的用户界面。掌握以下核心概念对于React开发至关重要：

1. **基础概念**：JSX、组件、Props、State
2. **Hooks**：让函数组件拥有状态和生命周期能力
3. **状态管理**：从本地状态到全局状态管理
4. **性能优化**：memo、useMemo、useCallback等
5. **路由**：单页面应用的导航管理
6. **测试**：确保代码质量和稳定性

### 学习建议

1. **循序渐进**：从基础概念开始，逐步深入
2. **多做练习**：通过实际项目巩固理论知识
3. **关注社区**：跟上React的发展趋势
4. **阅读源码**：深入理解React的工作原理
5. **最佳实践**：学习和遵循社区最佳实践

React生态系统非常庞大，这份总结涵盖了核心概念和常用模式。在实际开发中，根据项目需求选择合适的工具和库，保持学习和实践，你将能够熟练掌握React开发。

---

## 参考资源

- [React官方文档](https://react.dev/)
- [React中文文档](https://zh-hans.react.dev/)
- [React Router文档](https://reactrouter.com/)
- [Redux Toolkit文档](https://redux-toolkit.js.org/)
- [Testing Library文档](https://testing-library.com/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)

**持续学习，享受React开发的乐趣！** 🚀