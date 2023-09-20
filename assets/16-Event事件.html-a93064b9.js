import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,f as t}from"./app-ee3e8713.js";const p={},e=t(`<h1 id="_16-event事件" tabindex="-1"><a class="header-anchor" href="#_16-event事件" aria-hidden="true">#</a> 16-Event事件</h1><h2 id="原生-js-绑定事件" tabindex="-1"><a class="header-anchor" href="#原生-js-绑定事件" aria-hidden="true">#</a> 原生 JS，绑定事件</h2><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token comment">//方法一 通过属性绑定</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value javascript language-javascript"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">点我一下</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">//方法二 通过方法绑定</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn01<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">点我一下</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;btn01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 最后一个参数是禁止冒泡，子组件触发事件不调用父组件的事件</span>
<span class="token comment">// 事件流的阶段是捕获--目标--冒泡</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;btn01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="react-元素通过设置属性值-回调函数" tabindex="-1"><a class="header-anchor" href="#react-元素通过设置属性值-回调函数" aria-hidden="true">#</a> React 元素通过设置属性值 回调函数</h2><p>在 React 中事件需要通过元素的属性来设置，<br> 和原生 JS 不同，在 React 中事件的属性需要使用驼峰命名法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>onclick <span class="token operator">-</span><span class="token operator">&gt;</span> onClick
onchange <span class="token operator">-</span><span class="token operator">&gt;</span> onChange
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>属性值不能直接执行代码，而是需要一个回调函数：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>onclick<span class="token operator">=</span><span class="token string">&quot;alert(123)&quot;</span>
onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token function">alert</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">点我一下
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">// 不能加括号，加括号是 自执行，如果是高级函数（返回的是函数）可以加括号</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>clickHandler<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">哈哈</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件对象" tabindex="-1"><a class="header-anchor" href="#事件对象" aria-hidden="true">#</a> 事件对象</h2><p>在 React 中，无法通过 return false 取消默认行为</p><ul><li>React 事件中同样会传递事件对象，可以在响应函数中定义参数来接收事件对象</li><li>React 中的事件对象同样 <strong>不是原生的事件对象</strong> ，是经过 React 包装后的事件对象</li><li>由于对象进行过包装，所以使用过程中我们无需再去考虑兼容性问题</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 接收 event 事件</span>
<span class="token keyword">const</span> <span class="token function-variable function">clickHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 取消默认行为</span>
    event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 取消事件的冒泡</span>

    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;我是App中的clickHandler！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),c=[e];function o(l,i){return a(),s("div",null,c)}const r=n(p,[["render",o],["__file","16-Event事件.html.vue"]]);export{r as default};
