import  pool, { createTable }  from  "../config/mySqlConfig";
import { ICreateNewProductParam, IUpdateProductDetailsParam } from "../interfaces/queriesInterfaces";
import { responseStructure } from "../utils/commonHelpers";
import CustomModal from "../utils/ModalQueriesClass";

export interface IProductModal{
  id:number;
  product_name:string;
  description:string;
  images:string;
  seller_id:number;
  category:number;
  sub_category:number;
  views:number;
  number_of_customer_rate:number;
  average_rating:number;
  sum_rating:number;
  price:number;
  discount:number;
  status:number;
  is_active:number;
  created_at:Date;
  updated_at:Date;
}

const createProductModal  = `CREATE TABLE IF NOT EXISTS products (
  id int(11) AUTO_INCREMENT PRIMARY KEY,
  product_name varchar(255) NOT NULL,
  description varchar(255) NULL,
  images varchar(255) NULL,
  seller_id INT NOT NULL,
  category INT NULL,
  sub_category INT NULL,
  views int(11) NOT NULL DEFAULT 0,
  number_of_customer_rate int(11) DEFAULT 0,
  average_rating int(11) DEFAULT 0,
  sum_rating int(11) DEFAULT 0,
  price int(11) DEFAULT 0,
  discount int(11) DEFAULT 0,
  status tinyint(1) DEFAULT 0 CHECK (status in (0,1)),
  is_active tinyint(1) DEFAULT 1 CHECK (is_active in (0,1)),
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (category) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (sub_category) REFERENCES sub_categories(sub_category_id) ON DELETE CASCADE ON UPDATE CASCADE
)`

createTable(pool,createProductModal);

export  class ProductModal extends  CustomModal{
  constructor(){
    super("products");
  }

    async createNewProduct(data:ICreateNewProductParam){
        try {
            this.create(data);
            return await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }    
    }

    async updateProduct(data:IUpdateProductDetailsParam,conditions:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.update(data);
            this.where(conditions,condition_type);
            return await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async getProduct(conditions?:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.select();
            if(conditions)
                this.where(conditions,condition_type);
            return await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }


}

export default pool;