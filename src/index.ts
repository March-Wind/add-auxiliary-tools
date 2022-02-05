import { Listr } from 'listr2'
import { execa, execaSync } from '@marchyang/execa'
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import chalk from 'chalk';
import eslintTask from './eslint.js'
import pettierTask from './prettier.js'
import jestTask from './jest.js';
import commitLintTask from './commit.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const vscode = {
//   "eslint.validate": [
//     "javascript",
//     "javascriptreact",
//     "typescript"
//   ],
//   "editor.formatOnSave": true,
//   "editor.codeActionsOnSave": {
//     "source.fixAll.eslint": true
//   },
//   "editor.tabSize": 2,
//   "eslint.options": {
//     "overrideConfigFile": ".eslintrc.js", // 新版本是overrideConfigFile，旧版本是configFile
//   }
// }
// const jest_config_in_eslint = {
//   files: ["__tests__/**/*.test.ts", "__tests__/**/*.test.js"],
//   "plugins": ["jest"],
//   extends: ["plugin:jest/recommended"],
//   "parserOptions": {
//     'jest/globals': true,
//   }
// }
interface Ctx {
  /* some variables for internal use */
}

// const tasks = new Listr<Ctx>([

//   {
//     title: 'init eslint',
//     task: (ctx, task) => {
//       return task.newListr([
//         {
//           title: 'Install dependent packages',
//           task: () => {
//             return execa('npm', ['install',
//               'eslint',
//               'babel-eslint',
//               '@typescript-eslint/eslint-plugin',
//               '@typescript-eslint/parser',
//               'eslint-plugin-react',
//               'eslint-plugin-react-hooks',
//               'eslint-plugin-jsx-control-statements',
//               'markdown-eslint-parser'
//             ])
//           }
//         },
//         { // todo
//           title: 'copy .eslintrc file',
//           task: () => {
//             return execa('cp', [path.resolve(__dirname, './template/.eslintrc.js'), process.cwd()])
//           }
//         },
//         {
//           title: 'add eslint script',
//           task: () => {
//             const packagePath = path.resolve(process.cwd(), './package.json');
//             let fileStat = null;
//             try {
//               fileStat = fs.statSync(packagePath);
//             } catch (err) {

//             }
//             let configObj: any = { scripts: {} };
//             if (fileStat && fileStat.isFile()) {
//               const configString = fs.readFileSync(packagePath, { encoding: 'utf8' });
//               try {
//                 configObj = JSON.parse(configString);
//               } catch (error) {
//                 throw new Error('package.json 解析错误！')
//               }

//             }
//             configObj.scripts = {
//               ...configObj.scripts,
//               "eslint": "eslint ./src/**/* --fix"
//             }
//             fs.writeFileSync(packagePath, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
//           }
//         },
//         {
//           title: 'set vscode config',
//           task: () => {

//             return new Promise((resolve, reject) => {
//               const vscodeConfig = path.resolve(process.cwd(), '.vscode/settings.json');
//               let fileStat = null;
//               try {
//                 fileStat = fs.statSync(vscodeConfig);
//               } catch (err) {

//               }
//               let configObj = {
//                 ...vscode
//               };
//               if (fileStat && fileStat.isFile()) {
//                 const configString = fs.readFileSync(vscodeConfig, { encoding: 'utf8' });
//                 try {
//                   configObj = JSON.parse(configString);
//                 } catch (error) {
//                   reject('.vscode/settings.json 解析错误！')
//                 }
//                 configObj = {
//                   ...vscode,
//                   ...configObj,
//                 }
//               } else {
//                 const vscode = path.resolve(process.cwd(), '.vscode');
//                 try {
//                   fileStat = fs.statSync(vscode);
//                 } catch (err) {
//                   fs.mkdirSync('.vscode')
//                 }
//               }
//               fs.writeFileSync(vscodeConfig, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
//               resolve(undefined)
//             })
//           }
//         }
//       ])
//     }
//   }, {
//     title: 'init jest',
//     task: (ctx, task) => {
//       return task.newListr([
//         {
//           title: "install packages",
//           task: () => {
//             return execa('npm', ['i', '-D',
//               'jest',
//               'ts-jest',
//               '@types/jest'
//             ])
//           }
//         },
//         {
//           title: "copy jest config file",
//           task: () => {
//             return execa('cp', [path.resolve(__dirname, './template/jest.config.ts'), process.cwd()])
//           }
//         },
//         {
//           title: 'add jest script',
//           task: () => {
//             const packagePath = path.resolve(process.cwd(), './package.json');
//             let fileStat = null;
//             try {
//               fileStat = fs.statSync(packagePath);
//             } catch (err) {

//             }
//             let configObj: any = { scripts: {} };
//             if (fileStat && fileStat.isFile()) {
//               const configString = fs.readFileSync(packagePath, { encoding: 'utf8' });
//               try {
//                 configObj = JSON.parse(configString);
//               } catch (error) {
//                 throw new Error('package.json 解析错误！')
//               }

//             }
//             configObj.scripts = {
//               ...configObj.scripts,
//               "test": "jest --passWithNoTests",
//             }
//             fs.writeFileSync(packagePath, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
//           }
//         },
//         {
//           title: 'use jest in eslint when there is eslint',
//           task: (ctx, task) => {
//             return task.newListr([
//               {
//                 title: "install jest plugin",
//                 task: () => {
//                   return execa('npm', ['i', '-D', 'eslint-plugin-jest']);
//                 }
//               }, {
//                 title: "set eslintrc",
//                 task: async () => {
//                   const eslintrcPath = path.resolve(process.cwd(), './.eslintrc.js');
//                   let fileStat = null;
//                   try {
//                     fileStat = fs.statSync(eslintrcPath);
//                   } catch (err) {

//                   }
//                   let configObj: any = { overrides: {} };
//                   if (fileStat && fileStat.isFile()) {
//                     configObj = await import(eslintrcPath);
//                   }
//                   configObj.overrides = [
//                     ...configObj.overrides,
//                     jest_config_in_eslint
//                   ];

//                   fs.writeFileSync(eslintrcPath, `module.exports = ${JSON.stringify(configObj, null, 2)}`, { encoding: 'utf-8' });
//                 }
//               }
//             ])

//           }
//         }

//       ])
//     }
//   }

// ],
//   {
//     /* options */
//   }
// )



const tasks = new Listr<Ctx>([
  {
    title: 'add pettier',
    task: () => {
      return pettierTask;
    }
  },
  {
    title: 'add eslint',
    task: () => {
      return eslintTask;
    }
  },
  {
    title: 'add jest',
    task: () => {
      return jestTask;
    }
  },
  {
    title: 'add lint in the commit phase',
    task: () => {
      return commitLintTask;
    }
  }
])

const run = async () => {
  try {
    await tasks.run()
    console.log(chalk.yellow(`
    请在vscode中安装以下插件：
    1. esbenp.prettier-vscode
    2. dbaeumer.vscode-eslint 
    3. editorconfig.editorconfig,
    4. stylelint.vscode-stylelint
    `))

  } catch (e) {
    console.error(e)
  }
}
run();

