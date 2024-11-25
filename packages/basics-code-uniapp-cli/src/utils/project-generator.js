import path from 'path';
import { fileURLToPath } from 'url';
import download from 'download-git-repo';
import ora from 'ora';
import { promisify } from 'util';
import { updateJsonFile } from './file-utils.js';

const downloadRepo = promisify(download);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_REPO = {
  default: 'direct:https://gitee.com/1145122681/basics-c0de_uniapp#master',
  tailwind: 'direct:https://gitee.com/1145122681/basics-c0de_uniapp#tailwind'
};

export async function generateProject(projectName, options) {
  const targetDir = path.join(process.cwd(), projectName);
  const spinner = ora('正在下载模板...').start();

  try {
    const template = options.useTailwindcss ? TEMPLATE_REPO.tailwind : TEMPLATE_REPO.default;

    await downloadRepo(template, targetDir, { clone: true });

    spinner.succeed('模板下载完成');

    // 更新项目配置
    const manifestPath = path.join(targetDir, 'manifest.json');
    await updateJsonFile(manifestPath, {
      name: projectName,
      appid: '' // 清空 appid，避免冲突
    });

    const pkgPath = path.join(targetDir, 'package.json');
    await updateJsonFile(pkgPath, {
      name: projectName,
      version: '1.0.0',
      description: `${projectName} created by basics-code-cli`
    });

    console.log('\n✨ 项目创建成功！');
    console.log(`\n📁 项目位置: ${targetDir}`);

    if (options.useTailwindcss) {
      console.log('\n📦 请执行以下命令安装依赖:');
      console.log(`  cd ${projectName}`);
      console.log('  npm install');
    }

    console.log('\n🚀 现在您可以:');
    console.log('1. 使用 HBuilderX 导入项目');
    console.log('2. 点击重新获取 manifest.json 中的 appid');
    console.log('3. 开始开发您的应用\n');

  } catch (err) {
    spinner.fail('下载模板失败');
    console.error('错误详情:', err);
    process.exit(1);
  }
}