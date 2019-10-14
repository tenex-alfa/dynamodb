"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = async (request, table) => {
    const { _id, body } = request;
    return table.putItem(_id, body);
};
exports.default = exports.put;
