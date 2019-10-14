import { toDynamoObject } from "@tenex/dynamoose-object"
import * as AWS from "aws-sdk";

const table = new AWS.DynamoDB();
let client: Table;

class Table {
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }
  async putItem(_id: string, body: any) {
    const object: any = { _id, ...body };
    console.log(object);
    const dobj = toDynamoObject(this.tableName, object);
    await dobj.save();
    return {
      status: 200
    };
  }

  getItem(_id: string): Promise<AWS.DynamoDB.GetItemOutput> {
    return new Promise((res: any, rej: any) => {
      table.getItem(
        { TableName: this.tableName, Key: { _id: { S: _id } } },
        (err: any, data: any) => {
          if (err) rej(err);
          if (data) res(parse(data));
        }
      );
    });
  }
}

function parse(object: any) {
  const out: any = {};
  for (const key in object.Item) {
    out[key] = Object.values(object.Item[key])[0];
    if (Object.keys(object.Item[key])[0] == "N") {
      out[key] = parseInt(out[key]);
    } else {
      try {
        out[key] = JSON.parse(out[key])
      } catch (err) {

      }
    }
  }
  return out
}

export const getTable = (name: string) => {
  if (!client) client = new Table(name);
  return client;
};

export default Table;
