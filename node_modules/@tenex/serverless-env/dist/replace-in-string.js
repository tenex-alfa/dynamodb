"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replace = (object, string) => {
    for (const key in object) {
        if (string.includes(key)) {
            string = string.split(`\${${key}}`).join(object[key]);
        }
    }
    return string;
};
exports.default = replace;
