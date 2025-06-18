## **1. tanstack/vue-query介绍**

`tanstack/vue-query`（原名 `vue-query`）是 **TanStack（原 React Query 团队）** 为 Vue.js 提供的 **数据请求与状态管理库**，它借鉴了 React Query 的设计理念，专门为 Vue 3 优化，用于简化异步数据获取、缓存、同步和状态管理。
- (TanStack官网)[https://tanstack.com/]
- (vue-query官网)[https://tanstack.com/query/latest/docs/framework/vue/overview]
## **1. 核心功能**
`vue-query` 主要解决以下问题：
- **异步数据获取**（如 API 请求）
- **自动缓存**（避免重复请求）
- **数据同步**（后台更新时自动刷新）
- **状态管理**（加载中、错误、数据缓存等）
- **请求去重**（同一请求不会重复发送）

## **2. 主要用途**
### **(1) 替代手动 `fetch` + 状态管理**
传统 Vue 项目中，异步数据通常这样处理：
```vue
<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    data.value = await fetch('/api/data').then(res => res.json())
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>
```
**问题**：  
- 需要手动管理 `loading`、`error`、`data` 状态。  
- 重复请求相同数据时无法复用缓存。  
- 多个组件请求同一数据时无法共享状态。

**`vue-query` 的解决方案**：
```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { data, isLoading, error } = useQuery({
  queryKey: ['todos'], // 唯一标识
  queryFn: () => fetch('/api/todos').then(res => res.json()), // 数据获取函数
})
</script>
```
**优势**：  
- 自动管理加载状态（`isLoading`）、错误（`error`）和数据（`data`）。  
- 相同 `queryKey` 的请求会自动复用缓存，避免重复发送。  
- 多个组件使用相同的 `queryKey` 时会共享数据，无需重复请求。

---

### **(2) 后台数据同步（自动刷新）**
`vue-query` 支持 **后台静默更新**（`refetchInterval`、`refetchOnWindowFocus` 等）：
```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/api/todos').then(res => res.json()),
  refetchInterval: 5000, // 每5秒自动刷新一次
  refetchOnWindowFocus: true, // 用户切换回页面时自动刷新
})
</script>
```
**适用场景**：  
- 实时数据（如聊天消息、股票价格）。  
- 用户返回页面时自动更新数据（如 GitHub 的 PR 列表）。

---

### **(3) 请求去重 & 缓存**
- **同一 `queryKey` 的请求只会发送一次**，其他组件会等待缓存结果。  
- **缓存策略可配置**（如 `staleTime` 控制数据多久后视为“过期”）。  
- **手动更新缓存**（如提交表单后直接修改缓存，无需重新请求）。

---

## **3. 核心 API**
### **(1) `useQuery`（查询数据）**
用于获取数据（如 GET 请求）：
```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'

const { 
  data,         // 数据
  isLoading,    // 是否加载中
  isError,      // 是否错误
  error,        // 错误对象
  refetch,      // 手动重新请求
} = useQuery({
  queryKey: ['todos'], // 唯一标识
  queryFn: () => fetch('/api/todos').then(res => res.json()), // 数据获取函数
  staleTime: 1000 * 60 * 5, // 5分钟内不视为“过期”
})
</script>
```

### **(2) `useMutation`（修改数据）**
用于提交数据（如 POST、PUT、DELETE 请求）：
```vue
<script setup>
import { useMutation } from '@tanstack/vue-query'

const mutation = useMutation({
  mutationFn: (newTodo) => fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
  }).then(res => res.json()),
  onSuccess: (data) => {
    // 提交成功后自动更新缓存（无需手动重新请求）
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

// 调用 mutation
mutation.mutate({ title: 'New Todo' })
</script>
```

---

## **4. 为什么选择 `vue-query`？**
| 对比项 | `vue-query` | 手动 `fetch` + 状态管理 |
|--------|------------|----------------------|
| **代码量** | 极简（几行代码） | 冗长（需管理 `loading`、`error`、`data`） |
| **缓存** | 自动缓存，避免重复请求 | 需手动实现 |
| **数据同步** | 支持后台自动刷新 | 需手动轮询或 WebSocket |
| **请求去重** | 自动合并相同请求 | 需手动处理 |
| **缓存更新** | 支持手动/自动更新 | 需重新请求 |

---

## **5. 适用场景**
- **需要频繁请求 API 的 Vue 3 项目**（如后台管理系统、数据看板）。  
- **需要实时更新的数据**（如聊天应用、股票行情）。  
- **希望减少重复代码**（避免每个组件都写 `loading`、`error` 逻辑）。  
- **需要优化网络请求**（避免重复请求相同数据）。

---

## **6. 总结**
`tanstack/vue-query` 是 Vue 3 生态中 **强大的数据请求与状态管理库**，它：
1. **简化异步数据获取**（自动管理加载、错误、缓存）。  
2. **优化网络请求**（去重、后台刷新）。  
3. **提供类似 React Query 的 API**（对熟悉 React 生态的开发者友好）。  