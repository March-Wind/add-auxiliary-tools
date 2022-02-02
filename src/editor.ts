import { Listr } from 'listr2'
import { execa, execaSync } from '@marchyang/execa'
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import chalk from 'chalk';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const jest_config_in_eslint = {
  files: ["__tests__/**/*.test.ts", "__tests__/**/*.test.js"],
  "plugins": ["jest"],
  extends: ["plugin:jest/recommended"],
  "parserOptions": {
    'jest/globals': true,
  }
}

interface Ctx {
  /* some variables for internal use */
}
const tasks = new Listr<Ctx>([
  {
    title: "copy editor config file",
    task: () => {
      return execa('cp', [path.resolve(__dirname, './template/.editorConfig'), process.cwd()])
    }
  }
])

export default tasks;