const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.PASSWORD
)

mongoose
    .connect(DB)
    .then(() => console.log('資料庫連接成功'))
    .catch((err) => console.log(err));