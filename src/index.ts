import { validate } from "@tenex/schema-validate";
import _template from "./lib/get-template";
import put from "./lib/put";
import get from "./lib/get";
import { getTable } from "./lib/db";
import update from "./lib/update";

export default async function (request: any, template: any) {
  validate(request, template);
  validate(request, _template);

  const { intent } = request;
  const uploadObject: { _id: string; body?: any } = getRequestObject(
    request,
    template
  );

  const tableName: string = process.env[this.id];
  const table = getTable(tableName);


  if (intent) {
    switch (intent) {
      case "put":
        const putRes = await put(uploadObject, table);
        console.log(putRes);
        return putRes.status;
      case "get":
        let getRes = await get(uploadObject, table);
        console.log(getRes);
        return getRes;
      case "update":
        let updateRes = await update(uploadObject, table);
        console.log(updateRes);
        return updateRes;
    }
  }

  return "No such command";
}

function getRequestObject(
  request: any,
  template: any
): { _id: string; body?: any } {
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
