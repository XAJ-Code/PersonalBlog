import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c,a as n,b as a,e as t,f as e}from"./app-ee3e8713.js";const i={},u=e(`<h2 id="内置组件-keep-alive" tabindex="-1"><a class="header-anchor" href="#内置组件-keep-alive" aria-hidden="true">#</a> 内置组件 keep-alive</h2><p>有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。==而是希望组件可以缓存下来,维持当前的状态。==这时候就需要用到 keep-alive 组件。</p><p>切换组件时还能保存数据，提升用户体验</p><h3 id="开启-keep-alive-生命周期的变化" tabindex="-1"><a class="header-anchor" href="#开启-keep-alive-生命周期的变化" aria-hidden="true">#</a> 开启 keep-alive 生命周期的变化</h3><ul><li>初次进入时： onMounted&gt; onActivated</li><li>退出后触发 deactivated</li><li>再次进入：</li><li>只会触发 onActivated</li><li>事件挂载的方法等，只执行一次的放在 onMounted 中；组件每次进去执行的方法放在 onActivated 中</li></ul><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- 基本 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>view<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
 
<span class="token comment">&lt;!-- 多个条件判断的子组件 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>comp-a</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>a &gt; 1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>comp-a</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>comp-b</span> <span class="token attr-name">v-else</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>comp-b</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
 
<span class="token comment">&lt;!-- 和 \`&lt;transition&gt;\` 一起使用 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>view<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="include-和-exclude" tabindex="-1"><a class="header-anchor" href="#include-和-exclude" aria-hidden="true">#</a> <code>include</code> 和 <code>exclude</code></h3><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">:include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">:exclude</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">:max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>include 和 exclude 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：</p><h3 id="max" tabindex="-1"><a class="header-anchor" href="#max" aria-hidden="true">#</a> <code>max</code></h3><p>最多缓存个数，采用 <code>LRU</code> 算法</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">:max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>10<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>view<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="keep-alive-源码讲解" tabindex="-1"><a class="header-anchor" href="#keep-alive-源码讲解" aria-hidden="true">#</a> keep-alive 源码讲解</h2>`,13),k=n("br",null,null,-1),d={href:"https://www.bilibili.com/video/BV1dS4y1y7vd?p=22",target:"_blank",rel:"noopener noreferrer"},r={href:"https://xiaoman.blog.csdn.net/article/details/122953072",target:"_blank",rel:"noopener noreferrer"},v=e("<p>增加两个新的生命周期 <code>onActivated</code> 和 <code>onDeactivated</code> 切换时，执行这两个函数</p><ul><li>初始化 <ul><li>读取插槽的子节点 只能有一个 如果多了会报错 他只渲染单个组件</li><li>最后返回的其实还是我们的组件 keep-alive 只是一个抽象组件 本身并不会渲染</li></ul></li><li>卸载 <ul><li>在“卸载”组件时，并不是真正的卸载，而是调用 move 方法，将组件搬运到一个隐藏的容器中</li></ul></li></ul>",2);function g(m,h){const s=l("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[a("源码目录runtime-core/src/components/KeepAlive.ts"),k,a(" 更详细的在视频 "),n("a",d,[a("B站视频"),t(s)]),a(" 文章 "),n("a",r,[a("作者CSDN"),t(s)])]),v])}const x=p(i,[["render",g],["__file","20-keep-alive缓存组件.html.vue"]]);export{x as default};
