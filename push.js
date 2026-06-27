import { execSync } from 'child_process';

// ================== 【基础配置】 ==================
const REPO_URL = 'https://github.com/wliuy/FlowTab.git';
const BRANCH = 'main';

// 🚀 网络护航：如果你在国内终端 push 卡住，请将下面改为 true，并确保端口与你代理软件一致
const USE_PROXY = true; 
const PROXY_URL = 'http://127.0.0.1:7890'; 
// ==================================================

function runCmd(cmd, description) {
    try {
        console.log(`\n[执行中] ${description}...`);
        // stdio: 'inherit' 可以直接在控制台实时看到 git 的原生进度和输出
        execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
        console.error(`\n❌ [失败] ${description} 发生错误，终止运行。`);
        process.exit(1);
    }
}

(async () => {
    console.log('=============== 🚀 开始全自动 Git 推送 ===============');

    // 1. 如果检测到没有初始化 git，全自动帮补上
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    } catch (e) {
        runCmd('git init', '检测到未初始化，正在初始化本地 Git 仓库');
        runCmd(`git remote add origin ${REPO_URL}`, '关联远程 GitHub 仓库');
        runCmd(`git branch -M ${BRANCH}`, `创建并切换到主分支 [${BRANCH}]`);
    }

    // 2. 动态接管终端代理，防止网络连接超时
    if (USE_PROXY) {
        console.log(`\n[配置] 已开启终端代理加速: ${PROXY_URL}`);
        execSync(`git config --local http.proxy ${PROXY_URL}`);
        execSync(`git config --local https.proxy ${PROXY_URL}`);
    } else {
        // 关闭本地代理配置，避免污染
        try {
            execSync('git config --local --unset http.proxy', { stdio: 'ignore' });
            execSync('git config --local --unset https.proxy', { stdio: 'ignore' });
        } catch (e) {}
    }

    // 3. 执行标准的暂存与自动化提交
    runCmd('git add .', '将所有本地修改加入暂存区');

    // 自动生成带当前时间戳的提交日志，免去起名字的烦恼
    const currentTime = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const commitMessage = `自动同步: ${currentTime}`;
    runCmd(`git commit -m "${commitMessage}"`, `提交到本地仓库 [${commitMessage}]`);

    // 4. 彻底推送到云端
    runCmd(`git push -u origin ${BRANCH}`, `正在推送到 GitHub [${BRANCH}] 分支`);

    console.log('\n=============== 🎉 恭喜！全自动推送已完美成功 ===============');
    console.log('💡 Cloudflare 后台现在应该已经感知到更新，正在自动为你构建 Worker...');
})();