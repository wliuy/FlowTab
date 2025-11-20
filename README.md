# FlowTab

一个基于 Cloudflare Workers + KV 的极简主义、高性能个人导航页。

![FlowTab Screenshot](path/to/your/screenshot.png)
*(部署后请替换为你的截图)*

## ✨ 特性 (Features)

* **☁️ 无服务器架构**：完全运行在 Cloudflare 的边缘节点，速度极快，且免费额度足够个人使用。
* **💾 云端同步**：所有数据（链接、分类排序）均存储在 Cloudflare KV 中，多设备实时同步。
* **📱 完全响应式**：精心打磨的移动端适配，从 PC 大屏到手机小屏，体验如丝般顺滑。
* **🌙 深色模式**：内置日间/夜间模式切换，护眼舒适。
* **🔒 隐私保护**：支持设置“私密链接”，仅在登录状态下可见。
* **🛠️ 在线管理**：
    * 拖拽排序（分类和卡片）
    * 一键添加/编辑/删除链接
    * 自动获取网站图标 (Favicon)
* **🔍 多引擎搜索**：集成 Google, Bing, DuckDuckGo 等常用搜索引擎，手机端也能优雅使用。
* **📦 数据备份**：内置一键备份与恢复功能，数据安全无忧。

## 🚀 部署教程 (Deployment)

### 前置准备
* 一个 Cloudflare 账号。

### 步骤 1：创建 Workers
1.  登录 Cloudflare Dashboard。
2.  进入 **Workers & Pages** -> **Create application** -> **Create Worker**。
3.  命名为 `flowtab` (或者你喜欢的名字)，点击 **Deploy**。

### 步骤 2：创建 KV 命名空间
1.  在 Cloudflare 左侧菜单找到 **Workers & Pages** -> **KV**。
2.  点击 **Create a Namespace**。
3.  名称输入 `CARD_ORDER` (**必须完全一致**)，点击 **Add**。

### 步骤 3：绑定 KV 到 Worker
1.  回到你刚创建的 Worker (`flowtab`) 的设置页面。
2.  点击 **Settings** -> **Variables**。
3.  找到 **KV Namespace Bindings**，点击 **Add Binding**。
4.  **Variable name** 填写 `CARD_ORDER` (**必须完全一致**)。
5.  **KV Namespace** 选择你刚才创建的 `CARD_ORDER`。
6.  点击 **Save and deploy**。

### 步骤 4：设置管理员密码
1.  在同一个 **Settings** -> **Variables** 页面中。
2.  找到 **Environment Variables**，点击 **Add Variable**。
3.  **Variable name** 填写 `ADMIN_PASSWORD`。
4.  **Value** 填写你想要的后台管理密码 (例如 `mypassword123`)。
5.  点击 **Encrypt** (推荐) 以隐藏密码显示。
6.  点击 **Save and deploy**。

### 步骤 5：写入代码
1.  点击右上角的 **Edit code** 按钮。
2.  将 `worker.js` 文件中的所有代码复制并粘贴到编辑器中，覆盖原有的代码。
3.  点击右上角的 **Deploy**。

🎉 **完成！访问你的 Worker 域名即可开始使用。**

## 📖 使用说明

* **登录/设置**：点击右上角的“登录”按钮，输入你设置的 `ADMIN_PASSWORD` 即可进入管理模式。
* **添加链接**：登录后，点击右下角的加号按钮。
* **排序**：登录后，直接拖拽卡片或使用分类标题栏的上下箭头调整顺序。
* **私密模式**：添加/编辑链接时勾选“设为私密链接”，该链接只有在登录状态下才会显示。

## 🤝 贡献

本项目为单文件极简设计，如果您有改进建议，欢迎 Fork 或提交 Issue。

## 📄 协议

MIT License
