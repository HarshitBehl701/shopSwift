import  pool, { createTable }  from  "../config/mySqlConfig";
import { IRegisterNewSellerParam, IUpdateSellerDetailsParam } from "../interfaces/queriesInterfaces";
import { responseStructure } from "../utils/commonHelpers";
import CustomModal from "../utils/ModalQueriesClass";

export interface   ISellerModal{
    id:number;
    seller_name:string;
    brand_name:string;
    brand_logo:string;
    gstin:string;
    email:string;
    seller_password:string;
    is_verified:number;
    verification_code:string;
    verification_expiration:Date;
    is_active:number;
    created_at:Date;
    updated_at:Date;
}

const createSellerModal  = `CREATE TABLE IF NOT EXISTS sellers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_name VARCHAR(255) NOT NULL,
    brand_name varchar(255) not null,
    brand_logo varchar(255) null,
    gstin varchar(15) null,
    email VARCHAR(255) NOT NULL,
    seller_password VARCHAR(255) NOT NULL,
    is_verified TINYINT(1) NOT NULL DEFAULT 0,
    verification_code VARCHAR(6) NOT NULL,
    verification_expiration TIMESTAMP NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`

createTable(pool,createSellerModal);

export  class SellerModal extends  CustomModal{
    constructor()
    {
        super("sellers")
    }

    async registerNewSeller(data:IRegisterNewSellerParam){
        try {
            this.create(data)
            return  await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async updateSellerAccountDetails(data:IUpdateSellerDetailsParam,conditions:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.update(data);
            this.where(conditions,condition_type);
            return  await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async getSeller(conditions?:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
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