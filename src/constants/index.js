import path from "node:path";

export const SWAGGER_PATH = path.join(process.cwd(), "docs", "swagger.json");
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
};
