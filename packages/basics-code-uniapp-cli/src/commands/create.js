import inquirer from 'inquirer';
import { generateProject } from '../utils/project-generator.js';

export async function createProject() {
    console.log('欢迎使用uniapp项目生成器!');
    console.log('请回答以下问题来配置您的项目：');

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称：',
            validate: input => input.trim() !== '' || '项目名称不能为空'
        },
        {
            type: 'confirm',
            name: 'useTailwindcss',
            message: '是否使用Tailwindcss?',
            default: true
        }
        // 可以根据需要添加更多问题
    ]);

    console.log('\n正在根据您的选择创建项目...');

    await generateProject(answers.projectName, answers);

    console.log(`\n✨ 项目 ${answers.projectName} 已成功创建!`);
    console.log('\n接下来您可以导入HbuilderX使用');

    if (answers.useTailwindcss) {
        console.log('\n不要忘记 npm install 哦');
    }
}
