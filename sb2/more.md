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



# 4 视图技术

## 4.1 为什么视图技术没有讲Thymeleaf 。

这里主要有俩个原因

* 我本身是Beetl模板引擎作者，很难出一本书里讲Thymeleaf技术
* Thymeleaf有很多我认为不好的地方，我在《[关于Thymeleaf的真相》](https://my.oschina.net/xiandafu/blog/1505526)已经有个详细说明，比如
  * 并非Spring Boot默认内置的模板引擎，Spring Boot支持很多模板引擎，并没有内置某一款模板语言
  * Thymeleaf并非所见所得，它一直宣称的观点是有误的。
  * Thymeleaf性能瓶颈
  * Thymeleaf的语法较为难学习，学习曲线很大。




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

com.xxx.YourApplication 代表了你的程序入口，即用@SpringBootApplication 标注的Spring Boot类

* org.springframework.boot.legacy.context.web.SpringBootContextLoaderListener 是属于独立维护的工程，因此，你还需显示的导入
~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-legacy</artifactId>
    <version>1.1.0.RELEASE</version>
</dependency>
~~~




