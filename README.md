## Beetl官方网站：[http://ibeetl.com](http://ibeetl.com)

#### 2016 Beetl官网改版计划（计划列表已于2016年12月17日完成）

---

- [x] 重新设计整体风格，加入适当CSS3动画提升用户体验
- [x] 支持响应式，适应不同屏幕以及手机等移动设备访问
- [x] 改造文档页面，直接动态加载md渲染，重写样式和代码着色
- [x] 改造文档页支持浮动导航和页面滚动导航监听
- [x] 改造在线体验页面，可做弹层
- [x] 官网主页i18n（vue前端实现i18n）（使用百度+谷歌翻译，如有不准确或有更好的翻译请指出）
- [ ] ~~其他改进，如动态加载github issue，加入多说等社会化评论？~~ （已有论坛）

---

####Beetl官网更新历史记录

-   2016年12月29日

    【主页】添加极速版文档（由Github根据Markdown自动生成，因为没有js和异步ajax加载，所以速度较快）

    【主页】添加语言切换时的vue css3过渡动效

    【文档】添加右边导航栏的vue css3过渡动效

    【在线体验】添加面板切换时的vue css3过渡动效


-   2016年12月17日

    【主页】i18n功能上线（翻译暂时来自于百度和Google，如有不准确或有更好的翻译请指出）

-   2016年12月16日

    【主页】全新设计的官网主页上线

-   2016年12月13日

    【在线体验】修改在线体验地址为[http://ibeetl.com/beetlonline/](http://ibeetl.com/beetlonline/)，这样以前在其他地方引用过的（如OSC上提问回答中有预留过的）依旧直接访问有效

    【主页】去除jQuery依赖，更新Footer栏样式


-   2016年12月13日

    【在线体验】全新的在线体验页面（网页样式提取自[Primer](https://github.com/primer/primer-css)），以标签形式显示运行结果

-   2016年12月08日

    【文档】提升部分浏览器的兼容性，优化iPad浏览器横屏时侧边栏的滚动效果

    【文档】添加手机等窄屏设备的顶部导航banner

    【文档】添加IE8及以下浏览器访问时的消息提示

-   2016年12月07日

    【文档】页面重新改造，以后仅需维护**[guide/beetl.md](https://github.com/javamonkey/home/blob/master/guide/beetl.md)**文件和**[guide/beetlsql.md](https://github.com/javamonkey/home/blob/master/guide/beetlsql.md)**文件，无需再手动生成HTML文件了。



#### ©版权声明

本项目为beetl官方网站托管仓库，所有的页面设计和制作均为自主设计与编写。

项目（网站）中引用到了部分开源库如下：

-   jquery：[http://jquery.com/](http://jquery.com/)
-   vue：[http://vuejs.org/](http://vuejs.org/)
-   lodash：[https://lodash.com/](https://lodash.com/)
-   smoothscroll：[https://github.com/galambalazs/smoothscroll-for-websites](https://github.com/galambalazs/smoothscroll-for-websites)
-   highlight.js：[https://highlightjs.org/](https://highlightjs.org/)
-   marked：[https://github.com/chjj/marked](https://github.com/chjj/marked)
-   nprogress：[http://ricostacruz.com/nprogress/](http://ricostacruz.com/nprogress/)
-   github-markdown-css：[https://github.com/sindresorhus/github-markdown-css](https://github.com/sindresorhus/github-markdown-css)
-   primer-css：[http://primercss.io](http://primercss.io)
-   iconfont部分字体图标：[http://iconfont.cn/](http://iconfont.cn/)


在此对这些开源作者的感谢。

同时项目的第三方库采用的bootcdn（[http://www.bootcdn.cn/](http://www.bootcdn.cn/)）提供的免费CDN，在此表示感谢。