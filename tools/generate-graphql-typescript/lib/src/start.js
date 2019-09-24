#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as colors from 'colors';
const child_process = require("child_process");
console.log('Invoking my-toolchain...');
child_process.execSync('npm run apollo', { stdio: 'inherit' });
console.log('Success!');
//# sourceMappingURL=start.js.map