import path from 'path';
import { fileURLToPath } from 'url';
import { copyTemplate, updateJsonFile } from './file-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateProject(projectName, options) {
  const templateDir = path.join(__dirname, '..', '..', 'templates', options.useTailwindcss ? 'with-tailwindcss' : 'default');
  const targetDir = path.join(process.cwd(), projectName);

  try {
    await copyTemplate(templateDir, targetDir);

    const manifestPath = path.join(targetDir, 'manifest.json');
    await updateJsonFile(manifestPath, { name: projectName });

    const pkgPath = path.join(targetDir, 'package.json');
    await updateJsonFile(pkgPath, { name: projectName });

    console.log(`项目 ${projectName} 已成功创建!`);
  } catch (err) {
    console.error('生成项目时发生错误:', err);
  }
}