import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as p,c as o,a as n,b as s,e as c,w as l,f as i}from"./app-ee3e8713.js";const u={},r=n("blockquote",null,[n("p",null,"代码也是有后台的 xswl🤣")],-1),d=n("p",null,"state 和 props 类似，都是一种存储属性的方式，但是不同点在于 state 只属于当前组件，其他组件无法访问。并且 state 是可变的，当其发生变化后组件会自动重新渲染，以使变化在页面中呈现。",-1),k=n("h1",{id:"state",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#state","aria-hidden":"true"},"#"),s(" state")],-1),v=n("p",null,"在 React 中，当组件渲染完毕后，再修改组件中的变量，不会使组件重新渲染",-1),m=n("p",null,[s("要使得组件可以收到变量的影响，必须在变量修改后对组件进行重新渲染"),n("br"),s(" 这里我们就需要一个特殊变量，当这个变量被修改使，组件会自动重新渲染")],-1),b=n("p",null,"state 相当于一个变量，",-1),g=n("br",null,null,-1),_=n("br",null,null,-1),h=n("br",null,null,-1),f=i(`<h2 id="标准写法" tabindex="-1"><a class="header-anchor" href="#标准写法" aria-hidden="true">#</a> 标准写法</h2><p>使用钩子 useState() 来创建 state</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>useState<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它需要一个值作为参数，这个值就是 state 的初始值</p><p>该函数会返回一个数组</p><ul><li>数组中第一个元素，是<mark>初始值</mark> - 初始值只用来显示数据，直接修改不会触发组件的重新渲染</li><li>数组中的第二个元素，是一个函数，通常会命名为 setXxx - 这个函数用来修改 state，调用其修改 state 后会<mark>触发组件的重新渲染</mark>，并且使用函数中的值作为新的 state 值</li></ul><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">const</span> <span class="token punctuation">[</span>counter<span class="token punctuation">,</span> setCounter<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">addHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">setCounter</span><span class="token punctuation">(</span>counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将counter值修改为2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&#39;app&#39;</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>counter<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>addHandler<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">+</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等价于</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// counter 是初值</span>
<span class="token keyword">let</span> counter <span class="token operator">=</span> result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// setCounter 调用该函数，重新渲染视图</span>
<span class="token keyword">let</span> setCounter <span class="token operator">=</span> result<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>setCounter</code> 其实就是 重新调用 <code>render</code> 函数，又因为 <code>diff</code> 算法，如果元素不发生改变，不会调用 render</p><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h2><ul><li>当 state 的值是一个对象时，修改时是使用新的对象去替换已有对象。<mark>修改对象的属性不会触发 diff 算法</mark>， <ul><li>用浅拷贝，可以生成新对象，再修改新对象的属性值 <code>const newObj = Object.assign({}, Obj); newObj.age=18.setObj(newObj)</code></li><li><code>setuser({...user,age:19})</code> ，基础好的话就可以这样</li></ul></li><li>当通过 setState 去修改一个 state 时，并不表示修改当前的 state<br> 它修改的是组件<mark>下一次渲染时 state 值</mark><ul><li><code>const counter = 1;</code> counter 是常量，也不能修改的</li></ul></li><li>setState()会触发组件的重新渲染，它是异步的。 <ul><li>在异步队列，等待主线程计算完成，再渲染。所以当调用 setState()需要用旧 state 的值时，一定要注意有可能出现计算错误的情况</li><li>为了避免这种情况，可以通过为 setState()传递回调函数的形式来修改 state 值</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">addHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// setCounter(counter + 1); // 将counter值修改为2</span>
        <span class="token function">setCounter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prevCounter</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>

            <span class="token comment">/*
            *   setState()中回调函数的返回值将会成为新的state值
            *       回调函数执行时，React会将最新的state值作为参数传递
            * */</span>
            <span class="token keyword">return</span> prevCounter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// setCounter(prevState =&gt; prevState + 1);</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>setState 中的回调函数是异步回调，将会把当前同步函数执行一遍，再执行回调，因此获得的是最新的值</li></ul>`,14);function x(j,w){const a=e("RouterLink");return p(),o("div",null,[r,d,k,v,m,b,n("p",null,[s("只是这个变量在 React 中进行了注册，"),g,s(" React 会监控这个变量的变化，当 state 发生变化时，会自动触发组件的重新渲染"),_,s(" 使得我们的修改可以在页面中呈现出来"),h,s(" 在函数组件中，我们需要通过 "),c(a,{to:"/code/react/React18/18.a-hook%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0.html"},{default:l(()=>[s("钩子函数")]),_:1}),s(" ，获取 state")]),f])}const y=t(u,[["render",x],["__file","18-useState响应式变量.html.vue"]]);export{y as default};
