import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as c,c as l,a as n,b as s,e as t,w as i,f as u}from"./app-ee3e8713.js";const r={},d=u(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>router 路由</p><p>应为 vue 是单页应用不会有那么多 html 让我们跳转 所有要使用路由做页面的跳转</p><p>Vue 路由允许我们通过不同的 URL 访问不同的内容。通过 Vue 可以实现多视图的单页 Web 应用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>npm i vue<span class="token operator">-</span>router <span class="token operator">--</span>save
<span class="token comment">//注意Vue2与Vue3的路由是互不兼容的，使用Vue3请使用Router4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>构建 前端项目</p><div class="language-swift line-numbers-mode" data-ext="swift"><pre class="language-swift"><code>npm <span class="token keyword">init</span> vue<span class="token attribute atrule">@latest</span>
<span class="token comment">//或者</span>
npm <span class="token keyword">init</span> vite<span class="token attribute atrule">@latest</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 Vue3 安装对应的 router4 版本<br> 使用 Vue2 安装对应的 router3 版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> vue-router@4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 src 目录下面新建 router 文件 然后在 router 文件夹下面新建 index.ts</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//引入路由对象</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHistory<span class="token punctuation">,</span> createWebHashHistory<span class="token punctuation">,</span> createMemoryHistory<span class="token punctuation">,</span> RouteRecordRaw <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token comment">//vue2 mode history vue3 createWebHistory</span>
<span class="token comment">//vue2 mode  hash  vue3  createWebHashHistory</span>
<span class="token comment">//vue2 mode abstact vue3  createMemoryHistory</span>

<span class="token comment">//路由数组的类型 RouteRecordRaw</span>
<span class="token comment">// 定义一些路由</span>
<span class="token comment">// 每个路由都需要映射到一个组件。</span>
<span class="token keyword">const</span> <span class="token literal-property property">routes</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>RouteRecordRaw<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;../components/Login.vue&#39;</span><span class="token punctuation">)</span> <span class="token comment">//lazy 懒加载</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/register&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;../components/Register.vue&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>



<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">history</span><span class="token operator">:</span> <span class="token function">createWebHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  routes
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//导出router</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> router
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="router-link" tabindex="-1"><a class="header-anchor" href="#router-link" aria-hidden="true">#</a> router-link</h2><p>请注意，我们没有使用常规的 a 标签，而是使用一个自定义组件 <code>router-link</code> 来创建链接。<br> 这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。我们将在后面看到如何从这些功能中获益。</p><p><code>router-view#</code><br> router-view 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>小满最骚<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!--使用 router-link 组件进行导航 --&gt;</span>
    <span class="token comment">&lt;!--通过传递 \`to\` 来指定链接 --&gt;</span>
    <span class="token comment">&lt;!--\`&lt;router-link&gt;\` 将呈现一个带有正确 \`href\` 属性的 \`&lt;a&gt;\` 标签--&gt;</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">tag</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>div<span class="token punctuation">&quot;</span></span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>跳转a<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">tag</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>div<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">margin-left</span><span class="token punctuation">:</span>200px</span><span class="token punctuation">&quot;</span></span></span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/register<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>跳转b<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>hr</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!-- 路由出口 --&gt;</span>
    <span class="token comment">&lt;!-- 路由匹配到的组件将渲染在这里 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后在 main.ts 挂载</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">&#39;./router&#39;</span>
<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),k=n("br",null,null,-1),v=n("br",null,null,-1),m={href:"https://blog.csdn.net/qq1195566313/article/details/123585949",target:"_blank",rel:"noopener noreferrer"};function g(b,h){const e=a("RouterLink"),p=a("ExternalLinkIcon");return c(),l("div",null,[d,n("p",null,[s("其他跳转方式"),k,t(e,{to:"/code/vue/vue3-router4/02-%E8%B7%AF%E7%94%B1%E8%B7%B3%E8%BD%AC%E6%96%B9%E5%BC%8F.html"},{default:i(()=>[s("02-路由跳转方式")]),_:1})]),n("blockquote",null,[n("p",null,[s("版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。"),v,s(" 本文链接："),n("a",m,[s("https://blog.csdn.net/qq1195566313/article/details/123585949"),t(p)])])])])}const _=o(r,[["render",g],["__file","01-安装.html.vue"]]);export{_ as default};
