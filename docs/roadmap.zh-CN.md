# 路线图

## 第一阶段：工程基础 - 已完成

- 桌面应用壳
- 类型化 IPC
- Main / Preload / Renderer 结构
- 核心数据模型
- 深色开发者布局
- 文档和仓库规范

## 第二阶段：数据库 MVP - 已完成

- MySQL 连接管理
- 连接测试
- SQL 执行
- 结果表格
- SQL 历史记录

验证状态：

- 2026-06-06 在 macOS arm64 完成单元测试、TypeScript strict 校验、生产构建、Electron runtime 冒烟和 Electron UI 验收。
- 真实 MySQL 查询成功路径仍需要有效的本机 MySQL 凭据；成功路径已通过 fake adapter 单元测试覆盖。

## 第三阶段：Redis MVP - 下一阶段

- Redis 连接管理
- Key 搜索
- String、Hash、List 查看
- 删除 Key 和设置 TTL

## 第四阶段：SSH 和 SFTP MVP

- SSH 连接
- 基础终端
- SFTP 目录浏览
- 上传和下载

## 第五阶段：Kafka MVP

- Kafka 连接
- Topic 列表
- 消息消费
- 发送测试消息

## 第六阶段：HTTP 和 JSON 工具

- HTTP 请求构建器
- 响应查看器
- 请求历史
- JSON 格式化和校验
- Base64、URL 编解码、时间戳、UUID、JWT 工具

## 第七阶段：跨平台打包

- macOS 安装包
- Windows 安装包
- 签名和自动更新方案
