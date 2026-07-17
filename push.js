/**
 * FlowTab - Git 自动化推送脚本
 * 用途：针对 FlowTab 项目，一键完成本地修改到 GitHub 的同步
 * 适配：已适配 ESM 模式 (Type: module)
 * 使用方法：在终端运行 `node push.js`
 */

import { execSync } from 'child_process';
import fs from 'fs';

// --- 配置区域 ---
const CONFIG = {
  // 核心：已更新为 FlowTab 的仓库地址
  remoteUrl: 'https://github.com/wliuy/FlowTab.git', 
  branch: 'main', 
  commitMsg: 'fix: 恢复onblur自动填充，编辑链接时分割标题不被覆盖' // 你可以根据需要修改这次的提交文案
};

function run(command) {
  try {
    console.log(`\x1b[36m正在执行: ${command}\x1b[0m`);
    // 执行命令并将结果实时输出到控制台
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    // 捕获异常，但不中断后续简单的逻辑
    return false;
  }
  return true;
}

async function start() {
  console.log('\x1b[33m🚀 开始执行 FlowTab 自动化推送...\x1b[0m\n');

  // 🛡️ 安全防御：全自动检查并补齐 .gitignore，防止臃肿的 node_modules 污染 GitHub
  const ignoreContent = 'node_modules/\n.wrangler/\n';
  if (!fs.existsSync('.gitignore')) {
    fs.writeFileSync('.gitignore', ignoreContent);
    console.log('\x1b[32m已自动为你创建并配置 .gitignore（过滤 node_modules 缓存）\x1b[0m');
  } else {
    const currentIgnore = fs.readFileSync('.gitignore', 'utf8');
    if (!currentIgnore.includes('node_modules/')) {
      fs.appendFileSync('.gitignore', `\n${ignoreContent}`);
      console.log('\x1b[32m已在现有的 .gitignore 中追加过滤依赖项规则\x1b[0m');
    }
  }

  // 1. 检查并初始化 Git
  if (!fs.existsSync('.git')) {
    console.log('检测到尚未初始化 Git，正在初始化...');
    run('git init');
  }

  // 🌟 核心修复：强制校准本地分支名
  run(`git branch -M ${CONFIG.branch}`);

  // 2. 尝试添加远程仓库地址
  // 如果已存在会提示 error，脚本会自动跳过
  run(`git remote add origin ${CONFIG.remoteUrl}`);

  // 3. 添加所有文件
  run('git add .');

  // 4. 提交
  console.log('正在创建提交记录...');
  try {
    // 使用双引号包裹，防止 Windows 命令行解析特殊字符出错
    execSync(`git commit -m "${CONFIG.commitMsg}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log('\x1b[32m提示：没有检测到新改动，无需提交。\x1b[0m');
  }

  // 5. 推送
  console.log(`\n\x1b[35m正在推送到 GitHub (${CONFIG.branch})...\x1b[0m`);
  
  // 使用 -f (强制) 推送，确保云端与本地完全一致
  const success = run(`git push -f origin ${CONFIG.branch}`);

  if (success) {
    console.log('\n\x1b[32m🎉 推送成功！Cloudflare Workers 应该已经开始自动抓取更新了。\x1b[0m');
  } else {
    console.log('\n\x1b[31m❌ 推送失败。\x1b[0m');
    console.log('\x1b[33m💡 温馨提示：如果遇到连接超时，请检查你的代理设置，可尝试在 VS Code 终端手动执行一次：\x1b[0m');
    console.log('git config --global http.proxy http://127.0.0.1:7890\n');
  }
}

start();