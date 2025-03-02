export  interface  IResponseStructure{
    status:boolean;
    message:string;
    data?:any;
}

export  interface  ICUDOperationQueriesDataStructure{
    fieldCount: number,   
    affectedRows: number, 
    insertId: number,    
    info:string,        
    serverStatus:number, 
    warningStatus:number,
    changedRows:number   
}

export type TROperationQueriesDataStructure  = {[key:string]:any}[];