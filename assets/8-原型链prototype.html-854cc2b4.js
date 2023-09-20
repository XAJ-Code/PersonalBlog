const t=JSON.parse('{"key":"v-4c9a27f4","path":"/code/front-end-interview/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98/8-%E5%8E%9F%E5%9E%8B%E9%93%BEprototype.html","title":"8-原型链","lang":"zh-CN","frontmatter":{"title":"8-原型链","updated":"2023-05-13 22:56","description":"8-原型链 prototype 这个属性只有函数对象才有！，（构造）函数的原型对象 __proto__ 所有对象都有此属性，总是指向对应的（构造）函数的原型对象 prototype constructor: __proto__ 下面的 constructor 指向构造函数自己 继承属性的方案 对象访问属性的时候,在自身属性查找,找不到再去 __proto__ 原型链上查找,直到找不到为止返回 undefined。","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/front-end-interview/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98/8-%E5%8E%9F%E5%9E%8B%E9%93%BEprototype.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"8-原型链"}],["meta",{"property":"og:description","content":"8-原型链 prototype 这个属性只有函数对象才有！，（构造）函数的原型对象 __proto__ 所有对象都有此属性，总是指向对应的（构造）函数的原型对象 prototype constructor: __proto__ 下面的 constructor 指向构造函数自己 继承属性的方案 对象访问属性的时候,在自身属性查找,找不到再去 __proto__ 原型链上查找,直到找不到为止返回 undefined。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"8-原型链\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[{"level":2,"title":"继承属性的方案","slug":"继承属性的方案","link":"#继承属性的方案","children":[]},{"level":2,"title":"原型链的终点 Object.prototype","slug":"原型链的终点-object-prototype","link":"#原型链的终点-object-prototype","children":[]},{"level":2,"title":"constructor 主要判断对象的原型是否是某个对象","slug":"constructor-主要判断对象的原型是否是某个对象","link":"#constructor-主要判断对象的原型是否是某个对象","children":[]}],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":1.07,"words":321},"filePathRelative":"code/front-end-interview/前端面试题/8-原型链prototype.md","localizedDate":"2023年9月19日","excerpt":"<h1> 8-原型链</h1>\\n<ul>\\n<li><code>prototype</code> 这个属性只有函数对象才有！，（构造）函数的原型对象</li>\\n<li><code>__proto__</code> <strong>所有对象都有此属性</strong>，总是指向对应的（构造）函数的原型对象 prototype</li>\\n<li><code>constructor</code>: <code>__proto__</code> 下面的 <code>constructor</code> 指向构造函数自己</li>\\n</ul>\\n<h2> 继承属性的方案</h2>\\n<p>对象访问属性的时候,在自身属性查找,找不到再去 <code>__proto__</code> 原型链上查找,直到找不到为止返回 undefined。</p>","copyright":{"author":"Huxzhi"},"autoDesc":true}');export{t as data};
