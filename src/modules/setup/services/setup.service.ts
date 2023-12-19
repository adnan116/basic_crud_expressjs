import e from "cors";
import { toCamelKeys, toSnakeCase } from "keys-transform";
import { Service } from "typedi";
import db from "../../../db/connection";
import _ from "lodash";
import { connect } from "http2";
import { Pool } from "pg";

@Service()
export class SetupService {
  constructor() {}

  async getCompanyAboutUsInfo() {
    const sql = `SELECT 
                 * 
                FROM 
                  setups.about_info 
                WHERE 
                  is_active = true`;
    const companyAboutUs = (await db.getConnection().query(sql, [])).rows[0];
    return companyAboutUs ? (toCamelKeys(companyAboutUs) as any) : [];
  }

  async getCompanyContactInfo() {
    const sql = `SELECT 
                 * 
                FROM 
                setups.contact_info 
                WHERE 
                  is_active = true`;
    const companyContactInfo = (await db.getConnection().query(sql, [])).rows[0];
    return companyContactInfo ? (toCamelKeys(companyContactInfo) as any) : [];
  }

  async getAllCustomerReviews() {
    const sql = `SELECT 
                  a.*, 
                  b.name product_name 
                FROM 
                  setups.review_info a 
                  LEFT JOIN products.product_mst b ON a.product_id = b.id 
                WHERE 
                  a.is_active = true 
                ORDER BY 
                  a.id`;
    const customerReviews = (await db.getConnection().query(sql, [])).rows;
    return customerReviews.length > 0 ? (toCamelKeys(customerReviews) as any) : [];
  }
  injectionFilter(key: string): string {
    return toSnakeCase(key);
  }
}
