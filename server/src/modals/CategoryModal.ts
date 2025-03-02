import  pool, { createTable }  from  "../config/mySqlConfig";
import { ICreateNewCategoryParam, IUpdateCategoryParam } from "../interfaces/queriesInterfaces";
import { responseStructure } from "../utils/commonHelpers";
import CustomModal from "../utils/ModalQueriesClass";

export interface ICategoryModal{
    id:number;
    category_name:string;
    category_image:string;
    is_active:number;
    created_at:Date;
    updated_at:Date;
}

const createCategoryModal  = `CREATE TABLE IF NOT EXISTS categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_image VARCHAR(255) NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`

createTable(pool,createCategoryModal);

export  class CategoryModal extends  CustomModal{
    constructor()
    {
        super("categories")
    }

    async  createNewCategorySingleHelper({name,category_image}:ICreateNewCategoryParam){
        try {
            this.create({
                category_name:name
            })
            return  await  this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }    
    }

    async  updateCategory(data:IUpdateCategoryParam,conditions:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.update(data)
            this.where(conditions,condition_type);
            return await  this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }


    async getCategory(conditions?:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.select();
            if(conditions)
                this.where(conditions,condition_type);
            return await  this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

};

export default pool;