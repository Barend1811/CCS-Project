import pg from 'pg'
const { Pool } = pg

async function createDb() {

  const pool = new Pool({                                                              //Set Pool config with data from environmental variables
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,                                                      //Pass in database name in config 
    ssl: false,
  });

  const dbCon =
    await pool
      .connect()                                                                        //Connects to postgresql server and see if database exists
      .catch((err) => {
        if (err.code == "3D000") {                                                      //If database does not exists error code 3D000 will be throw here
          return false;                                                                 //dbCon value set to false
        }
        else {                                                                          //Any other error will be thrown here
          console.error('Error connecting to PostgreSQL database', err);
        }
      });

  if (dbCon == false) {                                                                 //ddCon == false only if database does not exists
    const pool = new Pool({                                                             //Since we know database does not exist do not set database in config
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      ssl: false,
    });
    await pool.connect()                                                                //Connect to postgresql server without database query
    await pool.query(`CREATE DATABASE ` + process.env.DB_NAME + `;`)                    //Since database does not exists create the databse with query
    console.log("Database Created")
  }

  await pool.end();                                                                      //After database is created or if database already exists close connection to server
}

export default createDb;