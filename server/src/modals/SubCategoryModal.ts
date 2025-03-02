import  pool, { createTable }  from  "../config/mySqlConfig";
import { ICreateNewSubCategoryParam, IUpdateSubCategoryParam } from "../interfaces/queriesInterfaces";
import { responseStructure } from "../utils/commonHelpers";
import CustomModal from "../utils/ModalQueriesClass";

export  interface ISubCategoryModal{
    sub_category_id:number;
    category_id:number;
    sub_category_name:string;
    sub_category_image:string;
    sub_category_is_active:number;
    sub_category_created_at:Date;
    sub_category_updated_at:Date;
}

const createSubCategoryModal  = `CREATE TABLE IF NOT EXISTS sub_categories(
    sub_category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    sub_category_name VARCHAR(255) NOT NULL,
    sub_category_image VARCHAR(255) NULL,
    sub_category_is_active TINYINT(1) NOT NULL DEFAULT 1,
    sub_category_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sub_category_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);`

createTable(pool,createSubCategoryModal);

export class SubCategoryModal extends  CustomModal{
    constructor()
    {
        super("sub_categories");
    }

    async  createNewSubCategory(data:ICreateNewSubCategoryParam){
        try {
            this.create(data);
            return await  this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async updateSubCategory(data:IUpdateSubCategoryParam,conditions:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.update(data);
            this.where(conditions,condition_type);
            return await  this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async getSubCategory(conditions?:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.select();
            if(conditions)
                this.where(conditions,condition_type);
            return await  this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }
}

export default pool;