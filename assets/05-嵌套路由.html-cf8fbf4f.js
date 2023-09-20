const n=JSON.parse(`{"key":"v-51d8450e","path":"/code/vue/vue3-router4/05-%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1.html","title":"05-嵌套路由","lang":"zh-CN","frontmatter":{"category":"vue3","title":"05-嵌套路由","updated":"2023-05-13 22:56","description":"嵌套路由 一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构，例如： const routes: Array&lt;RouteRecordRaw&gt; = [ { path: \\"/user\\", component: () =&gt; import('../components/footer.vue'), children: [ { path: \\"\\", name: \\"Login\\", component: () =&gt; import('../components/login.vue') }, { path: \\"reg\\", name: \\"Reg\\", component: () =&gt; import('../components/reg.vue') } ] }, ]","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3-router4/05-%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"05-嵌套路由"}],["meta",{"property":"og:description","content":"嵌套路由 一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构，例如： const routes: Array&lt;RouteRecordRaw&gt; = [ { path: \\"/user\\", component: () =&gt; import('../components/footer.vue'), children: [ { path: \\"\\", name: \\"Login\\", component: () =&gt; import('../components/login.vue') }, { path: \\"reg\\", name: \\"Reg\\", component: () =&gt; import('../components/reg.vue') } ] }, ]"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"05-嵌套路由\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":0.71,"words":213},"filePathRelative":"code/vue/vue3-router4/05-嵌套路由.md","localizedDate":"2023年9月19日","excerpt":"<h1> 嵌套路由</h1>\\n<p>一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构，例如：</p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">const</span> routes<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">Array</span><span class=\\"token operator\\">&lt;</span>RouteRecordRaw<span class=\\"token operator\\">&gt;</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        path<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"/user\\"</span><span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token function-variable function\\">component</span><span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token keyword\\">import</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'../components/footer.vue'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n        children<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">[</span>\\n            <span class=\\"token punctuation\\">{</span>\\n                path<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">,</span>\\n                name<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"Login\\"</span><span class=\\"token punctuation\\">,</span>\\n                <span class=\\"token function-variable function\\">component</span><span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token keyword\\">import</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'../components/login.vue'</span><span class=\\"token punctuation\\">)</span>\\n            <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n            <span class=\\"token punctuation\\">{</span>\\n                path<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"reg\\"</span><span class=\\"token punctuation\\">,</span>\\n                name<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"Reg\\"</span><span class=\\"token punctuation\\">,</span>\\n                <span class=\\"token function-variable function\\">component</span><span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token keyword\\">import</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'../components/reg.vue'</span><span class=\\"token punctuation\\">)</span>\\n            <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">]</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n \\n<span class=\\"token punctuation\\">]</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"Huxzhi"},"autoDesc":true}`);export{n as data};
