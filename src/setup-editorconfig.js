#!/usr/bin/env node

const path = require('path');
const sourcePath = path.resolve(module.filename);
const targetPath =  path.resolve(process.env.INIT_CWD, '.editorconfig');

const Writer = require('./writer');
const writer = Writer;
writer.sourcePath = sourcePath;
writer.targetPath = targetPath;
writer.run();
