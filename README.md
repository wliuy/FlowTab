# FlowTab 🌊

一个极简、美观且完全运行在 Cloudflare Workers 上的个人导航页/起始页。

FlowTab 是一个单文件（Single-file）应用，集成了前端界面与后端逻辑。它无需购买服务器，利用 Cloudflare 强大的全球边缘网络和 KV 存储，为您提供快速、免费且私密的书签管理服务。

---

## ✨ 功能特性

* **☁️ Serverless 部署**：依托 Cloudflare Workers，无需服务器，部署简单，免费额度充足。
* **📱 响应式设计**：完美适配桌面端（8列宽布局）与移动端（优化的触控体验），随时随地访问。
* **🔖 书签管理**：
    * 支持可视化的添加、编辑、删除链接和分类。
    * 支持分类拖拽排序、链接拖拽移动（管理模式下）。
    * 自动获取网站 Favicon。
* **🔍 多引擎搜索**：内置 Google, Bing, Baidu, DuckDuckGo, SearXNG 等多种搜索引擎，一键切换。
* **🔒 隐私保护**：
    * **支持私密链接**：将特定链接设为私密，仅在登录后可见。
    * **后台管理保护**：通过密码验证进入编辑模式。
* **💾 数据安全**：
    * 数据存储于 Cloudflare KV。
    * 支持云端快照备份（保留最近10个版本）与一键恢复。
    * 支持导出/导入 JSON 数据。
* **🌗 个性化体验**：
    * 支持深色/浅色模式切换（Logo 颜色自适应）。
    * 集成“一言”展示，每日一句灵感。

---

## 🛠️ 部署指南

只需要简单的几步即可拥有自己的 FlowTab。

### 1. 准备工作
注册一个 [Cloudflare](https://www.cloudflare.com/) 账号。

### 2. 创建 KV Namespace
1.  在 Cloudflare 控制台，进入 **Workers & Pages** -> **KV**。
2.  点击 **Create a Namespace**。
3.  命名为 `CARD_ORDER` (或者其他你喜欢的名字)，点击 **Add**。

### 3. 创建 Worker
1.  进入 **Workers & Pages** -> **Overview** -> **Create application** -> **Create Worker**。
2.  给 Worker 起个名字（例如 `flowtab`），点击 **Deploy**。
3.  点击 **Edit code**，将本项目中的 `worker.js` 内容完全覆盖编辑器中的默认代码。
4.  保存并部署。

### 4. 绑定 KV 和设置环境变量
回到 Worker 的 **Settings** 页面：

* **Variables (Environment Variables):**
    1.  添加一个变量，变量名为 `ADMIN_PASSWORD`。
    2.  值为你设定的后台管理密码。
    3.  (可选) 点击 **Encrypt** 加密存储。

* **KV Namespace Bindings:**
    1.  点击 **Add binding**。
    2.  Variable name 填入 `CARD_ORDER` (**必须**与代码中的 `env.CARD_ORDER` 一致)。
    3.  KV Namespace 选择你在第 2 步创建的那个命名空间。
    4.  点击 **Save and deploy**。

🎉 **部署完成！** 访问你的 Worker URL 即可开始使用。

---

## 📂 项目结构

```text
FlowTab/
├── README.md        # 项目说明文档
└── worker.js        # 核心文件（包含 HTML/CSS/JS 前端代码及后端逻辑）
