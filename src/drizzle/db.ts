import "dotenv/config";
import { drizzle} from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

export const client = new Client({
    connectionString: process.env.DATABASE_URL as string,
});

const main = async () => {
    await client.connect();// connects to the data base
    
}
 main ().catch((err) => {
    console.log(err);
 });

 const db = drizzle(client,{schema,logger:true});//create a drizzle instance
 export default db;