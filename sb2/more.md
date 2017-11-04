# 本书代码

所有代码在 https://gitee.com/xiandafu/Spring-Boot-2.0-Samples

# 最新版本

由于写作本书的时候，Spring Boot 和 第三方集成工具版本一直在变化，因此这里列出验证过后的最新版本

* Spring Boot: 2.0.0.M5

~~~xml
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-parent</artifactId>
	<version>2.0.0.M5</version>
</parent>
~~~

* beetl

~~~xml

<dependency>
    <groupId>com.ibeetl</groupId>
    <artifactId>beetl-framework-starter</artifactId>
    <version>1.1.19.RELEASE</version>
</dependency>
~~~

# 说明

在写作的时候，考虑到篇幅，有些内容并未加进来，或者加进来也脱离了主线。还有些是在写作后才发现还有不同的技术点可以进一步介绍。因此本页面是对原书内容的补充和漫谈,
漫谈部分可能**不像书中那么客观，会有些主观部分，如果引起你的不适，见谅**。

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

## 1.3 如果以Debug模式启动本书例子会出怪事？

如果你以Debug模式运行本书的Spring Boot，Spring Boot在完全启动前会停留在SilentExitExceptionHandler，出了什么鬼？

~~~
SilentExitExceptionHandler{
	.....
	public static void exitCurrentThread() {
		throw new SilentExitException(); //即使没有打断点，IDE也会自动在这里停留
	}
  
}
~~~



这并不是Spring Boot特有现象，这是因为这里Spring Boot 抛出了一个捕获不了的异常(uncaught exceptions)

这种异常一般发生在线程的run方法里，导致线程异常退出，JDB（也就是Java Debug ，可以通过https://www.tutorialspoint.com/jdb/jdb_quick_guide.htm） 学习，默认情况下会对这情况进行断点。

如果要避免这种情况，可以配置JDB忽略这种uncaught exceptions，以Eclipse为例子，进入Java|Debug

勾选Suspend execution on uncaught exceptions 即可。



至于为什么Spring Boot会出现这种情况，这应该是与Spring Boot 热加载机制有关，具体可以参考：

https://github.com/spring-projects/spring-boot/issues/3100

## 1.4 SpringBoot1 和Spring Boot 2差别大吗？

有差别，但差别不大。基本上基于SpringBoot的代码不需要改动，但有些配置属性和配置类，可能要改动，改动原因是

* 配置已经不存在或者改名
* 类已经不存在改名

听着挺吓人，但我实际切换过程中改动的地方很少。一般正常的MVC，数据库访问这些都不需要改动



# 3 MVC框架

## 3.7  Spring内部是如何判断ModeAndView交给哪个模板引擎渲染的

对于Controller返回ModelAndView，Spring如何知道是交给Freemaker处理，还是Beetl处理呢？或者是其他模板引擎处理呢，实际上，Spring也不知道，但他会根据注册的AbstractTemplateViewResolver子类挨个询问“你是否能处理这种视图”

* Beetl的是org.beetl.ext.spring.BeetlSpringViewResolver
* Freemarker  org.springframework.web.servlet.view.FreeMarkerViewResolver

默认情况下，Beetl根据配置，认为能处理以btl结尾的视图（当然，也可以配置成处理html结尾的视图），

Freemaker 默认情况下 则会自动加上ftl后缀，检测项目是否存在这个文件（Beetl的也会检测是否存在这个文件）

如果存在，则回答Spring，说能处理，Spring则会交给这个视图处理器处理视图，从而渲染模板。

实际情况可能还更为复杂点，比如Spring会根据请求头信息来进一步筛选哪个视图处理器更合适，具体代码需要参考

org.springframework.web.servlet.view.ContentNegotiatingViewResolver.resolveViewName 方法

# 4 视图技术

## 4.1 为什么视图技术没有讲Thymeleaf 。

这里主要有俩个原因

* 我本身是Beetl模板引擎作者，很难出一本书里讲Thymeleaf技术
* Thymeleaf有很多我认为不好的地方，我在《[关于Thymeleaf的真相》](https://my.oschina.net/xiandafu/blog/1505526)已经有个详细说明，比如
  * 并非Spring Boot默认内置的模板引擎，Spring Boot支持很多模板引擎，并没有内置某一款模板语言
  * Thymeleaf并非所见所得，它一直宣称的观点是有误的。
  * Thymeleaf性能瓶颈
  * Thymeleaf的语法较为难学习，学习曲线很大。


# 7 Spring Boot 配置

## 7.1.1 新版旧版配置Context Path方式不同

Spring Boot 2  和 Spring Boot 1在配置Context Path的时候，目前看来不兼容，旧版本配置是

~~~properties
server.context-path=/config
~~~

2.0新版本是

~~~properties
server.servlet.context-path=/config
~~~

写作过程中，及时发现了这个变化，但这一节改动不一致，请以server.servlet.context-path为准

# 8 部署Spring Boot 应用

## 8.2 如果非要部署到老旧的应用服务器上？
书中写明了以war方式部署，针对的是servlet3.0 标准，也就是tomcat8，或者weblogic 12.如果你手里的服务器并不支持servlet3.0标准，还需要使用web.xml 方式，按照如下部署

* 在Spring Boot工程的main/src 目录下新建一个叫webapp的目录，再创建一个WEB-INF目录，创建web.xml ，内容如下：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">


	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>com.xxx.YourApplication</param-value>
	</context-param>

	<listener>
		<listener-class>org.springframework.boot.legacy.context.web.SpringBootContextLoaderListener</listener-class>
	</listener>
    <servlet>
        <servlet-name>appServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextAttribute</param-name>
            <param-value>org.springframework.web.context.WebApplicationContext.ROOT</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>appServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>

~~~

类名com.xxx.YourApplication 代表了你的程序入口，即用@SpringBootApplication 标注的Spring Boot类

* org.springframework.boot.legacy.context.web.SpringBootContextLoaderListener 是属于独立维护的工程，因此，你还需显示的导入

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-legacy</artifactId>
    <version>1.1.0.RELEASE</version>
</dependency>
~~~




