import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-ee3e8713.js";const p={},o=t(`<h1 id="_5-this-的指向及改变-this-的方法" tabindex="-1"><a class="header-anchor" href="#_5-this-的指向及改变-this-的方法" aria-hidden="true">#</a> 5-this 的指向及改变 this 的方法</h1><h2 id="function" tabindex="-1"><a class="header-anchor" href="#function" aria-hidden="true">#</a> function</h2><p>浏览器中，默认有 <code>this</code> 指向 <code>window</code></p><p>在方法/函数执行的内部 <code>this</code> 指相 就是 调用他的那个对象<br><code>.</code> 之前的就是 <code>this</code></p><h2 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> 箭头函数</h2><p>es6 提出了一个箭头函数，箭头函数里面的 <code>this</code> 指向是声明的当前上下文环境，并且不可改变 <code>this</code> 指向</p><p><strong>重点：</strong> 普通函数的 this 是 <mark>执行</mark> 的时候绑定 箭头函数是 <mark>声明</mark> 的时候进行绑定的 this</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;------箭头函数-------&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj3 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">oson1</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">oson2</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">fun1</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;箭头函数this&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// window</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">fun2</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;普通函数this&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// oson2</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj3<span class="token punctuation">.</span>oson1<span class="token punctuation">.</span>oson2<span class="token punctuation">.</span><span class="token function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// window</span>
obj3<span class="token punctuation">.</span>oson1<span class="token punctuation">.</span>oson2<span class="token punctuation">.</span><span class="token function">fun2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// oson2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="改变-this-指向的三个方法的区别-apply-call-bind" tabindex="-1"><a class="header-anchor" href="#改变-this-指向的三个方法的区别-apply-call-bind" aria-hidden="true">#</a> 改变 this 指向的三个方法的区别:apply,call,bind</h2><p>普通函数 改变 this 指向的三个方法的区别： <code>apply</code> , <code>call</code> , <code>bind</code></p><ol><li><code>apply</code> 改变 this 指向并立即执行函数，<strong>参数以数组形式写</strong></li><li><code>call</code> 改变 this 指向并立即执行函数，<strong>参数逗号分隔</strong></li><li><code>bind</code> 语法和 call 一样，但是改变完不会立即执行，比如绑定点击事件</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>obj3<span class="token punctuation">.</span>oson1<span class="token punctuation">.</span>oson2<span class="token punctuation">.</span><span class="token function">fun2</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">123</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { a: 123 }</span>
obj3<span class="token punctuation">.</span>oson1<span class="token punctuation">.</span>oson2<span class="token punctuation">.</span><span class="token function">fun2</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">456</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { a: 456 }</span>
obj3<span class="token punctuation">.</span>oson1<span class="token punctuation">.</span>oson2<span class="token punctuation">.</span><span class="token function">fun2</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">789</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;f&quot;</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { a: 789 }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),c=[o];function e(i,u){return s(),a("div",null,c)}const r=n(p,[["render",e],["__file","5-this的指向及改变this的方法.html.vue"]]);export{r as default};
