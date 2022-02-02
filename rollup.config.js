import rollupTypescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
// import nodeResolve from 'rollup-plugin-node-resolve';
// import globals from 'rollup-plugin-node-globals'; // 加global前缀
import builtins from 'rollup-plugin-node-builtins';
import nodeExternals from 'rollup-plugin-node-externals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';

export default {
    input: 'src/index.ts',
    external:['react'],
    output: {
        file: 'lib/index.mjs',
        format: 'es',
        globals: {
            react: 'React'
        },
        banner: '#!/usr/bin/env node'
    },
    plugins: [
        nodeExternals(),
        rollupTypescript(),
        image(),
        postcss(),
        // nodePolyfills(),
        nodeResolve({ preferBuiltins: false,exportConditions:["node"]}), // or `true`
        commonjs(),
        // globals(),
        // builtins(),
    ],
};
