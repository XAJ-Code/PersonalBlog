const e=JSON.parse('{"key":"v-d86cee36","path":"/code/front-end-interview/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98/3-%E6%95%B0%E7%BB%84%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95.html","title":"3-数组常用方法","lang":"zh-CN","frontmatter":{"title":"3-数组常用方法","updated":"2023-05-13 22:56","description":"3-数组常用方法 数组常用方法 1 join split push 向数组的末尾添加一个或更多元素，并返回新的长度。 pop 删除数组的最后一个元素并返回删除的元素。 unshift 方法可向数组的开头添加一个或更多元素，并返回新的长度。 改变数组的数目。 shift 删除并返回数组的第一个元素。 reverse sort concat 方法用于连接两个或多个数组。该方法不会改变现有的数组，而是返回一个新的数组。 splice 用于添加或删除数组中的元素。 会改变原数组 删除元素，则返回一个元素的数组。 如果未删除任何元素，则返回空数组。第 1 个参数指定起始位置，第 2 个参数指定长度 要添加到数组的新元素 第 3 个参数 slice 可从已有的数组中返回选定的元素 slice() 方法不会改变原始数组。 第 1 个参数起始，第 2 个参数结束位置","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/front-end-interview/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98/3-%E6%95%B0%E7%BB%84%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"3-数组常用方法"}],["meta",{"property":"og:description","content":"3-数组常用方法 数组常用方法 1 join split push 向数组的末尾添加一个或更多元素，并返回新的长度。 pop 删除数组的最后一个元素并返回删除的元素。 unshift 方法可向数组的开头添加一个或更多元素，并返回新的长度。 改变数组的数目。 shift 删除并返回数组的第一个元素。 reverse sort concat 方法用于连接两个或多个数组。该方法不会改变现有的数组，而是返回一个新的数组。 splice 用于添加或删除数组中的元素。 会改变原数组 删除元素，则返回一个元素的数组。 如果未删除任何元素，则返回空数组。第 1 个参数指定起始位置，第 2 个参数指定长度 要添加到数组的新元素 第 3 个参数 slice 可从已有的数组中返回选定的元素 slice() 方法不会改变原始数组。 第 1 个参数起始，第 2 个参数结束位置"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"3-数组常用方法"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"3-数组常用方法\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[{"level":2,"title":"数组常用方法 1","slug":"数组常用方法-1","link":"#数组常用方法-1","children":[]},{"level":2,"title":"遍历数组","slug":"遍历数组","link":"#遍历数组","children":[{"level":3,"title":"map 和 filter 结合","slug":"map-和-filter-结合","link":"#map-和-filter-结合","children":[]},{"level":3,"title":"reduce()","slug":"reduce","link":"#reduce","children":[]}]}],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":2.26,"words":679},"filePathRelative":"code/front-end-interview/前端面试题/3-数组常用方法.md","localizedDate":"2023年9月19日","excerpt":"<h1> 3-数组常用方法</h1>\\n<h2> 数组常用方法 1</h2>\\n<ol>\\n<li>join</li>\\n<li>split</li>\\n<li>push 向数组的末尾添加一个或更多元素，并返回新的长度。</li>\\n<li>pop 删除数组的最后一个元素并返回删除的元素。</li>\\n<li>unshift 方法可向数组的开头添加一个或更多元素，并返回新的长度。\\n<ol>\\n<li>改变数组的数目。</li>\\n</ol>\\n</li>\\n<li>shift 删除并返回数组的第一个元素。</li>\\n<li>reverse</li>\\n<li>sort</li>\\n<li>concat 方法用于连接两个或多个数组。该方法不会改变现有的数组，而是返回一个新的数组。</li>\\n<li>splice 用于添加或删除数组中的元素。\\n<ol>\\n<li>会改变原数组</li>\\n<li>删除元素，则返回一个元素的数组。 如果未删除任何元素，则返回空数组。第 1 个参数指定起始位置，第 2 个参数指定长度</li>\\n<li>要添加到数组的新元素 第 3 个参数</li>\\n</ol>\\n</li>\\n<li>slice 可从已有的数组中返回选定的元素\\n<ol>\\n<li>slice() 方法不会改变原始数组。</li>\\n<li>第 1 个参数起始，第 2 个参数结束位置</li>\\n</ol>\\n</li>\\n</ol>","copyright":{"author":"Huxzhi"},"autoDesc":true}');export{e as data};
