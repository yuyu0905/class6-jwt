const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/posts');
const handleErrorAsync = require("../service/handleErrorAsync");
const { isAuth } = require('../service/auth');

router.get('/', 
    /**
    * #swagger.tags = ['Posts - 動態']
    * #swagger.description = '觀看所有動態'
    * #swagger.parameters['q'] = {
            in: "query",
            description: '關鍵字搜尋'
        }
    * #swagger.parameters['timeSort'] = {
            in: "query",
            description: '動態排序',
            schema: "asc"
        }
    * #swagger.responses[200] = {
            schema: {
                "status": "success",
                "data": [
                    {
                        "_id": "643131fbba7188f74471ecf5",
                        "content": "123",
                        "image": "",
                        "user": {
                            "_id": "643125070abfa25a0329fd94",
                            "name": "John",
                            "photo": "https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg"
                        },
                        "likes": 0,
                        "__v": 0
                    },
                ]
                }
            }
        }
    */
    handleErrorAsync(PostsControllers.getPosts));

router.post('/', isAuth,
    /**
    * #swagger.tags = ['Posts - 動態']
    * #swagger.description = '張貼個人動態'
    * #swagger.security = [{
        "apiKeyAuth": []
        }]
    * #swagger.parameters['body'] = {
            in: "body",
            type: "object",
            required: true,
            description: "資料格式",
            schema: { 
                "$user": "643125070abfa25a0329fd94",
                "$content": "新增動態",
                "$image": "https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg"
            }
        }
    * #swagger.responses[200] = {
            schema: {
                "status": "success",
                "data": {
                    "content": "新增動態",
                    "image": "https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg",
                    "createdAt": "2023-04-08T13:49:01.286Z",
                    "user": "643125070abfa25a0329fd94",
                    "likes": 0,
                    "_id": "643170d4cbd101bdaa35cd9a",
                    "__v": 0
                }
            }
        }
    */
    handleErrorAsync(PostsControllers.createPosts));

module.exports = router;
