const t=JSON.parse('{"key":"v-46c60a87","path":"/code/react/React18/34-Context%E4%B8%8A%E4%B8%8B%E6%96%87.html","title":"34-Context上下文","lang":"zh-CN","frontmatter":{"category":"react18","title":"34-Context上下文","updated":"2023-05-13 22:56","description":"34-Context 上下文 Context 相当于一个公共的存储空间，我们可以将多个组件中都需要访问的数据统一存储到一个 Context 中，这样无需通过 props 逐层传递，即可使组件访问到这些数据 当我们通过 Context 访问数据时，他会读取离他最近的 Provider 中的数据，如果没有 Provider，则读取 Context 中的默认数据 创建 context src/store/ 通过 React.createContext() 创建 context","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React18/34-Context%E4%B8%8A%E4%B8%8B%E6%96%87.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"34-Context上下文"}],["meta",{"property":"og:description","content":"34-Context 上下文 Context 相当于一个公共的存储空间，我们可以将多个组件中都需要访问的数据统一存储到一个 Context 中，这样无需通过 props 逐层传递，即可使组件访问到这些数据 当我们通过 Context 访问数据时，他会读取离他最近的 Provider 中的数据，如果没有 Provider，则读取 Context 中的默认数据 创建 context src/store/ 通过 React.createContext() 创建 context"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"34-Context上下文\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[{"level":2,"title":"创建 context","slug":"创建-context","link":"#创建-context","children":[]},{"level":2,"title":"使用方式一：回调函数","slug":"使用方式一-回调函数","link":"#使用方式一-回调函数","children":[{"level":3,"title":"Consumer 消费者","slug":"consumer-消费者","link":"#consumer-消费者","children":[]},{"level":3,"title":"Provider 生产者","slug":"provider-生产者","link":"#provider-生产者","children":[]}]},{"level":2,"title":"使用方式二：useContext()","slug":"使用方式二-usecontext","link":"#使用方式二-usecontext","children":[]}],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":1.48,"words":443},"filePathRelative":"code/react/React18/34-Context上下文.md","localizedDate":"2023年9月19日","excerpt":"<h1> 34-Context 上下文</h1>\\n<p>Context 相当于一个公共的存储空间，我们可以将多个组件中都需要访问的数据统一存储到一个 Context 中，这样无需通过 props 逐层传递，即可使组件访问到这些数据</p>\\n<p><mark>当我们通过 Context 访问数据时，他会读取离他最近的 Provider 中的数据</mark>，如果没有 Provider，则读取 Context 中的默认数据</p>\\n<h2> 创建 context</h2>\\n<p>src/store/<br>\\n通过 <code>React.createContext()</code> 创建 <code>context</code></p>","copyright":{"author":"Huxzhi"},"autoDesc":true}');export{t as data};
