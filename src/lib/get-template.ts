import * as yml from "js-yaml";
import * as fs from "fs";
const path = __dirname + "/../../tx.yml";
export default yml.safeLoad(fs.readFileSync(path, "utf-8")).template;
