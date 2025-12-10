// ============================================================
// 1. 定义前端 HTML 内容 (包含完整 CSS/JS)
// ============================================================
const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <!--INJECT_DATA-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>FlowTab</title>
    <link id="dynamic-favicon" rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌊</text></svg>">
    <style>
        * { box-sizing: border-box; }
        :root { --bg-color: #f8f6f2; --text-color: #222; --card-bg: #fff; --primary: #43b883; --primary-hover: #35a674; --danger: #e74c3c; --danger-hover: #c0392b; --info: #5dade2; --shadow: rgba(0, 0, 0, 0.08); --border: #e0e0e0; --input-bg: #f9fafb; --dialog-bg: #fff; --btn-gray: #e5e7eb; --btn-gray-text: #374151; }
        body.dark-theme { --bg-color: #121418; --text-color: #e3e3e3; --card-bg: #1e2128; --primary: #5d7fb9; --primary-hover: #4a6fa5; --danger: #e74c3c; --info: #5d7fb9; --shadow: rgba(0, 0, 0, 0.2); --border: #444; --input-bg: #252830; --dialog-bg: #2d3748; --btn-gray: #374151; --btn-gray-text: #d1d5db; }
        body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; margin: 0; padding: 0; background-color: var(--bg-color); color: var(--text-color); transition: all 0.3s ease; overflow-x: hidden; }
        
        .fixed-elements { position: fixed; top: 0; left: 0; right: 0; background-color: var(--bg-color); z-index: 1000; padding: 10px; height: auto; min-height: 100px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); transition: all 0.3s ease; }
        .fixed-elements h3 { position: absolute; top: 10px; left: 20px; margin: 0; font-size: 24px; font-weight: 800; color: var(--primary); letter-spacing: 1px; display: flex; align-items: center; gap: 8px; }
        .logo-icon { width: 32px; height: 32px; }
        .logo-bg { fill: var(--primary); transition: fill 0.3s ease; }
        .center-content { width: 100%; max-width: 900px; text-align: center; margin: 0 auto; padding-top: 10px; }
        
        #hitokoto { margin: 5px 0 15px; font-size: 14px; color: #888; font-style: italic; max-width: 600px; margin-left: auto; margin-right: auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: text; user-select: text; min-height: 20px; }
        
        .search-container { margin-top: 10px; display: flex; justify-content: center; width: 100%; }
        .search-bar { display: flex; justify-content: center; margin-bottom: 10px; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); border: 1px solid var(--border); background-color: var(--card-bg); }
        .search-bar:focus-within { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(67, 184, 131, 0.2); }
        .search-bar select { border: none; background-color: rgba(0,0,0,0.02); padding: 8px 0; font-size: 13px; color: var(--primary); font-weight: bold; outline: none; cursor: pointer; width: 80px; text-align: center; text-align-last: center; }
        .search-bar select option { text-align: left; }
        .search-bar input { flex: 1; border: none; padding: 10px 15px; font-size: 14px; background-color: transparent; outline: none; color: var(--text-color); min-width: 0; }
        .search-bar button { border: none; background-color: var(--primary); color: white; padding: 0 20px; cursor: pointer; flex-shrink: 0; }
        
        .category-buttons-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; padding: 8px 12px; margin: 5px auto 0; max-width: 1200px; }
        .category-button { padding: 5px 12px; border-radius: 15px; background-color: var(--input-bg); color: var(--primary); border: none; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); flex-shrink: 0; }
        .category-button:hover, .category-button.active { background-color: var(--primary); color: white; transform: translateY(-1px); box-shadow: 0 3px 6px rgba(0,0,0,0.1); }
        
        .top-right-controls { position: fixed; top: 12px; right: 20px; display: flex; align-items: center; gap: 10px; z-index: 1001; }
        .header-btn, .bookmark-search-toggle { height: 38px; }
        .bookmark-search-toggle { background-color: var(--primary); color: white; border: none; border-radius: 4px; padding: 0; cursor: pointer; width: 38px; display: flex; align-items: center; justify-content: center; }
        .bookmark-search-toggle svg { width: 20px; height: 20px; stroke: white; stroke-width: 2.5; }
        .bookmark-search-dropdown { position: absolute; top: 100%; right: 0; width: 200px; background-color: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); padding: 8px; margin-top: 8px; display: none; }
        .bookmark-search-dropdown.show { display: block; }
        .bookmark-search-dropdown input { width: 100%; border: 1px solid var(--border); border-radius: 4px; padding: 8px; font-size: 13px; box-sizing: border-box; background-color: var(--input-bg); color: var(--text-color); }
        .header-btn { background-color: var(--primary); color: white; border: none; border-radius: 4px; padding: 0 15px; font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.3s; }
        .header-btn:hover { background-color: var(--primary-hover); }
        
        .content { margin-top: 180px; padding: 10px; max-width: 1500px; margin-left: auto; margin-right: auto; padding-bottom: 100px; }
        .section-title-container { display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid var(--border); padding-bottom: 8px; scroll-margin-top: 180px; }
        .section-title { font-size: 20px; font-weight: bold; color: var(--primary); position: relative; padding-left: 12px; margin-right: 10px; width: 130px; min-width: 130px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .section-title:before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 18px; background-color: var(--primary); border-radius: 2px; }
        .section-controls { display: flex; align-items: center; gap: 5px; margin-left: 0; height: 28px; }
        .mini-btn { width: 28px; height: 28px; padding: 0; border-radius: 6px; margin: 0 !important; display: inline-flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; border: none; transition: transform 0.2s; }
        .mini-btn:hover { transform: scale(1.1); }
        .mini-btn svg { width: 16px; height: 16px; stroke: white; stroke-width: 2; fill: none; stroke-linecap: round; stroke-linejoin: round; }
        .btn-edit { background-color: var(--primary); } .btn-del { background-color: var(--danger); } .btn-move { background-color: #5d7fb9; }

        .card-container { display: grid; grid-template-columns: repeat(auto-fill, 170px); gap: 15px; padding: 15px 5px; justify-content: center; }
        /* 优化：增加 user-select: none 防止拖拽时选中文本 */
        .card { background-color: var(--card-bg); border-radius: 8px; padding: 12px; width: 100%; box-shadow: 0 3px 10px var(--shadow); border-left: 3px solid var(--primary); cursor: pointer; transition: all 0.3s ease; position: relative; animation: fadeIn 0.3s ease forwards; opacity: 0; animation-delay: calc(var(--card-index) * 0.05s); display: flex; flex-direction: column; justify-content: center; overflow: hidden; user-select: none; -webkit-user-select: none; }
        /* 管理员模式下，卡片本身变为移动光标 */
        .admin-mode .card { cursor: move; }
        .card:hover:not(.no-hover) { transform: translateY(-5px); box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1); }
        /* 修复点：增加 pointer-events: none，让手指能穿透拖拽体检测下方元素 */
        .card.dragging { opacity: 0.5; transform: scale(0.95); box-shadow: 0 10px 20px rgba(0,0,0,0.1); pointer-events: none; }
        .card-top { display: flex; align-items: center; margin-bottom: 6px; width: 100%; }
        /* 还原：移除之前添加的 pointer-events: none，因为现在依靠遮罩层来阻挡 */
        .card-icon { width: 16px; height: 16px; margin-right: 6px; border-radius: 4px; object-fit: cover; flex-shrink: 0; }
        .card-title { font-size: 14px; font-weight: 600; color: var(--text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .card-url { font-size: 12px; color: #888; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .private-tag { background-color: #ff9800; color: white; font-size: 10px; padding: 2px 5px; border-radius: 3px; position: absolute; top: 8px; right: 5px; }
        
        /* 核心修复：遮罩层设为 auto，作为实体的拖拽手柄层；光标设为 move */
        .card-click-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; display: none; background: rgba(255, 255, 255, 0.85); cursor: move; pointer-events: auto; }
        body.dark-theme .card-click-overlay { background: rgba(30, 30, 30, 0.85); }
        .admin-mode .card:hover .card-click-overlay { display: flex; }
        
        /* 核心修复：布局层设为 none，让点击穿透到 overlay 本身，或者按钮 */
        .overlay-half { width: 50%; height: 100%; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s; pointer-events: none; }
        
        /* 核心修复：按钮设为 auto，确保能点击 */
        .action-btn-square { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: transform 0.2s; pointer-events: auto; }
        .action-btn-square:hover { transform: scale(1.1); }
        .action-btn-square svg { width: 18px; height: 18px; fill: none; stroke: white; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .btn-edit-card { background-color: var(--primary); } .btn-del-card { background-color: var(--danger); }

        .add-remove-controls { display: none; flex-direction: column; position: fixed; right: 20px; top: 50%; transform: translateY(-50%); gap: 15px; z-index: 900; align-items: center; }
        .floating-button-group { position: fixed; bottom: 50px; right: 20px; display: flex; flex-direction: column; gap: 15px; z-index: 1000; align-items: center; } 
        .round-btn { background-color: var(--primary); color: white; border: none; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); transition: all 0.3s ease; }
        .round-btn:hover { transform: translateY(-3px); background-color: var(--primary-hover); box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); }
        .round-btn svg { width: 24px; height: 24px; stroke: white; stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }

        .dialog-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 2000; backdrop-filter: blur(3px); justify-content: center; align-items: center; animation: fadeIn 0.2s ease; }
        .dialog-box { background: var(--dialog-bg); padding: 25px; border-radius: 10px; width: 360px; max-width: 90%; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); animation: slideUp 0.3s ease; }
        .dialog-title { margin: 0 0 20px; color: var(--text-color); font-size: 18px; font-weight: 600; text-align: center; }
        .dialog-box label { display: block; margin-bottom: 5px; font-size: 13px; color: #888; }
        .dialog-box input, .dialog-box select { width: 100%; margin-bottom: 15px; padding: 10px; border: 1px solid var(--border); border-radius: 5px; font-size: 14px; background-color: var(--input-bg); color: var(--text-color); box-sizing: border-box; }
        .dialog-box input:focus { border-color: var(--primary); outline: none; }
        .dialog-buttons { display: flex; justify-content: center; gap: 20px; margin-top: 20px; }
        .btn-base { border: none; border-radius: 4px; padding: 8px 0; font-size: 14px; cursor: pointer; transition: all 0.3s ease; font-weight: 500; min-width: 100px; text-align: center; display: inline-block; }
        .btn-confirm { background-color: var(--primary); color: white; }
        .btn-cancel { background-color: var(--btn-gray); color: var(--btn-gray-text); }

        .backup-header-info { background-color: var(--input-bg); padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .backup-list-wrapper { border: 1px solid var(--border); border-radius: 6px; max-height: 300px; overflow-y: auto; }
        .backup-item { display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid var(--border); font-size: 14px; }
        .restore-link { color: #3498db; text-decoration: none; cursor: pointer; margin-right: 10px; }
        .trash-icon svg { width: 16px; height: 16px; stroke: var(--danger); fill: none; stroke-width: 2; vertical-align: middle; cursor: pointer; }

        #loading-mask .dialog-box { width: 300px; padding: 30px 25px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .spinner { width: 36px; height: 36px; border: 4px solid #eee; border-top-color: var(--primary); border-radius: 50%; animation: spin 1s infinite linear; margin-bottom: 15px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        #custom-tooltip { position: fixed; display: none; z-index: 3001; background: var(--primary); color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); pointer-events: none; line-height: 1.5; max-width: 300px; word-wrap: break-word; }
        #general-dialog { z-index: 2500; }
        #loading-mask { z-index: 3000; }

        /* 移动端适配 */
        @media (max-width: 480px) {
            .fixed-elements { height: auto; padding: 10px 5px 5px; position: fixed; }
            .fixed-elements h3 { font-size: 24px; top: 10px; left: 12px; font-weight: 800; letter-spacing: 1px; display: flex; align-items: center; gap: 2px; }
            .app-title { display: block; font-size: 20px; font-weight: 900; margin-left: 0; letter-spacing: 0.5px; }
            .logo-icon { width: 35px; height: 35px; }
            .top-right-controls { top: 14px; right: 16px; gap: 6px; }
            .header-btn, .bookmark-search-toggle { height: 28px !important; min-width: auto; font-size: 11px; padding: 0 8px; line-height: 28px; }
            .bookmark-search-toggle { width: 28px; } 
            .bookmark-search-toggle svg { width: 14px; height: 14px; }
            .center-content { padding: 0 10px; margin-top: 55px; width: 100%; }
            #hitokoto { margin: 3px 0 8px; font-size: 12px; }
            .category-buttons-container { flex-wrap: nowrap; overflow-x: auto; justify-content: flex-start; padding-bottom: 5px; scrollbar-width: none; }
            .category-buttons-container::-webkit-scrollbar { display: none; }
            .category-button { flex-shrink: 0; font-size: 12px; padding: 5px 12px; }
            .content { padding: 10px; padding-bottom: 220px !important; }
            .card-container { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; padding: 5px; align-items: stretch; display: grid; }
            .card { width: 100%; height: 100%; margin: 0; box-sizing: border-box; overflow: hidden; }
            .search-bar { width: 92%; margin-left: auto; margin-right: auto; }
            .search-bar select { min-width: 0; width: 80px; padding: 8px 0; text-align: center; text-indent: 0; }
            .add-remove-controls { top: auto; transform: none; bottom: 160px; right: 20px; } 
            .floating-button-group { position: fixed; bottom: 50px; right: 20px; display: flex; flex-direction: column; gap: 15px; z-index: 1000; align-items: center; } 
            .floating-button-group button { width: 38px; height: 38px; } /* 修复：统一移动端底部按钮尺寸为38px */
            .round-btn { width: 38px; height: 38px; }
            .section-title { font-size: 17px; padding-left: 10px; margin-top: 10px; width: 95px; min-width: 95px; }
            .dialog-box { width: 85%; padding: 20px; }
            #loading-mask .dialog-box { width: 260px; } 
            .btn-base { padding: 10px 0; font-size: 15px; } 
        }
    </style>
</head>
<body>
    <div class="fixed-elements">
        <h3>
            <svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect class="logo-bg" x="10" y="20" width="80" height="60" rx="12" />
                <path d="M10 50 C 30 40, 70 80, 90 50" stroke="white" stroke-width="8" stroke-linecap="round"/>
                <circle cx="75" cy="35" r="6" fill="white"/>
            </svg>
            <span class="app-title">FlowTab</span>
        </h3>
        <div class="center-content">
            <p id="hitokoto"><span id="hitokoto_text"></span></p>
            <div class="search-container">
                <div class="search-bar">
                    <select id="search-engine-select">
                        <option value="baidu">百度</option>
                        <option value="SearXNG">SearXNG</option>
                        <option value="bing">必应</option>
                        <option value="google">谷歌</option>
                        <option value="duckduckgo">DuckDuckGo</option>
                    </select>
                    <input type="text" id="search-input" placeholder="在此搜索...">
                    <button id="search-button">🔍</button>
                </div>
            </div>
            <div id="category-buttons-container" class="category-buttons-container"></div>
        </div>
        <div class="top-right-controls">
            <button class="header-btn" id="admin-btn" onclick="handleAdminBtnClick()" style="display: none;">离开设置</button>
            <button class="header-btn" id="login-btn" onclick="handleLoginClick()">登录</button>
            <div class="bookmark-search-toggle" onclick="toggleBookmarkSearch()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <div class="bookmark-search-dropdown" id="bookmark-search-dropdown" onclick="event.stopPropagation()">
                    <input type="text" id="bookmark-search-input" placeholder="搜索书签...">
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="add-remove-controls">
            <button class="round-btn" onclick="showLinkDialog()" title="添加链接">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button class="round-btn" onclick="addCategory()" title="添加分类">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
            </button>
            <button class="round-btn" id="export-btn" onclick="exportBookmarks()" title="导出">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
            <button class="round-btn" id="import-btn" onclick="handleImportClick()" title="导入">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </button>
            <button class="round-btn" id="backup-manage-btn" onclick="showBackupManager()" title="备份与恢复">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            </button>
        </div>
        <div id="sections-container"></div>
        <div class="floating-button-group">
            <button class="round-btn" id="back-to-top-btn" onclick="scrollToTop()" style="display: none;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>
            </button>
            <button class="round-btn" onclick="toggleTheme()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" stroke="none"></path></svg>
            </button>
        </div>
    </div>

    <!-- 弹窗 -->
    <div class="dialog-overlay" id="link-dialog"><div class="dialog-box"><h3 class="dialog-title" id="link-dialog-title">添加链接</h3><input type="hidden" id="link-old-url"><label>名称 (必填)</label><input type="text" id="name-input" placeholder="名称"><label>URL (必填)</label><input type="text" id="url-input" placeholder="https://..." onblur="autoFillTitle()"><label>描述 (可选)</label><input type="text" id="tips-input" placeholder="描述"><label>图标 URL (可选)</label><input type="text" id="icon-input" placeholder="图标地址"><div id="icon-candidates" style="margin-bottom:15px;display:flex;gap:10px;min-height:0;"></div><label>分类</label><select id="category-select"></select><div style="margin-top:10px;display:flex;align-items:center"><input type="checkbox" id="private-checkbox" style="width:auto;margin:0 10px 0 0"><span style="font-size:14px;color:var(--text-color)">设为私密链接</span></div><div class="dialog-buttons"><button class="btn-base btn-cancel" onclick="hideDialog('link-dialog')">取消</button><button class="btn-base btn-confirm" id="link-confirm-btn" onclick="saveLinkFromDialog()">确定</button></div></div></div>
    <div class="dialog-overlay" id="login-modal"><div class="dialog-box" style="width:300px"><h3 class="dialog-title">登录</h3><input type="password" id="login-password" placeholder="请输入密码"><div class="dialog-buttons"><button class="btn-base btn-cancel" onclick="hideDialog('login-modal')">取消</button><button class="btn-base btn-confirm" onclick="performLogin()">确定</button></div></div></div>
    <div class="dialog-overlay" id="backup-modal"><div class="dialog-box" style="width:550px;max-width:90%;padding:0;overflow:hidden"><div style="padding:20px;border-bottom:1px solid var(--border)"><h3 style="margin:0;font-size:18px;color:var(--text-color);text-align:left">历史备份节点列表</h3><p style="margin:5px 0 0;font-size:12px;color:#888">我们为您在云端最多保留10个历史备份节点。</p></div><div style="padding:20px"><div class="backup-header-info"><span id="last-backup-time" style="font-size:13px;color:var(--text-color)">加载中...</span><button class="btn-base btn-confirm" onclick="handleManualBackup()" style="padding:6px 15px;min-width:auto">🚀 立即备份</button></div><h4 style="margin:0 0 10px;font-size:14px;color:var(--text-color)">云端历史备份节点</h4><div id="backup-list-container" class="backup-list-wrapper"></div></div><div style="padding:15px 20px;background-color:var(--input-bg);text-align:right;border-top:1px solid var(--border)"><button class="btn-base btn-cancel" onclick="hideDialog('backup-modal')">关闭</button></div></div></div>
    <div class="dialog-overlay" id="general-dialog"><div class="dialog-box"><h3 class="dialog-title" id="general-dialog-title">提示</h3><div id="general-dialog-content" style="margin-bottom:20px;text-align:center;color:var(--text-color);line-height:1.5"></div><input type="text" id="general-dialog-input" style="display:none"><div class="dialog-buttons"><button class="btn-base btn-cancel" style="display:none" id="general-cancel">取消</button><button class="btn-base btn-confirm" id="general-confirm">确定</button></div></div></div>
    <div id="loading-mask" class="dialog-overlay" style="z-index:3000"><div class="dialog-box"><div class="spinner"></div><p id="loading-text" style="color:var(--text-color)">正在进入设置模式...</p></div></div>
    <div id="custom-tooltip"></div>

    <script>
    // 优化：定义 User ID 常量
    const CURRENT_USER_ID = 'testUser';
    // 优化：定义默认图标 Base64 常量
    const DEFAULT_ICON_BASE64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTAgMTNhNSA1IDAgMCAwIDcuNTQuNTRsMy0zYTUgNSAwIDAgMC03LjA3LTcuMDdsLTEuNzIgMS43MSIvPjxwYXRoIGQ9Ik0xNCAxMWE1IDUgMCAwIDAtNy41NC0uNTRsLTMgM2E1IDUgMCAwIDAtNy41NC0uNTRsLTMgM2E1IDUgMCAwIDAtNy41NC0uNTRsLTMgM2E1IDUgMCAwIDAgNy4wNyA3LjA3bDEuNzEtMS43MSIvPjwvc3ZnPg==";

    function el(id) { return document.getElementById(id); }
    function showDialog(id) { const d = el(id); if(d) { d.style.display = 'flex'; const i = d.querySelectorAll('input'); if(i.length) setTimeout(()=>i[0].focus(),100); } }
    function hideDialog(id) { const d = el(id); if(d) d.style.display = 'none'; }
    function showLoading(text='加载中...') { el('loading-text').innerText=text; showDialog('loading-mask'); }
    function hideLoading() { hideDialog('loading-mask'); }
    
    function adjustOffset() { const header = document.querySelector('.fixed-elements'); const content = document.querySelector('.content'); if(header && content) { const h = header.offsetHeight; content.style.marginTop = h + 'px'; } }
    window.addEventListener('load', adjustOffset); window.addEventListener('resize', adjustOffset); new ResizeObserver(adjustOffset).observe(document.querySelector('.fixed-elements'));

    function customAlert(msg) { el('general-dialog-title').textContent = '提示'; el('general-dialog-content').textContent = msg; el('general-dialog-input').style.display = 'none'; el('general-cancel').style.display = 'none'; el('general-confirm').textContent = '确定'; showDialog('general-dialog'); const btn = el('general-confirm').cloneNode(true); el('general-confirm').parentNode.replaceChild(btn, el('general-confirm')); btn.onclick = () => hideDialog('general-dialog'); }
    function customConfirm(msg, btnOkText='确定', btnCancelText='取消') { return new Promise(resolve => { el('general-dialog-title').textContent = '确认'; el('general-dialog-content').textContent = msg; el('general-dialog-input').style.display = 'none'; el('general-cancel').style.display = 'inline-block'; el('general-cancel').textContent = btnCancelText; el('general-confirm').textContent = btnOkText; showDialog('general-dialog'); const ok = el('general-confirm'), cancel = el('general-cancel'); const nOk = ok.cloneNode(true), nCancel = cancel.cloneNode(true); ok.parentNode.replaceChild(nOk, ok); cancel.parentNode.replaceChild(nCancel, cancel); nOk.onclick = () => { hideDialog('general-dialog'); resolve(true); }; nCancel.onclick = () => { hideDialog('general-dialog'); resolve(false); }; }); }
    function customPrompt(title, val='') { return new Promise(resolve => { el('general-dialog-title').textContent = title; el('general-dialog-content').textContent = ''; const inp = el('general-dialog-input'); inp.style.display = 'block'; inp.value = val; inp.focus(); el('general-cancel').style.display = 'inline-block'; el('general-cancel').textContent = '取消'; showDialog('general-dialog'); setTimeout(()=>inp.focus(), 100); const ok = el('general-confirm'), cancel = el('general-cancel'); const nOk = ok.cloneNode(true), nCancel = cancel.cloneNode(true); ok.parentNode.replaceChild(nOk, ok); cancel.parentNode.replaceChild(nCancel, cancel); nOk.onclick = () => { hideDialog('general-dialog'); resolve(inp.value.trim()); }; nCancel.onclick = () => { hideDialog('general-dialog'); resolve(null); }; inp.onkeypress = (e) => { if(e.key==='Enter') nOk.click(); }; }); }

    const state = { engine: localStorage.getItem('se')||"baidu", token: localStorage.getItem('authToken'), links: [], publicLinks: [], privateLinks: [], categories: {}, isAdmin: false, isLoggedIn: false, isEditMode: false };
    const searchEngines = { SearXNG: "https://ss.ayang.nyc.mn/search?q=", baidu: "https://www.baidu.com/s?wd=", bing: "https://www.bing.com/search?q=", google: "https://www.google.com/search?q=", duckduckgo: "https://duckduckgo.com/?q=" };

    async function api(url, method='GET', body=null) { const opts = { method, headers: {'Content-Type': 'application/json'} }; if(state.token) opts.headers['Authorization'] = state.token; if(body) opts.body = JSON.stringify(body); try { const res = await fetch(url, opts); if(res.status === 401) { resetLogin(); customAlert('登录已过期，请重新登录'); return { error: 'auth' }; } if(!res.ok) return { error: 'Status '+res.status }; return await res.json(); } catch(e) { return { error: e.message }; } }

    el('search-engine-select').value = state.engine; el('search-engine-select').onchange = e => { state.engine = e.target.value; localStorage.setItem('se', state.engine); }; el('search-button').onclick = () => { const q = el('search-input').value; if(q) window.open(searchEngines[state.engine] + encodeURIComponent(q), '_blank'); }; el('search-input').onkeypress = e => { if(e.key==='Enter') el('search-button').click(); };

    // --- 一言/古诗词逻辑重写 (支持服务端注入) ---
    function fetchHitokoto() {
        const hitokoto = el('hitokoto_text');
        if(!hitokoto) return;
        
        // 优先使用服务端注入的数据 (SSR)
        if(window.__INITIAL_HITOKOTO__) {
            hitokoto.innerText = window.__INITIAL_HITOKOTO__;
            return; // 成功使用了注入数据，停止后续请求
        }

        const lastResort = "倚天照海花无数，流水高山心自知。";
        // 仅在没有服务端注入时才在前端请求
        fetch('https://v1.hitokoto.cn/?c=h&c=d&c=i&c=k&encode=json&charset=utf-8')
            .then(r => r.json())
            .then(d => {
                if(d && d.hitokoto) hitokoto.innerText = d.hitokoto + (d.from ? " ——《" + d.from + "》" : "");
                else throw new Error("Hitokoto format error");
            })
            .catch(() => {
                fetch('https://v2.jinrishici.com/sentence')
                    .then(r => r.json())
                    .then(d => {
                        if(d && d.data && d.data.content) hitokoto.innerText = d.data.content + " ——" + (d.data.origin ? "《" + d.data.origin.title + "》" : "");
                        else hitokoto.innerText = lastResort;
                    })
                    .catch(() => { hitokoto.innerText = lastResort; });
            });
    }

    function updateFavicon(theme) { }

    // 辅助：Base64 解码 (处理 UTF-8 字符)
    function decodeBase64(str) {
        try {
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        } catch(e) { return null; }
    }

    // 修复工具：自动修复被错误加上 c_ 前缀的分类数据
    function fixCategories(links, cats) {
        if (!links || !Array.isArray(links) || !cats) return;
        links.forEach(l => {
            // 如果分类名以 c_ 开头，且分类表中不存在该key，但存在去掉 c_ 后的key
            if(l.category && l.category.startsWith('c_') && !cats[l.category] && cats[l.category.substring(2)]) {
                l.category = l.category.substring(2);
            }
        });
    }

    // 新增：域名提取
    function extractDomain(url) {
        let domain;
        try {
            domain = new URL(url).hostname;
        } catch (e) {
            domain = url;
        }
        return domain;
    }

    // 新增：URL有效性检查 (兼容 Data URI)
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    async function loadLinks() { 
        // 优化：优先使用预注入数据 (Base64 Safe Hydration)
        if (window.__INITIAL_DATA_B64__ && !state.token) {
            const jsonStr = decodeBase64(window.__INITIAL_DATA_B64__);
            if (jsonStr) {
                try {
                    const res = JSON.parse(jsonStr);
                    if (res.categories) state.categories = res.categories;
                    state.publicLinks = res.links || [];
                    
                    // 执行数据自愈
                    fixCategories(state.publicLinks, state.categories);
                    
                    state.links = state.publicLinks;
                    renderSections(); updateUI(); updateCategoryButtons(); 
                    setTimeout(adjustOffset, 100); setTimeout(updateActiveCategory, 100);
                    return; 
                } catch(e) {}
            }
        }
        
        // 优化：使用常量 USER ID
        const res = await api('/api/getLinks?userId=' + CURRENT_USER_ID); 
        if (res.error === 'auth') return resetLogin(); if (res.categories) state.categories = res.categories; 
        
        // 执行数据自愈
        const allLinks = res.links || [];
        fixCategories(allLinks, state.categories);
        
        state.publicLinks = allLinks.filter(l=>!l.isPrivate); 
        state.privateLinks = allLinks.filter(l=>l.isPrivate); 
        state.links = state.isLoggedIn ? [...state.publicLinks, ...state.privateLinks] : state.publicLinks; 
        renderSections(); updateUI(); updateCategoryButtons(); setTimeout(adjustOffset, 100); setTimeout(updateActiveCategory, 100); 
    }

    function renderSections() {
        const c = el('sections-container'); c.innerHTML = '';
        Object.keys(state.categories).forEach(cat => {
            const links = state.links.filter(l=>l.category===cat);
            if(state.isAdmin || links.length > 0) {
                const sec = document.createElement('div'); sec.className = 'section'; sec.id = cat;
                const title = document.createElement('div'); title.className = 'section-title-container';
                let adminBtns = '';
                if(state.isEditMode) {
                    adminBtns = '<div class="section-controls">' +
                                '<button class="mini-btn btn-edit" title="重命名" onclick="editCategory(\\\'' + cat + '\\\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>' +
                                '<button class="mini-btn btn-del" title="删除" onclick="delCategory(\\\'' + cat + '\\\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>' +
                                '<button class="mini-btn btn-move" title="上移" onclick="moveCategory(\\\'' + cat + '\\\',-1)" style="font-size:16px; font-weight:bold; background-color: #5d7fb9;">⬆</button>' +
                                '<button class="mini-btn btn-move" title="下移" onclick="moveCategory(\\\'' + cat + '\\\',1)" style="font-size:16px; font-weight:bold; background-color: #5d7fb9;">⬇</button>' +
                                '</div>';
                }
                title.innerHTML = '<div class="section-title">' + cat + '</div>' + adminBtns;
                sec.appendChild(title);
                const cardCont = document.createElement('div'); cardCont.className = 'card-container'; cardCont.id = 'c_'+cat;
                // 优化：容器接收拖放，用于处理放置到空白区域的情况
                if(state.isAdmin) { 
                    cardCont.ondragover = e => { e.preventDefault(); };
                    cardCont.ondrop = e => { 
                        e.preventDefault();
                        // 如果是拖到容器空白处，则重新读取所有卡片生成顺序
                        // 实际的插入操作已在 dragOver 中完成
                        reorderLinksFromDOM();
                    };
                }
                links.forEach(l => createCard(l, cardCont));
                sec.appendChild(cardCont); c.appendChild(sec);
            }
        });
    }

    // 拖拽相关变量
    let draggedCard = null;

    function createCard(link, cont) {
        const card = document.createElement('div');
        card.className = 'card ' + (state.isEditMode ? 'no-hover' : '');
        card.draggable = state.isAdmin; 
        card.dataset.url = link.url; 
        card.style.setProperty('--card-index', cont.children.length);
        
        // 优化：图标显示逻辑
        const defaultIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';

        const cardTop = document.createElement('div');
        cardTop.className = 'card-top';

        const icon = document.createElement('img');
        icon.className = 'card-icon';
        
        // 核心逻辑：优先使用用户提供的 icon（支持 Base64 和 HTTP），否则使用 faviconextractor
        icon.src = (!link.icon || typeof link.icon !== 'string' || !link.icon.trim() || !isValidUrl(link.icon)) ?
            'https://www.faviconextractor.com/favicon/' + extractDomain(link.url) :
            link.icon;
        
        icon.alt = link.name;
        icon.loading = "lazy";
        icon.referrerPolicy = "no-referrer";
        
        // 优化：图标加载失败使用 Base64 常量，移除 Blob
        icon.onerror = function() {
            this.src = DEFAULT_ICON_BASE64;
            this.onerror = null; // 防止死循环
        };

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = link.name;

        cardTop.appendChild(icon);
        cardTop.appendChild(title);

        const urlDiv = document.createElement('div');
        urlDiv.className = 'card-url';
        urlDiv.textContent = link.url;

        card.appendChild(cardTop);
        card.appendChild(urlDiv);

        if (link.isPrivate) {
             const privateTag = document.createElement('div');
             privateTag.className = 'private-tag';
             privateTag.textContent = '私密';
             card.appendChild(privateTag);
        }
        
        const overlay = document.createElement('div'); overlay.className = 'card-click-overlay';
        // 调整：移除按钮的 onmousedown="event.stopPropagation()"，允许拖拽按钮区域进行移动
        overlay.innerHTML = '<div class="overlay-half left"><div class="action-btn-square btn-edit-card" onclick="event.stopPropagation();showLinkDialog(\\\'' + link.url + '\\\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></div></div><div class="overlay-half right"><div class="action-btn-square btn-del-card" onclick="event.stopPropagation();removeCard(\\\'' + link.url + '\\\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div></div>';
        card.appendChild(overlay);
        
        if(!state.isAdmin) { 
            card.onclick = () => window.open(link.url.startsWith('http')?link.url:'http://'+link.url, '_blank'); 
            card.onmousemove = e => showTooltip(e, link.tips); 
            card.onmouseleave = () => el('custom-tooltip').style.display = 'none'; 
        } else { 
            // 提取的拖拽逻辑：开始
            card.ondragstart = e => { 
                draggedCard = card;
                card.classList.add('dragging');
                e.dataTransfer.setData('text/plain', link.url); 
                e.dataTransfer.effectAllowed = "move"; 
            }; 
            
            // 提取的拖拽逻辑：移动中实时交换DOM位置
            card.ondragover = e => {
                e.preventDefault();
                const target = e.currentTarget; // 使用 currentTarget 确保获取到 .card
                if (target && target !== draggedCard && target.classList.contains('card')) {
                    const container = target.parentElement;
                    const mousePositionX = e.clientX;
                    const targetRect = target.getBoundingClientRect();

                    // 判断鼠标在目标卡片的左侧还是右侧
                    if (mousePositionX < targetRect.left + targetRect.width / 2) {
                        container.insertBefore(draggedCard, target);
                    } else {
                        container.insertBefore(draggedCard, target.nextSibling);
                    }
                }
            };

            card.ondragend = e => {
                if(draggedCard) {
                    draggedCard.classList.remove('dragging');
                    draggedCard = null;
                }
            };
            
            card.ondrop = e => { 
                e.preventDefault(); 
                e.stopPropagation();
                // 放置后，重新计算所有链接的顺序并保存
                reorderLinksFromDOM();
            };
        }
        cont.appendChild(card);
    }

    // 修复：根据DOM顺序重构数据并保存 (自动修正ID前缀)
    function reorderLinksFromDOM() {
        const newLinks = [];
        const containers = document.querySelectorAll('.card-container');
        
        containers.forEach(cont => {
            let catName = cont.id;
            // 关键修复：去除 'c_' 前缀，获取真实的分类名称
            if (catName.startsWith('c_')) {
                catName = catName.substring(2);
            }
            
            const cards = cont.querySelectorAll('.card');
            cards.forEach(card => {
                const url = card.dataset.url;
                const link = state.links.find(l => l.url === url);
                if (link) {
                    link.category = catName; // 更新为正确的分类名称
                    newLinks.push(link);
                }
            });
        });
        
        if(newLinks.length > 0) {
            state.links = newLinks;
            state.publicLinks = state.links.filter(l=>!l.isPrivate);
            state.privateLinks = state.links.filter(l=>l.isPrivate);
            // saveData(); // 移除自动保存，改为退出时统一保存
        }
    }

    function updateCategoryButtons() {
        const c = el('category-buttons-container');
        c.innerHTML = '';
        const cats = Object.keys(state.categories);
        if(!cats.length) { c.style.display='none'; return; }
        c.style.display='flex';
        cats.forEach(cat => {
            const hasLinks = state.links.some(l => l.category === cat);
            if (!hasLinks && !state.isAdmin) return;
            const btn = document.createElement('button');
            btn.className = 'category-button';
            btn.textContent = cat;
            btn.onclick = () => {
                const searchInput = el('bookmark-search-input');
                if(searchInput && searchInput.value) { searchInput.value = ''; renderSections(); }
                setTimeout(() => {
                    const section = el(cat);
                    if(section) {
                        document.querySelectorAll('.category-button').forEach(b=>b.classList.remove('active'));
                        btn.classList.add('active');
                        const headerHeight = document.querySelector('.fixed-elements').offsetHeight;
                        const targetPos = section.offsetTop - headerHeight - 15;
                        window.scrollTo({ top: targetPos, behavior: 'smooth' });
                    }
                }, 10);
            };
            c.appendChild(btn);
        });
        setTimeout(adjustOffset, 50);
    }

    async function handleAdminBtnClick() { if (state.isAdmin) { el('general-dialog-title').textContent = '提示'; el('general-dialog-content').textContent = '是否要保存您在设置模式中所做的修改？'; el('general-dialog-input').style.display='none'; el('general-cancel').style.display='inline-block'; el('general-cancel').textContent='不保存'; el('general-confirm').textContent='保存'; showDialog('general-dialog'); const ok = el('general-confirm'), cancel = el('general-cancel'); const nOk = ok.cloneNode(true), nCancel = cancel.cloneNode(true); ok.parentNode.replaceChild(nOk, ok); cancel.parentNode.replaceChild(nCancel, cancel); nOk.onclick = async () => { hideDialog('general-dialog'); await saveData(); state.isAdmin = false; state.isEditMode = false; updateUI(); renderSections(); customAlert('设置已保存'); }; nCancel.onclick = () => { hideDialog('general-dialog'); state.isAdmin = false; state.isEditMode = false; updateUI(); loadLinks(); customAlert('已放弃修改'); }; } else { if(!await validateToken()) return; showLoading('正在进入设置模式...'); try { 
        // 优化：使用常量 USER ID
        await api('/api/backupData', 'POST', {sourceUserId: CURRENT_USER_ID}); } catch(e){} hideLoading(); state.isAdmin = true; state.isEditMode = true; updateUI(); renderSections(); updateCategoryButtons(); } }
    
    function updateUI() { const loginBtn = el('login-btn'); const adminBtn = el('admin-btn'); if (state.isLoggedIn) { loginBtn.textContent = '退出登录'; loginBtn.style.display = 'inline-block'; adminBtn.style.display = 'inline-block'; adminBtn.textContent = state.isAdmin ? '离开设置' : '设置'; } else { loginBtn.textContent = '登录'; loginBtn.style.display = 'inline-block'; adminBtn.style.display = 'none'; } document.querySelector('.add-remove-controls').style.display = state.isAdmin ? 'flex' : 'none'; if(state.isAdmin) document.body.classList.add('admin-mode'); else document.body.classList.remove('admin-mode'); const s = el('category-select'); if(s) { s.innerHTML=''; Object.keys(state.categories).forEach(k=>s.add(new Option(k,k))); } setTimeout(adjustOffset, 50); }
    
    // 修复：showLinkDialog 清空候选图标
    function showLinkDialog(url=null) { 
        el('link-dialog-title').textContent = url ? '编辑链接' : '添加链接'; 
        el('link-old-url').value = url || ''; 
        const l = url ? state.links.find(i=>i.url===url) : {}; 
        el('name-input').value = l.name||''; 
        el('url-input').value = l.url||''; 
        el('tips-input').value = l.tips||''; 
        el('icon-input').value = l.icon||''; 
        el('category-select').value = l.category || Object.keys(state.categories)[0]; 
        el('private-checkbox').checked = l.isPrivate||false; 
        showDialog('link-dialog'); 
    }

    // 修复：原地更新链接数据，防止位置跳变
    async function saveLinkFromDialog() { 
        const old = el('link-old-url').value; 
        const n = { 
            name: el('name-input').value.trim(), 
            url: el('url-input').value.trim(), 
            tips: el('tips-input').value.trim(), 
            icon: el('icon-input').value.trim(), 
            category: el('category-select').value, 
            isPrivate: el('private-checkbox').checked 
        }; 
        
        if(!n.name || !n.url) return customAlert('名称和URL必填'); 
        
        // 优化：使用常量 USER ID
        const savePayload = {
            userId: CURRENT_USER_ID,
            // ... 其他字段
        };

        if(old) {
            // 编辑模式：找到原索引原地替换
            const idx = state.links.findIndex(l => l.url === old);
            if (idx !== -1) {
                state.links[idx] = n;
            }
        } else {
            // 新增模式：查重后追加
            if(state.links.some(l=>l.url===n.url)) return customAlert('URL已存在'); 
            state.links.push(n); 
        }
        
        // 确保分类存在
        if(!state.categories[n.category]) state.categories[n.category]=[]; 
        
        // 重新派生子数组
        state.publicLinks = state.links.filter(l=>!l.isPrivate); 
        state.privateLinks = state.links.filter(l=>l.isPrivate); 
        
        renderSections(); 
        hideDialog('link-dialog'); 
    }

    async function removeCard(url) { if(await customConfirm('确定删除吗？删除后点击保存生效。')) { state.links = state.links.filter(l=>l.url!==url); state.publicLinks = state.links.filter(l=>!l.isPrivate); state.privateLinks = state.links.filter(l=>l.isPrivate); renderSections(); } }
    async function addCategory() { const n = await customPrompt('新分类名称'); if(n) { if(state.categories[n]) return customAlert('分类已存在'); state.categories[n] = []; renderSections(); updateCategoryButtons(); updateUI(); } }
    async function editCategory(old) { const n = await customPrompt('重命名分类', old); if(n && n!==old) { if(state.categories[n]) return customAlert('分类已存在'); const nc = {}; Object.keys(state.categories).forEach(k=>{ if(k===old) nc[n]=state.categories[old]; else nc[k]=state.categories[k]}); state.categories = nc; state.links.forEach(l=>{ if(l.category===old) l.category=n; }); renderSections(); updateCategoryButtons(); updateUI(); } }
    async function delCategory(n) { if(await customConfirm('删除分类及所有链接？')) { delete state.categories[n]; state.links = state.links.filter(l=>l.category!==n); state.publicLinks = state.links.filter(l=>!l.isPrivate); state.privateLinks = state.links.filter(l=>l.isPrivate); renderSections(); updateCategoryButtons(); updateUI(); } }
    function moveCategory(n, d) { const k = Object.keys(state.categories); const i = k.indexOf(n); if(i+d>=0 && i+d<k.length) { const t=k[i]; k[i]=k[i+d]; k[i+d]=t; const nc={}; k.forEach(x=>nc[x]=state.categories[x]); state.categories=nc; renderSections(); updateCategoryButtons(); updateUI(); } }
    // 优化：使用常量 USER ID
    async function saveData() { showLoading('保存...'); await api('/api/saveOrder', 'POST', {userId: CURRENT_USER_ID, links:state.links, categories:state.categories}); hideLoading(); renderSections(); }
    async function validateToken() { if(!state.token) return false; const res = await api('/api/getLinks?userId=' + CURRENT_USER_ID); return res.error !== 'auth'; }
    function handleLoginClick() { if(state.isLoggedIn) customConfirm('确定要退出登录？').then(y=>{if(y) resetLogin()}); else { showDialog('login-modal'); el('login-password').value=''; setTimeout(()=>el('login-password').focus(),100); } }
    function resetLogin() { state.token=null; localStorage.removeItem('authToken'); state.isLoggedIn=false; state.isAdmin=false; state.isEditMode=false; loadLinks(); }
    async function performLogin() { const p = el('login-password').value; if(!p) return; showLoading('登录...'); const res = await api('/api/verifyPassword', 'POST', {password:p}); hideLoading(); if(res.valid) { state.token=res.token; localStorage.setItem('authToken', res.token); state.isLoggedIn=true; state.isAdmin=false; hideDialog('login-modal'); customAlert('登录成功'); loadLinks(); } else customAlert('密码错误'); }
    function exportBookmarks() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(state.links,null,2)],{type:'application/json'})); a.download = 'bookmarks-' + new Date().toISOString().slice(0,10) + '.json'; a.click(); }
    function handleImportClick() { const i = document.createElement('input'); i.type='file'; i.accept='.json'; i.onchange = e => { const f = e.target.files[0]; if(!f) return; const r = new FileReader(); r.onload = async evt => { try { const l = JSON.parse(evt.target.result); l.forEach(x=>{ if(!state.categories[x.category]) state.categories[x.category]=[]; const idx = state.links.findIndex(k=>k.url===x.url); if(idx>=0) state.links[idx]=x; else state.links.push(x); }); await saveData(); customAlert('导入成功'); } catch(e) { customAlert('格式错误'); } }; r.readAsText(f); }; i.click(); }
    async function showBackupManager() { if(!await validateToken()) return; showDialog('backup-modal'); const c = el('backup-list-container'); c.innerHTML = '<div style="padding:20px;text-align:center;color:#888">加载中...</div>'; const l = await api('/api/listBackups'); c.innerHTML = ''; if(Array.isArray(l) && l.length) { l.sort((a, b) => b.localeCompare(a)); const format = (k) => { const s = k.replace('backup_', ''); if (s.length >= 15) { return s.substring(0, 4) + '-' + s.substring(4, 6) + '-' + s.substring(6, 8) + ' ' + s.substring(9, 11) + ':' + s.substring(11, 13) + ':' + s.substring(13, 15); } return s; }; el('last-backup-time').textContent = '最新：📅 ' + format(l[0]); l.forEach(k => { const d = document.createElement('div'); d.className = 'backup-item'; const name = document.createElement('span'); name.textContent = '📅 ' + format(k); const act = document.createElement('div'); act.className = 'backup-actions'; const res = document.createElement('a'); res.className = 'restore-link'; res.textContent = '从此节点恢复'; res.onclick = () => restoreBackup(k); const del = document.createElement('span'); del.className = 'trash-icon'; del.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'; del.onclick = () => deleteBackup(k); act.appendChild(res); act.appendChild(del); d.appendChild(name); d.appendChild(act); c.appendChild(d); }); } else { c.innerHTML = '<div style="padding:20px;text-align:center;color:#888">暂无备份</div>'; el('last-backup-time').textContent = '暂无备份'; } }
    async function handleManualBackup() { if(await customConfirm('创建新备份？')) { showLoading('备份...'); await api('/api/backupData', 'POST', {sourceUserId:'testUser'}); hideLoading(); showBackupManager(); } }
    async function restoreBackup(id) { if(await customConfirm('确定恢复？当前未保存修改将丢失。')) { showLoading('恢复...'); const r = await api('/api/restoreFromBackup', 'POST', {userId:'testUser', backupId:id}); hideLoading(); if(r.success) { hideDialog('backup-modal'); loadLinks(); customAlert('成功'); } else customAlert('失败'); } }
    async function deleteBackup(id) { if(await customConfirm('删除此备份？')) { showLoading('删除...'); await api('/api/deleteBackup', 'POST', {backupId:id}); hideLoading(); showBackupManager(); } }
    function toggleBookmarkSearch() { const dd = el('bookmark-search-dropdown'); dd.classList.toggle('show'); if(dd.classList.contains('show')) { const i = el('bookmark-search-input'); i.focus(); i.oninput = e => { const q = e.target.value.toLowerCase(); if(!q) return renderSections(); el('sections-container').innerHTML = '<div class="section"><div class="card-container" id="s-res"></div></div>'; const c = el('s-res'); state.links.filter(l=>l.name.toLowerCase().includes(q)).forEach(l=>createCard(l,c)); } } else renderSections(); }
    window.onclick = function(e) {
        if (!e.target.closest('.bookmark-search-toggle')) {
            const dd = el('bookmark-search-dropdown');
            const toggle = document.querySelector('.bookmark-search-toggle');
            if (dd && dd.classList.contains('show')) { dd.classList.remove('show'); renderSections(); }
        }
    }
    function showTooltip(e,t) { if(!t) return; const tt=el('custom-tooltip'); tt.textContent=t; tt.style.display='block'; const offset = 15; let x = e.clientX + offset; let y = e.clientY + offset; const rect = tt.getBoundingClientRect(); if(x + rect.width > window.innerWidth) x = e.clientX - rect.width - 5; if(y + rect.height > window.innerHeight) y = e.clientY - rect.height - 5; tt.style.left = x + 'px'; tt.style.top = y + 'px'; }
    function toggleTheme() { const d = document.body.classList.toggle('dark-theme'); localStorage.setItem('theme', d?'dark':'light'); }
    function scrollToTop() { window.scrollTo({ top:0, behavior:'smooth' }); }
    function updateActiveCategory() { const sections = document.querySelectorAll('.section'); if (!sections.length) return; const header = document.querySelector('.fixed-elements'); const headerHeight = header ? header.offsetHeight : 0; const triggerPoint = window.scrollY + headerHeight + 20; let currentId = ''; sections.forEach(section => { const sectionTop = section.offsetTop; if (sectionTop <= triggerPoint) { currentId = section.id; } }); if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) { if(sections.length) currentId = sections[sections.length - 1].id; } const buttons = document.querySelectorAll('.category-button'); buttons.forEach(btn => { if (btn.textContent === currentId) { btn.classList.add('active'); } else { btn.classList.remove('active'); } }); }
    
    // 优化：图标选择 + onblur 触发 + 无防抖 + 自动填充候选
    async function autoFillTitle() {
        let u = el('url-input').value.trim();
        const n = el('name-input');
        const i = el('icon-input'); 
        
        if(!u) return;
        if(!new RegExp('^https?://', 'i').test(u)) u = 'https://' + u;

        if(u && u.startsWith('http')) {
            const confirmBtn = el('link-confirm-btn');
            const originalPlaceholder = n.placeholder;
            if(!n.value) {
                n.placeholder='正在获取标题...';
                if(confirmBtn) { confirmBtn.disabled = true; confirmBtn.style.opacity = '0.6'; }
            }
            
            try {
                const r = await api('/api/getTitle?url='+encodeURIComponent(u) + '&t=' + Date.now());
                let finalTitle = r.title;
                const errorKeywords = ['出错啦', '403 Forbidden', 'Access Denied', 'Security Check', '禁止访问', '网站防火墙', 'Just a moment'];
                
                if (!finalTitle || new RegExp('^https?://', 'i').test(finalTitle) || errorKeywords.some(k => finalTitle.includes(k))) {
                    try { finalTitle = new URL(u).hostname; } catch(e) { finalTitle = '新链接'; }
                }
                if(!n.value) n.value = finalTitle;
                
                // 优化：直接填充图标，不生成候选
                if(r.icon) i.value = r.icon;

            } finally {
                n.placeholder = originalPlaceholder;
                if(confirmBtn) { confirmBtn.disabled = false; confirmBtn.style.opacity = '1'; }
            }
        }
    }

    window.addEventListener('scroll', () => { el('back-to-top-btn').style.display = window.scrollY > 300 ? 'flex' : 'none'; updateActiveCategory(); });
    window.addEventListener('load', updateActiveCategory); window.addEventListener('resize', updateActiveCategory);

    document.addEventListener('DOMContentLoaded', async () => {
        if(localStorage.getItem('theme')==='dark') { document.body.classList.add('dark-theme'); updateFavicon('dark'); }
        if(await validateToken()) { state.isLoggedIn=true; updateUI(); }
        loadLinks();
        setTimeout(fetchHitokoto, 100); 
    });
    </script>
</body>
</html>
`;

// ============================================================
// 2. 后端 Worker 逻辑
// ============================================================

/**
 * 辅助函数：安全比较字符串（防止时序攻击）
 */
function safeCompare(a, b) {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
}

/**
 * 辅助函数：统一 JSON 响应格式
 */
const jsonRes = (data, status = 200) => new Response(JSON.stringify(data), {
    status,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
    }
});

/**
 * 辅助函数：权限验证
 */
async function auth(req, env, requireAdmin = false) {
    const token = req.headers.get('Authorization');
    if (!token) return { ok: false, err: '未登录' };

    try {
        const [ts, hash] = token.split('.');
        // 校验 Token 有效期 (30天)
        if (Date.now() - parseInt(ts) > 30 * 24 * 3600 * 1000) {
            return { ok: false, err: 'Token过期' };
        }

        const data = new TextEncoder().encode(ts + "_" + env.ADMIN_PASSWORD);
        const digest = await crypto.subtle.digest('SHA-256', data);
        const expected = btoa(String.fromCharCode(...new Uint8Array(digest)));

        if (!safeCompare(hash, expected)) {
            return { ok: false, err: '无效Token' };
        }
        return { ok: true };
    } catch {
        return { ok: false, err: '验证异常' };
    }
}

/**
 * 辅助函数：服务端获取一言 (SSR)
 */
async function fetchHitokotoServer() {
    try {
        const res = await fetch('https://v1.hitokoto.cn/?c=h&c=d&c=i&c=k&encode=json&charset=utf-8', {
            headers: { 'User-Agent': 'FlowTab-Server-Worker' },
            cf: { cacheTtl: 60, cacheEverything: true } // 缓存60秒
        });
        if (res.ok) {
            const d = await res.json();
            return d.hitokoto + (d.from ? " ——《" + d.from + "》" : "");
        }
    } catch (e) {}
    return null;
}

/**
 * 辅助函数：Base64 编码 (用于安全注入数据)
 */
function encodeBase64(str) {
    try {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    } catch (e) {
        return "";
    }
}

// User ID 常量
const DEFAULT_USER = 'testUser';

export default {
    async fetch(req, env, ctx) {
        const url = new URL(req.url);
        const path = url.pathname;

        // CORS 处理 (OPTIONS 请求)
        if (req.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Access-Control-Max-Age": "86400"
                },
            });
        }

        // ============================================================
        // 3. 首页渲染 (SSR)
        // ============================================================
        if (path === '/') {
            // 并行获取数据和一言
            const tasks = [
                env.CARD_ORDER.get(DEFAULT_USER).catch(() => null),
                fetchHitokotoServer()
            ];
            const [rawUserData, hitokotoText] = await Promise.all(tasks);

            let inject = '<script>window.__INITIAL_DATA_B64__=null;window.__INITIAL_HITOKOTO__=null;</script>';
            let scriptParts = [];

            // 注入用户数据 (仅公开部分)
            if (rawUserData) {
                try {
                    const data = JSON.parse(rawUserData);
                    const publicData = {
                        links: (data.links || []).filter(l => !l.isPrivate),
                        categories: data.categories || {}
                    };
                    scriptParts.push(`window.__INITIAL_DATA_B64__="${encodeBase64(JSON.stringify(publicData))}";`);
                } catch (e) {}
            }

            // 注入一言数据
            if (hitokotoText) {
                const safeText = hitokotoText.replace(/"/g, '\\"');
                scriptParts.push(`window.__INITIAL_HITOKOTO__="${safeText}";`);
            }

            if (scriptParts.length > 0) {
                inject = `<script>${scriptParts.join('')}</script>`;
            }

            return new Response(HTML_CONTENT.replace('<!--INJECT_DATA-->', inject), {
                headers: {
                    'Content-Type': 'text/html',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            });
        }

        // ============================================================
        // 4. 获取网页标题和图标 (HTMLRewriter)
        // ============================================================
        if (path === '/api/getTitle') {
            const u = url.searchParams.get('url');
            if (!u) return jsonRes({ title: '', icon: '' });

            // 缓存处理
            const cacheUrl = new URL(req.url);
            const cacheKey = new Request(cacheUrl.toString(), req);
            const cache = caches.default;
            let response = await cache.match(cacheKey);

            if (!response) {
                try {
                    const res = await fetch(u, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                        },
                        redirect: 'follow'
                    });

                    if (!res.ok) return jsonRes({ title: '', icon: '' });

                    let title = '';
                    let icon = '';

                    // 流式解析 HTML
                    const rewriter = new HTMLRewriter()
                        .on('title', {
                            text(text) {
                                if (title.length < 100) title += text.text;
                            }
                        })
                        .on('link[rel~="icon"]', {
                            element(element) {
                                if (!icon) icon = element.getAttribute('href');
                            }
                        })
                        .on('link[rel~="shortcut icon"]', {
                            element(element) {
                                if (!icon) icon = element.getAttribute('href');
                            }
                        });

                    const transformed = rewriter.transform(res);
                    await transformed.text(); // 消费流以触发解析

                    if (title) title = title.trim().replace(/[\r\n]+/g, ' ');
                    if (icon && !icon.startsWith('http')) {
                        try { icon = new URL(icon, u).href; } catch (e) {}
                    }

                    const data = { title, icon };
                    response = jsonRes(data);

                    // 写入缓存 (24小时)
                    response.headers.set('Cache-Control', 'public, max-age=86400');
                    ctx.waitUntil(cache.put(cacheKey, response.clone()));
                } catch (e) {
                    return jsonRes({ title: '', icon: '' });
                }
            }
            return response;
        }

        // ============================================================
        // 5. 登录/密码验证
        // ============================================================
        if (path === '/api/verifyPassword' && req.method === 'POST') {
            const { password } = await req.json();
            if (password !== env.ADMIN_PASSWORD) return jsonRes({ valid: false }, 403);

            const ts = Date.now();
            const data = new TextEncoder().encode(ts + "_" + password);
            const hash = await crypto.subtle.digest('SHA-256', data);
            const token = ts + "." + btoa(String.fromCharCode(...new Uint8Array(hash)));

            return jsonRes({ valid: true, token });
        }

        // ============================================================
        // 6. 获取链接数据 (区分权限)
        // ============================================================
        if (path === '/api/getLinks') {
            const userId = url.searchParams.get('userId');
            const raw = await env.CARD_ORDER.get(userId);
            const data = raw ? JSON.parse(raw) : { links: [], categories: {} };

            const check = await auth(req, env);
            if (check.ok) return jsonRes(data); // 管理员返回全部数据

            // 访客仅返回公开数据
            return jsonRes({
                links: data.links.filter(l => !l.isPrivate),
                categories: data.categories
            });
        }

        // ============================================================
        // 鉴权拦截 (以下接口均需登录)
        // ============================================================
        const check = await auth(req, env);
        if (!check.ok) return jsonRes({ error: check.err }, 401);

        try {
            // 7. 保存数据
            if (path === '/api/saveOrder' && req.method === 'POST') {
                const { userId, links, categories } = await req.json();
                await env.CARD_ORDER.put(userId, JSON.stringify({ links, categories }));
                return jsonRes({ success: true });
            }

            // 8. 创建备份
            if (path === '/api/backupData' && req.method === 'POST') {
                const { sourceUserId } = await req.json();
                const data = await env.CARD_ORDER.get(sourceUserId);
                if (!data) return jsonRes({ success: false, message: '无数据' });

                const d = new Date(new Date().getTime() + 8 * 3600 * 1000); // UTC+8
                const backupId = 'backup_' + d.toISOString().replace(/[-:]/g, '').slice(0, 15);

                await env.CARD_ORDER.put(backupId, data);

                // 保留最近 10 个备份
                const list = await env.CARD_ORDER.list({ prefix: 'backup_' });
                const keys = list.keys.map(k => k.name).sort().reverse();
                if (keys.length > 10) {
                    await Promise.all(keys.slice(10).map(k => env.CARD_ORDER.delete(k)));
                }
                return jsonRes({ success: true });
            }

            // 9. 获取备份列表
            if (path === '/api/listBackups') {
                const list = await env.CARD_ORDER.list({ prefix: 'backup_' });
                return jsonRes(list.keys.map(k => k.name));
            }

            // 10. 从备份恢复
            if (path === '/api/restoreFromBackup' && req.method === 'POST') {
                const { userId, backupId } = await req.json();
                const data = await env.CARD_ORDER.get(backupId);
                if (data) await env.CARD_ORDER.put(userId, data);
                return jsonRes({ success: !!data });
            }

            // 11. 删除备份
            if (path === '/api/deleteBackup' && req.method === 'POST') {
                const { backupId } = await req.json();
                await env.CARD_ORDER.delete(backupId);
                return jsonRes({ success: true });
            }

        } catch (e) {
            return jsonRes({ success: false, message: e.message }, 500);
        }

        return new Response('Not Found', { status: 404 });
    }
};
