# 功能说明

## 产品定位

DevBox Pro 是一个跨平台桌面开发者工具，面向后端、运维、数据开发和测试的日常工作流。它把常见协议客户端和文本工具整合到一个应用中，减少频繁切换工具的成本。

## 目标平台

- macOS arm64
- macOS x64
- Windows x64
- Linux 预留后续支持

## 主工作区

界面采用紧凑的开发者工具布局：

- 左侧导航栏：数据库、Redis、SSH、SFTP、Kafka、HTTP、JSON 工具、日志、设置。
- 中间资源面板：连接列表、资源树、搜索和模块动作。
- 右侧工作区：SQL 编辑器、终端、文件浏览器、请求编辑器、结果表格、消息查看器或工具输出。
- 多 Tab 工作区：支持同时打开多个 SQL、Redis Key、SSH 终端、HTTP 请求和其它会话。
- 深色模式优先，后续支持浅色和跟随系统。

## 数据库工具

首批支持：

- MySQL 连接配置
- 连接测试
- SQL 执行
- 结果表格
- 查询错误展示
- SQL 历史记录

计划支持：

- PostgreSQL
- SQLite
- Oracle
- SQL Server
- ClickHouse
- CSV 导出
- 收藏 SQL
- 分页查询和库表浏览

## Redis 工具

首批支持：

- Redis 单机连接配置
- Key 搜索
- String、Hash、List 数据查看
- 删除 Key
- 设置 TTL
- 刷新数据

计划支持：

- 哨兵
- 集群
- Set 和 ZSet 数据查看
- 批量 Key 操作

## SSH 工具

首批支持：

- 主机连接配置
- 用户名密码登录
- 私钥登录
- 基础终端

计划支持：

- 命令历史
- 常用命令收藏
- 会话恢复
- 多终端 Tab

## SFTP 工具

首批支持：

- 基于 SSH 配置的 SFTP 连接
- 远程目录浏览
- 本地目录浏览
- 上传
- 下载

计划支持：

- FTP
- 删除
- 重命名
- 文件预览
- 拖拽传输

## Kafka 工具

首批支持：

- Kafka 集群连接配置
- Topic 列表
- 消息消费
- 发送测试消息

计划支持：

- Consumer Group
- 按 offset 消费
- 按时间消费
- 分区选择
- 消息 Header 和 Key 展示

## HTTP 工具

首批支持：

- GET、POST、PUT、DELETE
- Header 管理
- Query 参数
- JSON Body
- 响应 Body
- 请求历史

计划支持：

- 环境变量
- 变量替换
- 认证辅助
- Collection 导入导出

## JSON 和文本工具

计划工具：

- JSON 格式化
- JSON 压缩
- JSON 校验
- Base64 编解码
- URL Encode / Decode
- 时间戳转换
- UUID 生成
- JWT 解码

## 日志和配置辅助

本地日志首批支持：

- 打开本地日志文件
- 关键词搜索
- 正则搜索
- 高亮展示

后续扩展：

- Kubernetes Pod 日志
- 阿里云 SLS 查询
- Nacos 配置查看

## 存储和安全

- 非敏感配置应保存在系统应用用户目录。
- 敏感信息不允许明文保存。
- 连接配置只保存 `passwordRef` 等密钥引用。
- macOS 优先使用 Keychain。
- Windows 优先使用 Credential Manager。
- Security Service 边界稳定后，可以实现本地加密兜底方案。
