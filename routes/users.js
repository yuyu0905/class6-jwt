const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/users');
const handleErrorAsync = require("../service/handleErrorAsync");
const { isAuth } = require('../service/auth');


router.post('/sign_up', 
  /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '註冊'
    * #swagger.parameters['body'] = {
            in: "body",
            type: "object",
            required: true,
            description: "資料格式",
            schema: { 
                "$email": "demo@gmail.com",
                "$password": "12345678",
                "$confirmPassword": "12345678",
                "$name": "demo user"
            }
        }
    * #swagger.responses[201] = {
        schema: {
            "status": "success",
            "data": {
              "status": "success",
              "user": {
                "token": "token",
                "name": "demo user"
              }
            }
        }
      }
    */
  handleErrorAsync(UsersControllers.signUp));

router.post('/sign_in', 
  /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '登入'
    * #swagger.parameters['body'] = {
            in: "body",
            type: "object",
            required: true,
            description: "資料格式",
            schema: { 
                "$email": "demo@gmail.com",
                "$password": "12345678",
            }
        }
    * #swagger.responses[200] = {
        schema: {
            "status": "success",
            "data": {
              "status": "success",
              "user": {
                "token": "token",
                "name": "demo user"
              }
            }
        }
      }
    */
  handleErrorAsync(UsersControllers.signIn));

router.get('/profile/', isAuth, 
  /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '取得個人資料'
    * #swagger.security = [{
      "apiKeyAuth": []
      }]
    * #swagger.responses[200] = {
        schema: {
            "status": "success",
            "data": {
              "_id": "64439ab798c4c15dc9f062e9",
              "name": "demo user"
            }
        }
      }
    */
  handleErrorAsync(UsersControllers.profile));

router.patch('/profile/', isAuth, 
  /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '更新個人資料'
    * #swagger.security = [{
      "apiKeyAuth": []
      }]
    * #swagger.parameters['body'] = {
            in: "body",
            type: "object",
            required: true,
            description: "資料格式",
            schema: { 
                "$name": "demo fix",
                "gender": "male",
                "photo": "https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg"
            }
        }
    * #swagger.responses[200] = {
        schema: {
            "status": "success",
            "data": {
                "_id": "64439ab798c4c15dc9f062e9",
                "name": "demo fix"
            }
        }
      }
    */
  handleErrorAsync(UsersControllers.updateProfile));

router.post('/updatePassword/', isAuth, 
  /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '重設密碼'
    * #swagger.security = [{
      "apiKeyAuth": []
      }]
    * #swagger.parameters['body'] = {
            in: "body",
            type: "object",
            required: true,
            description: "資料格式",
            schema: { 
                "$password": "12345678",
                "$confirmPassword": "12345678",
            }
        }
    * #swagger.responses[200] = {
        schema: {
            "status": "success",
            "user": {
                "token": "token",
                "name": "demo user"
            }
        }
      }
    */
  handleErrorAsync(UsersControllers.updatePassword));

module.exports = router;
