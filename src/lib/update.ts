import Table from "./db";
import get from "./get";
import * as deepmerge from "deepmerge"
import put from "./put";
const update = async (
    request: { _id: string; body?: any },
    table: Table
) => {
    const orgiginal = await get(request, table);
    const newObj = deepmerge.all([orgiginal, request.body])
    const newRequest = { _id: request._id, body: newObj }
    const res = await put(newRequest, table);
    return res;
}

export default update;