import  pool, { createTable }  from  "../config/mySqlConfig";
import { ICreateContactForm } from "../interfaces/queriesInterfaces";
import { responseStructure } from "../utils/commonHelpers";
import CustomModal from "../utils/ModalQueriesClass";

export interface  IContactModal{
    id: number;
    name: string;
    email: string;
    message: string;
    is_active: number;
    created_at: Date;
    updated_at: Date;
}

const createContactModal  = `CREATE TABLE IF NOT EXISTS contact(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    message TEXT NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`

createTable(pool,createContactModal);

export  class ContactModal extends CustomModal{
    constructor()
    {
        super("contact");
    }

    async createNewComment(data:ICreateContactForm){
        try {
            this.create(data)
            return await  this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }    
    }

    async getAllContactRows(){
        try {
            this.select();
            return await  this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

}

export default pool;