# 说明

由于作者水平有限，写作和编辑也有点仓促，难免书里有问题，这里会列出书中出现的问题，并会在新版中改正这些错误

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