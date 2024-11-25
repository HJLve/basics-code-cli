#!/usr/bin/env node

import { program } from 'commander';
import { createProject } from './commands/create.js';

async function run() {
  try {
    program
      .version('0.0.1')
      .description('基于 HbuilderX 的 uniapp 项目模板生成器')
      .action(createProject);

    program.parse(process.argv);

  } catch (err) {
    console.error('创建项目时发生错误:', err);
    process.exit(1);
  }
}

run();
