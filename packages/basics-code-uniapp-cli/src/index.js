#!/usr/bin/env node

import { program } from 'commander';
import { createProject } from './commands/create.js';

program
  .version('1.0.0')
  .description('一个用于生成uniapp模板项目的CLI工具');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  createProject();
}
