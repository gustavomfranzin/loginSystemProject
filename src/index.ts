import { Request, Response } from "express";


const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');

db.connect((error: any) => {
  if (error) {
    console.log(error);
  } else {
    console.log("mysql connected!");
  }
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT}`);
});
