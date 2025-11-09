<script setup lang="ts">
// 1. 导入
// 2. 类型定义
// 3. hook & store
// 4. 响应式变量
// 5. 方法
// 6. 生命周期
</script>

my-project/
├─ .vscode/setting.json # 保存即自动格式化
├─ src/
│ ├─ api/ # 接口统一出口
│ ├─ assets/ # 静态资源
│ ├─ components/ # 通用业务组件
│ ├─ composables/ # 组合式函数（useXxx）
│ ├─ constant/ # 枚举 & 常量
│ ├─ hooks/ # 非 Vue 通用工具函数
│ ├─ layout/ # 框架级布局
│ ├─ modules/ # 按业务拆分（order/、user/）
│ │ ├─ index.ts # 模块统一出口
│ │ ├─ types.ts # 模块内类型
│ │ ├─ views/ # 页面
│ │ └─ components/ # 模块私有组件
│ ├─ router/ # 路由表 + 守卫
│ ├─ store/ # Pinia 业务 store
│ ├─ styles/ # 全局样式
│ │ ├─ index.scss
│ │ ├─ variables.scss # 设计令牌
│ │ └─ mixin.scss
│ ├─ utils/ # 纯函数工具
│ ├─ App.vue
│ └─ main.ts
├─ .eslintrc.cjs # 字节规范
├─ .stylelintrc.cjs # 9 条强制规则
├─ .commitlintrc.cjs # feat/fix/docs/style/refactor/test/chore
├─ .gitignore
├─ .prettierrc.cjs # 双引号→单引号，行宽 100
├─ tsconfig.json # strict:true
├─ vite.config.ts # 自带 gzip、brotli、CDN 外链
└─ package.json # scripts 已封装 lint/build/preview

src/
└── styles/ # 全局样式根目录
├── base/ # 基础样式（决定项目整体风格）
│ ├── reset.css # 样式重置（如 normalize.css 或自定义重置）
│ ├── base.css # 全局基础样式（body、html、a 等标签默认样式）
│ └── typography.css # 排版体系（字体、行高、标题层级等）
│
├── variables/ # 变量定义（按维度拆分，便于维护）
│ ├── colors.scss # 颜色变量（主色、辅助色、功能色等）
│ ├── sizes.scss # 尺寸变量（间距、圆角、边框等）
│ ├── fonts.scss # 字体变量（字体族、字号等）
│ └── z-index.scss # 层级变量（避免 z-index 冲突）
│
├── tools/ # 工具类/混合器（复用逻辑）
│ ├── mixins/ # 混合器（如响应式、阴影、动画等可复用逻辑）
│ │ ├── responsive.scss # 响应式断点混合器
│ │ └── shadow.scss # 阴影效果混合器
│ └── utilities.css # 工具类（原子化样式，如 .flex、.mb-10 等）
│
├── components/ # 全局组件样式（非业务组件，如 Button、Card 等）
│ ├── button.scss
│ ├── card.scss
│ └── dialog.scss
│
├── layouts/ # 布局样式（全局布局组件，如 Header、Footer 等）
│ ├── header.scss
│ ├── footer.scss
│ └── sidebar.scss
│
├── themes/ # 主题样式（如深色/浅色模式，按需添加）
│ ├── light.scss
│ └── dark.scss
│
└── index.scss # 入口文件（整合所有样式，供项目入口引入）
