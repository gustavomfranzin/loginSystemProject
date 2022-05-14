import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.register = (req: Request, res: Response) => {
  console.log(req.body);

  const { name, login, password, passwordConfirm } = req.body;

  db.query(
    "SELECT login from users WHERE login = ?",
    [login],
    async (error: any, results: any) => {
      if (error) {
        throw error;
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("register", {
          message: "That login is already in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Password do not match!",
        });
      } if (password.length < 6){
        return res.render("register", {
          message: "Password not secure!",
        });
      } 

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ?",
        { name: name, login: login, password: hashedPassword },
        (error: any, results: any) => {
          if (error) {
            throw error;
            console.log(error);
          } else {
            console.log(results);
            return res.render("register", {
              message2: "User Registered!",
            });
          }
        }
      );
    }
  );
};

exports.login = (req: Request, res: Response) => {

  const {login, password} = req.body;

  db.query(`SELECT * FROM users WHERE login = ${db.escape(req.body.login)};`, async(error: any, results: any) => {
    if (error) {
      throw error;
      console.log(error);
    }
      if(!results.length){
        return res.render("login", {
          message: "Login or password incorrect!",
        });
      }

      bcrypt.compare(req.body.password, results[0]['password'], (bErr: any, bResult: any) =>{
        if(bErr){
          throw bErr;
          return res.render("login", {
            message: "Login or password incorrect!",
          });
        }
          if(bResult){
            const token = jwt.sign({
              login: results[0].login,
              loginId: results[0].id,
            }, process.env.ACCESS_TOKEN_SECRET);
            return res.render("page", {
              token,
              login: results[0]
            })
          }
          return res.status(401).render("login", {
            message: "Login or password incorrect!",
          });
      });
  })
}