import  pool, { createTable }  from  "../config/mySqlConfig";
import { IRegisterNewAdminSingleParam, IUpdateAdminDetailsParam } from "../interfaces/queriesInterfaces";
import { responseStructure } from "../utils/commonHelpers";
import CustomModal from "../utils/ModalQueriesClass";

export interface IAdminModal{
    id:number;
    admin_name: string;
    admin_email: string;
    admin_password: string;
    is_active:number;
    created_at:Date;
    updated_at:Date;
}

const createAdminModal  = `CREATE TABLE IF NOT EXISTS admins(
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_name VARCHAR(255) NOT NULL,
    admin_email VARCHAR(255) NOT NULL,
    admin_password VARCHAR(255) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`

createTable(pool,createAdminModal);

export  class AdminModal extends CustomModal{
    constructor()
    {
        super("admins");
    }

    async registerNewAdmin(data:IRegisterNewAdminSingleParam){
        try {
            this.create(data)
            return await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async updateAdminAccountDetails(data:IUpdateAdminDetailsParam,conditions:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.update(data);
            this.where(conditions,condition_type);
            return  await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async getAdmin(conditions?:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.select();
            if(conditions)
                this.where(conditions,condition_type);
            return  await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }


}

export default pool;