const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API',
        description: '2023 Node.js企業專題班 - 第六堂 jwt',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'authorization',
            description: '請加上 API Token'
        }
    }
};

const outputFile = './swagger_output.json'; // 輸出的文件名稱
const endpointsFiles = ['./app.js']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

swaggerAutogen(outputFile, endpointsFiles, doc); // swaggerAutogen 的方法

