import  mysql,{Pool} from  "mysql2/promise";
import { responseStructure } from "../utils/commonHelpers";

const   pool   =  mysql.createPool({
    host: 'localhost',
    user:  'root',
    password: '',
    database:  'shopswift',
    waitForConnections: true,
    connectionLimit: 10, // Allow multiple connections
    queueLimit: 0, 
});

export const closePool = async () => {
    console.log("Closing MySQL connection pool...");
    try {
      await pool.end();
      console.log("MySQL connection pool closed");
    } catch (err) {
      console.error("Error closing connection pool:", err);
    }
    process.exit(0);
};

export  const  executeQuery   =  async (query:string,params:any[] = []) =>{
  const connection =  await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.query(query,params);
    await connection.commit();
    return responseStructure(true,"Successfully Executed   Query",result);
  } catch (error) {
    await connection.rollback();
      return responseStructure(false,"Something Went Wrong");
  }  finally{
    connection.release();
  }
}

export const createTable = async (pool:Pool,createTableQuery:string) => {
  try {
    const connection = await pool.getConnection();
    await connection.query(createTableQuery);
    connection.release(); // Release connection back to the pool
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
};

export default pool;
