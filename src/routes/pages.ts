import { Request, Response } from 'express';

const express = require("express");

const router = express.Router();

router.get('/', (req:Request, res:Response) =>{
    res.render('index');
});

router.get('/register', (req:Request, res:Response) =>{
    res.render('register');
});

router.get('/login', (req:Request, res:Response) =>{
    res.render('login');
});

module.exports = router;



