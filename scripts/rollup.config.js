/* eslint-env node */

'use strict';

const path = require('path');

const replace = require('rollup-plugin-replace');
const lwcCompiler = require('@lwc/rollup-plugin');
const compat = require('rollup-plugin-compat');
const { terser } = require('rollup-plugin-terser');

const env = process.env.NODE_ENV || 'development';

const input = path.resolve(__dirname, '../src/main.js');
const outputDir = path.resolve(__dirname, '../public/js');

function rollupConfig({ target }) {
    const isCompat = target === 'es5';
    const isProduction = env === 'production';

    return {
        input,
        output: {
            file: path.join(outputDir, isCompat ? 'compat.js' : 'main.js'),
            format: 'iife',
        },
        plugins: [
            lwcCompiler(),
            replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
            isCompat && compat(),
            isProduction && terser()
        ].filter(Boolean)
    }
}

module.exports = [
    // rollupConfig({ target: 'es5' }), // this is for IE11 and friends
    rollupConfig({ target: 'es2017' })
];
