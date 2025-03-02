import  pool, { createTable }  from  "../config/mySqlConfig";
import { ICreateNewOrderSingleParam, IUpdateOrderParam } from "../interfaces/queriesInterfaces";
import { responseStructure } from "../utils/commonHelpers";
import CustomModal from "../utils/ModalQueriesClass";

export interface  IOrderModal{
    id:number;
    product_id:number;
    user_id:number;
    price:number;
    order_status:string;
    cancel_reason:string;
    quantity:number;
    rating:number;
    is_active:number;
    created_at:Date;
    updated_at:Date;
}

const createOrderModal  = `CREATE TABLE IF NOT EXISTS orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id int(11) NOT NULL,
    user_id  INT  NOT  NULL,
    price INT NOT NULL,
    order_status ENUM(
        'Pending',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
        'Refunded',
        'Failed',
        'On Hold',
        'Returned'
    ) NOT NULL DEFAULT 'Pending',
    rating INT NULL,
    quantity INT NULL DEFAULT 1,
    cancel_reason TEXT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);`

createTable(pool,createOrderModal);

export  class OrderModal extends  CustomModal{
    constructor(){
        super("orders")
    }

    async createNewOrder(data:ICreateNewOrderSingleParam){
        try {
            this.create(data);
            return  await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }    
    }

    async  updateOrder(data:IUpdateOrderParam,conditions:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
        try {
            this.update(data)
            this.where(conditions,condition_type);
            return  await this.execute();
        } catch (error) {
            return responseStructure(false,"Something Went  Wrong: " + (error  instanceof  Error  ? error.message   : ''));
        }
    }

    async getOrder(conditions?:{column_name:string,value:any,operand?:string} | {column_name:string,value:any,operand?:string}[],condition_type?:string){
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