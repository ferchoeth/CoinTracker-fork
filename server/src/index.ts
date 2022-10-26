
import { Request, Response, NextFunction } from "express";
import routers from "./routes/index"


//Archivo que arranca el servidor 

require("dotenv").config();


import express from 'express'
import morgan from 'morgan'
//morgan permite ver las peticiones en consola
import { dbConn } from './db'


//cors permite comunicar el servidor y el frontend 
import cors from "cors";
const app: any = express();


app.use(express.json()) 
app.use(morgan('dev')) 

app.use(cors())


app.use("/",routers)  



// Error catching endware.

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {

    console.log(error)
    const name = error.name
    const message = error.message;
    // console.error(error);
    return res.send(name + message);
});  




const PORT = process.env.PORT || 3001
app.listen(PORT, () => { // puerto 3001
    console.log('Server listening on port',PORT); // eslint-disable-line no-console
});

//Conectamos a la base de datos
dbConn();

