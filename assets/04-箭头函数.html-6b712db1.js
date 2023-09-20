const e=JSON.parse('{"key":"v-73a875b8","path":"/code/react/React18/04-%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0.html","title":"04-箭头函数","lang":"zh-CN","frontmatter":{"category":"react18","title":"04-箭头函数","updated":"2023-05-13 22:56","description":"箭头函数是传统函数表达式的简写方式，它简化了函数的编写，也带来了一些限制导致在一些场景下它无法使用。 特点： 箭头函数没有自己的 this 箭头函数中没有 arguments arguments 用来保存函数的实参。乍一看，结果是个数组，但并不是真正的数组，所以说 arguments 是一个类数组的对象（想了解真正数组与类数组对象的区别可以一直翻到最后）。将函数的 arguments 对象泄露出去了，最终的结果就是 V8 引擎将会跳过优化，导致相当大的性能损失。 (...args) 代替，获取参数数组 不能作为构造函数调用 不能 new，没有 constructor 区分 普通函数和 构造函数 无法通过 call、apply、bind 指定函数的 this","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/react/React18/04-%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"04-箭头函数"}],["meta",{"property":"og:description","content":"箭头函数是传统函数表达式的简写方式，它简化了函数的编写，也带来了一些限制导致在一些场景下它无法使用。 特点： 箭头函数没有自己的 this 箭头函数中没有 arguments arguments 用来保存函数的实参。乍一看，结果是个数组，但并不是真正的数组，所以说 arguments 是一个类数组的对象（想了解真正数组与类数组对象的区别可以一直翻到最后）。将函数的 arguments 对象泄露出去了，最终的结果就是 V8 引擎将会跳过优化，导致相当大的性能损失。 (...args) 代替，获取参数数组 不能作为构造函数调用 不能 new，没有 constructor 区分 普通函数和 构造函数 无法通过 call、apply、bind 指定函数的 this"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"04-箭头函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[{"level":3,"title":"特点：","slug":"特点","link":"#特点","children":[]},{"level":2,"title":"基本语法","slug":"基本语法","link":"#基本语法","children":[]},{"level":2,"title":"arguments","slug":"arguments","link":"#arguments","children":[]}],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":1.92,"words":576},"filePathRelative":"code/react/React18/04-箭头函数.md","localizedDate":"2023年9月19日","excerpt":"<p>箭头函数是传统函数表达式的简写方式，它简化了函数的编写，也带来了一些限制导致在一些场景下它无法使用。</p>\\n<h3> 特点：</h3>\\n<ol>\\n<li>箭头函数没有自己的 <code>this</code></li>\\n<li>箭头函数中没有 <code>arguments</code>\\n<ol>\\n<li><code>arguments</code> 用来保存函数的实参。乍一看，结果是个数组，但并不是真正的数组，所以说 arguments 是一个<mark>类数组的对象</mark>（想了解真正数组与类数组对象的区别可以一直翻到最后）。将函数的 arguments 对象泄露出去了，最终的结果就是 V8 引擎将会跳过优化，导致相当大的性能损失。</li>\\n<li><code>(...args)</code> 代替，获取参数数组</li>\\n</ol>\\n</li>\\n<li>不能作为构造函数调用\\n<ol>\\n<li>不能 <code>new</code>，没有 <code>constructor</code></li>\\n<li>区分 普通函数和 构造函数</li>\\n</ol>\\n</li>\\n<li>无法通过 <code>call</code>、<code>apply</code>、<code>bind</code> 指定函数的 <code>this</code></li>\\n</ol>","copyright":{"author":"Huxzhi"},"autoDesc":true}');export{e as data};
