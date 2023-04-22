const successHandle = require('../service/successHandle');
const appError = require('../service/appError');
const Post = require('../models/posts');
const User = require('../models/users');

const posts = {
    // 觀看所有動態
    async getPosts(req, res, next) {
        const { timeSort, q } = req.query;
        const sort = timeSort === "asc" ? "createdAt":"-createdAt"
        const keyword = !q ? {} : {"content": new RegExp(q)};
        
        const post = await Post.find(keyword).populate({
            path: "user",
            select: "name photo"
        }).sort(sort);
        // asc 遞增(由小到大，由舊到新) createdAt ; 
        // desc 遞減(由大到小、由新到舊) "-createdAt"

        successHandle(res, post);
    },

    // 張貼個人動態
    async createPosts(req, res, next) {
        const { user, content, image } = req.body;
        if(!content) {
            return next(appError(400, "content 為必填", next))
        }
        const newPost = await Post.create(
            {
                user,
                content,
                image,
            }
        );
        successHandle(res, newPost);
    },
}

module.exports = posts;
