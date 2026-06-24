# mason-inner-universe

基于 React + Go 的全栈后台管理系统，参考 [BuildAdmin](https://github.com/build-admin/buildadmin) 布局与架构（`web/` + `server/` 同仓分离）。

## 技术栈

### web（前端）

- React 19 + TypeScript + Vite
- Ant Design + dayjs + React Router

### server（后端）

- Go + Gin
- GORM（支持 SQLite / MySQL / PostgreSQL）

## 项目结构

```
mason-inner-universe/
├── web/                 # 前端（独立 package.json、独立构建）
│   ├── src/
│   └── vite.config.ts   # /api 代理到后端
├── server/              # 后端（Go + GORM）
│   ├── cmd/api/         # 入口
│   ├── internal/        # 配置、数据库、模型、路由
│   └── storage/         # SQLite 数据文件（git 忽略）
└── package.json         # 根脚本：同时启动前后端
```

## 快速开始

### 1. 安装依赖

```bash
npm run install:all
```

### 2. 配置环境变量

```bash
cp web/.env.example web/.env
cp server/.env.example server/.env
```

### 3. 同时启动前后端

```bash
npm run dev
```

- 前端：http://localhost:5173
- 后端：http://127.0.0.1:8080
- API 健康检查：http://127.0.0.1:8080/api/health

### 单独启动

```bash
npm run dev:web
npm run dev:server
```

## API 示例

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/admin/profile` | 首个管理员信息（GORM 查询） |
| GET | `/api/admin/list` | 管理员列表 |

## 数据库（GORM）

默认使用 SQLite（`server/storage/miu.db`），启动时自动迁移表结构并写入种子数据。

切换 MySQL / PostgreSQL 时修改 `server/.env`：

```env
DB_DRIVER=mysql
DB_DSN=root:password@tcp(127.0.0.1:3306)/miu?charset=utf8mb4&parseTime=True&loc=Local
```

## 独立部署

- **web**：`npm run build --prefix web`，将 `web/dist` 部署到 Nginx/CDN
- **server**：`npm run build --prefix server`，运行 `server/bin/api`（或 `go run ./cmd/api`）
- Nginx 反代 `/api` 到 Go 服务，静态资源指向前端构建产物

## 参考

布局参考 BuildAdmin `web/src/layouts/backend/`。
