# mason-inner-universe

基于 React + TypeScript + Ant Design + dayjs 的独立项目，复刻 [BuildAdmin](https://github.com/build-admin/buildadmin) 后台默认布局（静态演示）。

## 技术栈

- React 19
- TypeScript
- Vite
- Ant Design
- dayjs
- React Router

## 功能说明

- 默认布局：左侧菜单 + 顶部标签栏 + 右侧工具栏 + 主内容区
- 菜单数据：模拟 BuildAdmin 后台菜单（控制台、权限管理、会员管理、常规管理、安全管理、数据开发、模块市场）
- 控制台页面：含模拟统计数据与欢迎信息
- 其余菜单页：占位页，展示当前菜单名称

## 快速开始

```bash
npm install
npm run dev
```

## 项目结构

```
src/
├── layouts/DefaultLayout/   # 默认布局（对应 buildadmin default.vue）
├── mock/                  # 模拟菜单与管理员数据
├── pages/                 # 页面组件
├── types/                 # 类型定义
└── utils/                 # 工具函数
```

## 参考

布局参考自 BuildAdmin 项目 `web/src/layouts/backend/container/default.vue`。
