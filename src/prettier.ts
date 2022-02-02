import path, { dirname } from 'path';
import { Listr } from 'listr2'
import { execa, execaSync } from '@marchyang/execa'
import fs from 'fs';
import editorTask from './editor.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>([
  {
    title: 'init prettier',
    task: () => {
      return execa('npm', ['install', '-D', 'prettier',])
    }
  },
  {
    title: 'copy .prettierrc file',
    task: () => {
      return execa('cp', [path.resolve(__dirname, './template/.prettierrc'), process.cwd()])
    }
  },
  {
    title: 'copy .editor config file',
    task: () => {
      return editorTask;
    }
  },


]);

export default tasks;