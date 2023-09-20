const n=JSON.parse(`{"key":"v-4e74270f","path":"/code/vue/vue3-router4/11-%E6%BB%9A%E5%8A%A8%E8%A1%8C%E4%B8%BA.html","title":"11-滚动行为","lang":"zh-CN","frontmatter":{"category":"vue3","title":"11-滚动行为","updated":"2023-05-13 22:56","description":"使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。vue-router 可以自定义路由切换时页面如何滚动。 当创建一个 Router 实例，你可以提供一个 &nbsp;scrollBehavior&nbsp; 方法 const router = createRouter({ history: createWebHistory(), scrollBehavior: (to, from, savePosition) =&gt; { console.log(to, '==============&gt;', savePosition); return new Promise((r) =&gt; { setTimeout(() =&gt; { r({ top: 10000 }) }, 2000); }) },","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3-router4/11-%E6%BB%9A%E5%8A%A8%E8%A1%8C%E4%B8%BA.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"11-滚动行为"}],["meta",{"property":"og:description","content":"使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。vue-router 可以自定义路由切换时页面如何滚动。 当创建一个 Router 实例，你可以提供一个 &nbsp;scrollBehavior&nbsp; 方法 const router = createRouter({ history: createWebHistory(), scrollBehavior: (to, from, savePosition) =&gt; { console.log(to, '==============&gt;', savePosition); return new Promise((r) =&gt; { setTimeout(() =&gt; { r({ top: 10000 }) }, 2000); }) },"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"11-滚动行为\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":0.81,"words":242},"filePathRelative":"code/vue/vue3-router4/11-滚动行为.md","localizedDate":"2023年9月19日","excerpt":"<p>使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。vue-router 可以自定义路由切换时页面如何滚动。</p>\\n<p>当创建一个 Router 实例，你可以提供一个 &nbsp;<code>scrollBehavior</code>&nbsp; 方法</p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">const</span> router <span class=\\"token operator\\">=</span> <span class=\\"token function\\">createRouter</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n  history<span class=\\"token operator\\">:</span> <span class=\\"token function\\">createWebHistory</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token function-variable function\\">scrollBehavior</span><span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">(</span>to<span class=\\"token punctuation\\">,</span> from<span class=\\"token punctuation\\">,</span> savePosition<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>to<span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">'==============&gt;'</span><span class=\\"token punctuation\\">,</span> savePosition<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\"><span class=\\"token builtin\\">Promise</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span>r<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token function\\">setTimeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">r</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n          top<span class=\\"token operator\\">:</span> <span class=\\"token number\\">10000</span>\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"Huxzhi"},"autoDesc":true}`);export{n as data};
