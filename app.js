const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const ResError = require('./service/resError');

// router
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();

// 程式出現重大錯誤時
process.on('uncaughtException', err => {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process
    console.error('Uncaught Exception！')
    console.error(err);
    process.exit(1);
});

require('./connections')

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

// 404 錯誤
app.use((req, res, next) => {
    res.status(404).send({
        status: 'error',
        message: "無此路由資訊",
    }).end();
});

// express 錯誤處理
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    // dev
    if (process.env.NODE_ENV === 'dev') {
        return ResError.resErrorDev(err, res);
    } 

    // prod
    // mongoDB 錯誤訊息
    if (err.name === 'ValidationError') {
        err.message = "資料欄位未填寫正確，請重新輸入！"
        err.isOperational = true;
        return ResError.resErrorProd(err, res);
    }
    ResError.resErrorProd(err, res);
})

// 未捕捉到的 catch 
process.on('unhandledRejection', (err, promise) => {
    console.error('未捕捉到的 rejection：', promise, '原因：', err);
});

module.exports = app;
