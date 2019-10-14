"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_object_1 = require("@tenex/dynamoose-object");
const AWS = require("aws-sdk");
const table = new AWS.DynamoDB();
let client;
class Table {
    constructor(tableName) {
        this.tableName = tableName;
    }
    async putItem(_id, body) {
        const object = { _id, ...body };
        console.log(object);
        const dobj = dynamoose_object_1.toDynamoObject(this.tableName, object);
        await dobj.save();
        return {
            status: 200
        };
    }
    getItem(_id) {
        return new Promise((res, rej) => {
            table.getItem({ TableName: this.tableName, Key: { _id: { S: _id } } }, (err, data) => {
                if (err)
                    rej(err);
                if (data)
                    res(parse(data));
            });
        });
    }
}
function parse(object) {
    const out = {};
    for (const key in object.Item) {
        out[key] = Object.values(object.Item[key])[0];
        if (Object.keys(object.Item[key])[0] == "N") {
            out[key] = parseInt(out[key]);
        }
        else {
            try {
                out[key] = JSON.parse(out[key]);
            }
            catch (err) {
            }
        }
    }
    return out;
}
exports.getTable = (name) => {
    if (!client)
        client = new Table(name);
    return client;
};
exports.default = Table;
