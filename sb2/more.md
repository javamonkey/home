# 说明

在写作的时候，考虑到篇幅，有些内容并未加进来，或者加进来也脱离了主线。还有些是在写作后才发现还有不同的技术点可以进一步介绍。因此本页面是对原书内容的补充和漫谈

# 1 前言

## 1.1 为什么要使用Spring Boot

我的观点是：
* 其实每个公司（采用Spring技术的公司） 都有一个 Boot技术框架
* 一千个公司，就有一千个Boot框架

Spring 适时推出了集成度更高，更容易使用的Spring Boot框架，迅速流行起来，而Spring Boot 2，绝对是一个里程碑

## 1.2 学习Spring Boot 很难吗？

作为一个Java新手，学习Spring Boot 需要一些必备技能，否则就掌握不了

* JDK
* Maven

Spring Boot **并未要求掌握Spring技术**，这恰恰是Spring Boot 目的，就是简化Spring框架，相对于市面上的很多轻量级框架，Spring Boot实际上也是这种定位。他的好处是利于了Spring框架，集成了Spring体系的几乎所有技术，以及集成了业界流行的第三方技术。因此Spring Boot 其实功能更强大，想必小巧的MVC框架来说，他其实也很”小巧“（但体积不小巧，这个没办法，谁让Spring都这么多年了，都成胖大叔了）

Spring Boot 学习唯一麻烦是现在缺少正正全面的中文书籍介绍给国内用户，本书《Spring Boot 2 精髓》正是这样一本书。



# 4 视图技术

## 4.1 为什么视图技术没有讲Thymeleaf 。

这里主要有俩个原因

* 我本身是Beetl模板引擎作者，很难出一本书里讲Thymeleaf技术
* Thymeleaf有很多我认为不好的地方，我在《[关于Thymeleaf的真相》](https://my.oschina.net/xiandafu/blog/1505526)已经有个详细说明，比如
  * 并非Spring Boot默认内置的模板引擎，Spring Boot支持很多模板引擎，并没有内置某一款模板语言
  * Thymeleaf并非所见所得，它一直宣称的观点是有误的。
  * Thymeleaf性能瓶颈
  * Thymeleaf的语法较为难学习，学习曲线很大。