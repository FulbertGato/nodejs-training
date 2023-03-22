import express from 'express'
import  { NextFunction, Request, Response } from "express";
import * as bodyParser from "body-parser";
import { config } from "dotenv";
import {errorHandler, notFoundHandler} from "./api/exceptions/handler";
import database from "./config/database";
import role from "./api/routes/role";
import user from "./api/routes/user";
config();

const app = express();
database.authenticate().then(r => console.log("Database connected")).catch(e => console.log(e));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/role", role);
app.use("/user", user);



app.use(errorHandler);
app.use(notFoundHandler);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
