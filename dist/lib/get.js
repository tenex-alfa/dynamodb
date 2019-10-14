"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = async (request, table) => {
    console.log("getting from db");
    const res = await table.getItem(request._id);
    return res;
};
exports.default = exports.get;
