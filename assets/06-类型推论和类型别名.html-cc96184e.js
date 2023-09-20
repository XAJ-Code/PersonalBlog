import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,f as e}from"./app-ee3e8713.js";const t={},p=e(`<h1 id="类型推论-类型别名" tabindex="-1"><a class="header-anchor" href="#类型推论-类型别名" aria-hidden="true">#</a> 类型推论|类型别名</h1><h2 id="类型别名" tabindex="-1"><a class="header-anchor" href="#类型别名" aria-hidden="true">#</a> 类型别名</h2><p>type 关键字（可以给一个类型定义一个名字）多用于符合类型</p><p>定义类型别名</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">str</span> <span class="token operator">=</span> <span class="token builtin">string</span>

<span class="token keyword">let</span> s<span class="token operator">:</span>str <span class="token operator">=</span> <span class="token string">&quot;我是小满&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义函数别名</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">str</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span>

<span class="token keyword">let</span> s<span class="token operator">:</span> <span class="token function-variable function">str</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;我是小满&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义联合类型别名</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">str</span> <span class="token operator">=</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span>

<span class="token keyword">let</span> s<span class="token operator">:</span> str <span class="token operator">=</span> <span class="token number">123</span> 
<span class="token keyword">let</span> s2<span class="token operator">:</span> str <span class="token operator">=</span> <span class="token string">&#39;123&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义值的别名</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">value</span> <span class="token operator">=</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token number">0</span> <span class="token operator">|</span> <span class="token string">&#39;213&#39;</span>
  
<span class="token keyword">let</span> s<span class="token operator">:</span>value <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token comment">//变量s的值  只能是上面value定义的值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),o=[p];function l(r,c){return a(),n("div",null,o)}const u=s(t,[["render",l],["__file","06-类型推论和类型别名.html.vue"]]);export{u as default};
