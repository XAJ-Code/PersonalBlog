import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-ee3e8713.js";const t={},p=e(`<h1 id="_47-redux-toolkit-rtk" tabindex="-1"><a class="header-anchor" href="#_47-redux-toolkit-rtk" aria-hidden="true">#</a> 47-Redux Toolkit（RTK）</h1><p>除了 Redux 核心库外 Redux 还为我们提供了一种使用 Redux 的方式——Redux Toolkit。它的名字起的非常直白，Redux 工具包，简称 RTK。RTK 可以帮助我们处理使用 Redux 过程中的重复性工作，简化 Redux 中的各种操作。</p><h3 id="在-react-中使用-rtk" tabindex="-1"><a class="header-anchor" href="#在-react-中使用-rtk" aria-hidden="true">#</a> 在 React 中使用 RTK</h3><p>安装，无论是 RTK 还是 Redux，在 React 中使用时 <code>react-redux</code> 都是必不可少，所以使用 RTK 依然需要安装两个包：<code>react-redux</code> 和<code>@reduxjs/toolkit</code> 。</p><p>npm</p><p><code>npm install react-redux @reduxjs/toolkit -S</code></p><h2 id="使用-rtk-来构建-store" tabindex="-1"><a class="header-anchor" href="#使用-rtk-来构建-store" aria-hidden="true">#</a> 使用 RTK 来构建 store</h2><h3 id="createslice-创建-reducer-的切片" tabindex="-1"><a class="header-anchor" href="#createslice-创建-reducer-的切片" aria-hidden="true">#</a> createSlice 创建 reducer 的切片</h3><p>它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置</p><p>切片对象会自动的帮助我们生成 action，保存在 actions 中</p><p>actions 中存储的是 slice 自动生成 action 创建器（函数），调用函数后会自动创建 action 对象。</p><p>action 对象的结构 <code>{type:name/函数名, payload:函数的参数} </code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//使用RTK来构建store</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> configureStore<span class="token punctuation">,</span> createSlice <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@reduxjs/toolkit&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> stuSlice <span class="token operator">=</span> <span class="token function">createSlice</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;stu&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 用来自动生成action中的type</span>
  <span class="token literal-property property">initialState</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;孙悟空&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
    <span class="token literal-property property">gender</span><span class="token operator">:</span> <span class="token string">&quot;男&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">&quot;花果山&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// state的初始值</span>
  <span class="token literal-property property">reducers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 指定state的各种操作，直接在对象中添加方法</span>
    <span class="token function">setName</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 可以通过不同的方法来指定对state的不同操作</span>
      <span class="token comment">// 两个参数：state 这个state的是一个代理对象，可以直接修改，不需要浅复制</span>
      state<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;猪八戒&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">28</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 切片对象会自动的帮助我们生成action</span>
<span class="token comment">// actions中存储的是slice自动生成action创建器（函数），调用函数后会自动创建action对象</span>
<span class="token comment">// action对象的结构 {type:name/函数名, payload:函数的参数}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> setName<span class="token punctuation">,</span> setAge <span class="token punctuation">}</span> <span class="token operator">=</span> stuSlice<span class="token punctuation">.</span>actions<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="configurestore-创建-store" tabindex="-1"><a class="header-anchor" href="#configurestore-创建-store" aria-hidden="true">#</a> configureStore 创建 store</h3><p>将多个 stuSlice 的 <code>reducer</code> ，保存到 store</p><p>用来创建 store 对象，需要一个配置对象作为参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建store</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">configureStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">reducer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">student</span><span class="token operator">:</span> stuSlice<span class="token punctuation">.</span>reducer<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> store<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","47-Redux-Toolkit使用.html.vue"]]);export{d as default};
