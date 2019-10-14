import Table from "./db";

export const put = async (
  request: { _id: string; body?: any },
  table: Table
) => {
  const { _id, body } = request;

  return table.putItem(_id, body);
};

export default put;
