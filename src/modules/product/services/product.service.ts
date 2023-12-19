import { toCamelKeys, toSnakeCase } from "keys-transform";
import { Service } from "typedi";
import db from "../../../db/connection";
import _ from "lodash";
import fs from "fs";
import path from "path";
import { buildSql } from "../../../utils/sql-builder.util";

@Service()
export class ProductService {
  constructor() {}

  //create new GL

  //updateGl

  //get all gl list
  async getAllProducts(isPagination: boolean, limit: number, skip: number, allQuery: any) {
    let queryText;
    let result;
    const sql: string = "SELECT * FROM products.product_mst";
    const allQueryValues: any[] = Object.values(allQuery);
    if (Object.keys(allQuery).length > 0) {
      const createSql = buildSql(sql, allQuery, "AND", this.injectionFilter, "id", limit, skip);

      const queryText = isPagination ? createSql[0] : createSql[1];
      result = (await db.getConnection().query(queryText, allQueryValues)).rows;
      const filesPath = path.resolve(__dirname + "/../../../../uploads");
      for (let [singleProductIndex, singleProduct] of result.entries()) {
        for (let [singleFileIndex, singleFile] of singleProduct.image.entries()) {
          let fileData = fs.readFileSync(filesPath + "/" + singleFile, { encoding: "base64" });
          // let base64FileData = Buffer.from(fileData).toString("base64");
          singleProduct.image[singleFileIndex] = fileData;
        }
        result[singleProductIndex] = singleProduct;
      }
    } else {
      queryText = isPagination
        ? "SELECT * FROM products.product_mst WHERE is_active = true ORDER BY id LIMIT $1 OFFSET $2"
        : "SELECT * FROM products.product_mst WHERE is_active = true ORDER BY id";
      result = (await db.getConnection().query(queryText, isPagination ? [limit, skip] : [])).rows;

      const filesPath = path.resolve(__dirname + "/../../../../uploads");
      for (let [singleProductIndex, singleProduct] of result.entries()) {
        for (let [singleFileIndex, singleFile] of singleProduct.image.entries()) {
          let fileData = fs.readFileSync(filesPath + "/" + singleFile, "utf-8");
          let base64FileData = Buffer.from(fileData).toString("base64");
          singleProduct.image[singleFileIndex] = base64FileData;
        }
        result[singleProductIndex] = singleProduct;
      }
    }

    return result.length > 0 ? toCamelKeys(result) : [];
  }
  async count(allQuery: object) {
    var queryText: string = "";
    const sql: string = "SELECT COUNT(id) FROM products.product_mst";
    const allQueryValues: any[] = Object.values(allQuery);
    if (Object.keys(allQuery).length > 0) {
      queryText = buildSql(sql, allQuery, "AND", this.injectionFilter, "id")[1];
      var result = (await db.getConnection().query(queryText, allQueryValues)).rows[0];
    } else {
      queryText = "SELECT COUNT(id) FROM products.product_mst";
      result = (await db.getConnection().query(queryText, [])).rows[0];
    }
    return result.count;
  }
  async getAllCategories() {
    const sql = `SELECT id, name FROM products.category WHERE is_active = true ORDER BY id`;
    const categories = (await db.getConnection().query(sql, [])).rows;
    return categories.length > 0 ? (toCamelKeys(categories) as any) : [];
  }
  injectionFilter(key: string): string {
    return toSnakeCase(key);
  }
}
