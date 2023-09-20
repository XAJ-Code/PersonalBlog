const n=JSON.parse(`{"key":"v-5c7375a8","path":"/code/vue/vue3/30.a-Vue%20use%20%E6%BA%90%E7%A0%81%E6%89%8B%E5%86%99.html","title":"30.a-Vue use 源码手写","lang":"zh-CN","frontmatter":{"category":"vue3","title":"30.a-Vue use 源码手写","updated":"2023-05-13 22:56","description":"myUse.ts import type { App } from 'vue' import { app } from './main' //./main.ts 导出app export const app = createApp(App) interface Use { install: (app: App, ...options: any[]) =&gt; void } const installedList = new Set() export function MyUse&lt;T extends Use&gt;(plugin: T, ...options: any[]) { if(installedList.has(plugin)){ return console.warn('重复添加插件',plugin) }else{ plugin.install(app, ...options) installedList.add(plugin) } }","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3/30.a-Vue%20use%20%E6%BA%90%E7%A0%81%E6%89%8B%E5%86%99.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"30.a-Vue use 源码手写"}],["meta",{"property":"og:description","content":"myUse.ts import type { App } from 'vue' import { app } from './main' //./main.ts 导出app export const app = createApp(App) interface Use { install: (app: App, ...options: any[]) =&gt; void } const installedList = new Set() export function MyUse&lt;T extends Use&gt;(plugin: T, ...options: any[]) { if(installedList.has(plugin)){ return console.warn('重复添加插件',plugin) }else{ plugin.install(app, ...options) installedList.add(plugin) } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"30.a-Vue use 源码手写\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[{"level":2,"title":"myUse.ts","slug":"myuse-ts","link":"#myuse-ts","children":[]},{"level":2,"title":"源码展示","slug":"源码展示","link":"#源码展示","children":[]}],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":0.41,"words":122},"filePathRelative":"code/vue/vue3/30.a-Vue use 源码手写.md","localizedDate":"2023年9月19日","excerpt":"<h2> myUse.ts</h2>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">import</span> <span class=\\"token keyword\\">type</span> <span class=\\"token punctuation\\">{</span> App <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'vue'</span>\\n<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> app <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">'./main'</span> <span class=\\"token comment\\">//./main.ts 导出app export const app = createApp(App)</span>\\n\\n<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">Use</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function-variable function\\">install</span><span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">(</span>app<span class=\\"token operator\\">:</span> App<span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">...</span>options<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token keyword\\">void</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">const</span> installedList <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Set</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\n<span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">function</span> <span class=\\"token generic-function\\"><span class=\\"token function\\">MyUse</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span><span class=\\"token constant\\">T</span> <span class=\\"token keyword\\">extends</span> Use<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span>plugin<span class=\\"token operator\\">:</span> <span class=\\"token constant\\">T</span><span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">...</span>options<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span><span class=\\"token punctuation\\">(</span>installedList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">has</span><span class=\\"token punctuation\\">(</span>plugin<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token keyword\\">return</span> <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">warn</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'重复添加插件'</span><span class=\\"token punctuation\\">,</span>plugin<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token keyword\\">else</span><span class=\\"token punctuation\\">{</span>\\n        plugin<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">install</span><span class=\\"token punctuation\\">(</span>app<span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">...</span>options<span class=\\"token punctuation\\">)</span>\\n        installedList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>plugin<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"Huxzhi"},"autoDesc":true}`);export{n as data};
