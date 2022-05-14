"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});
exports.register = (req, res) => {
    console.log(req.body);
    const { name, login, password, passwordConfirm } = req.body;
    db.query("SELECT login from users WHERE login = ?", [login], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            throw error;
            console.log(error);
        }
        if (results.length > 0) {
            return res.render("register", {
                message: "That login is already in use",
            });
        }
        else if (password !== passwordConfirm) {
            return res.render("register", {
                message: "Password do not match!",
            });
        }
        if (password.length < 6) {
            return res.render("register", {
                message: "Password not secure!",
            });
        }
        let hashedPassword = yield bcrypt.hash(password, 8);
        console.log(hashedPassword);
        db.query("INSERT INTO users SET ?", { name: name, login: login, password: hashedPassword }, (error, results) => {
            if (error) {
                throw error;
                console.log(error);
            }
            else {
                console.log(results);
                return res.render("register", {
                    message2: "User Registered!",
                });
            }
        });
    }));
};
exports.login = (req, res) => {
    const { login, password } = req.body;
    db.query(`SELECT * FROM users WHERE login = ${db.escape(req.body.login)};`, (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            throw error;
            console.log(error);
        }
        if (!results.length) {
            return res.render("login", {
                message: "Login or password incorrect!",
            });
        }
        bcrypt.compare(req.body.password, results[0]['password'], (bErr, bResult) => {
            if (bErr) {
                throw bErr;
                return res.render("login", {
                    message: "Login or password incorrect!",
                });
            }
            if (bResult) {
                const token = jwt.sign({
                    login: results[0].login,
                    loginId: results[0].id,
                }, process.env.ACCESS_TOKEN_SECRET);
                return res.render("page", {
                    token,
                    login: results[0]
                });
            }
            return res.status(401).render("login", {
                message: "Login or password incorrect!",
            });
        });
    }));
};
