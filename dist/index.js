"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_validate_1 = require("@tenex/schema-validate");
const get_template_1 = require("./lib/get-template");
const put_1 = require("./lib/put");
const get_1 = require("./lib/get");
const db_1 = require("./lib/db");
const update_1 = require("./lib/update");
async function default_1(request, template) {
    schema_validate_1.validate(request, template);
    schema_validate_1.validate(request, get_template_1.default);
    const { intent } = request;
    const uploadObject = getRequestObject(request, template);
    const tableName = process.env[this.id];
    const table = db_1.getTable(tableName);
    if (intent) {
        switch (intent) {
            case "put":
                const putRes = await put_1.default(uploadObject, table);
                console.log(putRes);
                return putRes.status;
            case "get":
                let getRes = await get_1.default(uploadObject, table);
                console.log(getRes);
                return getRes;
            case "update":
                let updateRes = await update_1.default(uploadObject, table);
                console.log(updateRes);
                return updateRes;
        }
    }
    return "No such command";
}
exports.default = default_1;
function getRequestObject(request, template) {
    const { body, id } = request;
    if (body)
        return {
            _id: id,
            body
        };
    return {
        _id: id,
        body: template["body?"]
    };
}
