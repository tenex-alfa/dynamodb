"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("./get");
const deepmerge = require("deepmerge");
const put_1 = require("./put");
const update = async (request, table) => {
    const orgiginal = await get_1.default(request, table);
    const newObj = deepmerge.all([orgiginal, request.body]);
    const newRequest = { _id: request._id, body: newObj };
    const res = await put_1.default(newRequest, table);
    return res;
};
exports.default = update;
