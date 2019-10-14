import Table from "./db";

export const get = async (
  request: { _id: string; body?: any },
  table: Table
) => {
  console.log("getting from db");
  const res = await table.getItem(request._id);
  return res;
};

export default get;
