import  pool, { createTable }  from  "../config/mySqlConfig";
import { IRegisterNewUserParam, IUpdateUserDetailsParam } from "../interfaces/queriesInterfaces";
import { responseStructure } from "../utils/commonHelpers";
import CustomModal from "../utils/ModalQueriesClass";

export  interface  IUserModal{
    id:number;
    user_name:string;
    user_photo:string;
    email:string;
    address:string;
    user_password:string;
    user_cart:string;
    user_whislist:string;
    is_verified:number;
    verification_code:string;
    verification_expiration:Date;
    is_active:number;
    created_at:Date;
    updated_at:Date;
}

const createUserModal  = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_photo VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_cart varchar(255) null,
    user_whislist varchar(255) null,
    is_verified TINYINT(1) NOT NULL DEFAULT 0,
    verification_code VARCHAR(6) NOT NULL,
    verification_expiration TIMESTAMP NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`


createTable(pool,createUserModal);

export  class UserModal extends  CustomModal{
    constructor(){
        super("users");
    }

    async registerNewUser(data:IRegisterNewUserParam){
        try {
            this.create(data)
            return  await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async updateUserAccountDetails(data:IUpdateUserDetailsParam,conditions:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.update(data);

            this.where(conditions,condition_type);
            return  await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async getUser(conditions?:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
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