# 说明

由于作者水平有限，写作和编辑也有点仓促，难免书里有问题，这里会列出书中出现的问题，并会在新版中改正这些错误。大部分错误都是编辑错误，如果有验证错误，会标示为** 重要 **

本书所有代码在 https://gitee.com/xiandafu/Spring-Boot-2.0-Samples

# 3 MVC 框架

## 3.1.3 Java 包名结构

java推荐包名是小写开头,这一小节“Controller”，“Service” 应该是小写“controller”，“service”。与图片一致

> 这应该是我编写完后转为Word文档，Word自己改成大写导致的。

##  3.3.1 @RequestMapping

produces: 响应的媒体类型（原文是”相应“）

# 4 视图技术
## 4.1.3 JSON技术
P102 第一阶段介绍，JackSon应该为jackson。


# 5  数据库访问技术

## 5.2.1 查询
p119 @Reponsitory通常都用在**同**存储相关类上，多写了一个同字
P120书中例子是：department_ud 应该是department_id

## 5.4.3 内置插入API
P132 关于insert方法，参数 parask 应该是paras

## 5.5.7 其他API
P141 使用JDBC 翻页，实例代码少了一个变量

~~~java
PageQuery query = new PageQuery(1,10)
PageQuery page = sqlManager.execute(new SQLReady(..),User.class,query)
~~~
少印刷了`query`


# 7 Spring Boot 配置

## 7.1.1 新版旧版配置Context Path方式不同

Spring Boot 2  和 Spring Boot 1在配置Context Path的时候，目前看来不兼容，旧版本配置是

```properties
server.context-path=/config
```

2.0新版本是

```properties
server.servlet.context-path=/config
```

写作过程中，及时发现了这个变化，但这一节改动不一致，先后出现了这俩个配置属性。请以server.servlet.context-path为准



# 9 单元测试

## 9.2.3 测试Service(重要)

P119最后一行，应该是“如果不希望事物回滚，可以在方法上使用@Rollback(false)” ,原文是true

# 11 MongDB

P242 :使用密码登录，控制台输出1，表示"登录成功"（原文是表示操作成功）

# 12 Redis

## 12.2.6 Set (重要)
关于 sinterstore 取集合交集和sunionstore 集合并集，书里描述有错，应该为如下

* sinterstore key1,key2,key3, 将key2,key3的交集放到key1里
* sunionstore key1,key2,key3 将key2,key3的并集放到key1里