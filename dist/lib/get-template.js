"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yml = require("js-yaml");
const fs = require("fs");
const path = __dirname + "/../../tx.yml";
exports.default = yml.safeLoad(fs.readFileSync(path, "utf-8")).template;
