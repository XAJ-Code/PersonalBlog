import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c as i,a as n,e,w as t,b as s,f as o}from"./app-ee3e8713.js";const u={},d=o(`<h1 id="_19a-undefined-与-null" tabindex="-1"><a class="header-anchor" href="#_19a-undefined-与-null" aria-hidden="true">#</a> 19a-undefined 与 null</h1><h2 id="undefined-与-null" tabindex="-1"><a class="header-anchor" href="#undefined-与-null" aria-hidden="true">#</a> undefined 与 null</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// 表示为“无”对象 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// 表示“无”的原始值 NaN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="有-4-种情况会-undefined" tabindex="-1"><a class="header-anchor" href="#有-4-种情况会-undefined" aria-hidden="true">#</a> 有 4 种情况会 undefined</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 1. 已声明，未赋值</span>
<span class="token keyword">let</span> o<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span>

<span class="token comment">// 2.对象某个属性不存在</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">)</span>

<span class="token comment">// 3. 函数调用少了参数</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>

<span class="token comment">//4.函数的默认返回值，构造函数除外</span>
<span class="token keyword">function</span> <span class="token function">abcd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;11&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">abcd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="null" tabindex="-1"><a class="header-anchor" href="#null" aria-hidden="true">#</a> null</h3>`,6),r=n("li",null,"手动释放内存",-1),k=n("li",null,"作为函数的参数(此参数不是对象)",-1),v=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// null</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
obj <span class="token operator">=</span> <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>告诉垃圾回收机制，变量不再使用了，也就是手动释放内存</p>`,2);function m(f,b){const a=p("RouterLink");return l(),i("div",null,[n("p",null,[e(a,{to:"/code/front-end-interview/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98/19-JS%E9%9D%A2%E8%AF%95%E9%A2%98.html"},{default:t(()=>[s("19-JS面试题")]),_:1})]),d,n("ol",null,[r,k,n("li",null,[s("原型链的顶端 "),e(a,{to:"/code/front-end-interview/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98/8-%E5%8E%9F%E5%9E%8B%E9%93%BEprototype.html"},{default:t(()=>[s("8-原型链 prototype")]),_:1})])]),v])}const g=c(u,[["render",m],["__file","19a-undefined与null.html.vue"]]);export{g as default};
