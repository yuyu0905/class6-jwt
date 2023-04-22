const successHandle = require('../service/successHandle');
const appError = require('../service/appError');
const { generateSendJWT } = require('../service/auth');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const users = {
    // 註冊
    async signUp(req, res, next) {
        let { email, password, confirmPassword, name } = req.body;
        
        const user = await User.findOne({ email });
        if(user) {
            return next(appError("400", "此 Email 已註冊", next));
        }
        
        // 內容不可為空
        if(!email || !password || !confirmPassword || !name) {
            return next(appError("400", "欄位未填寫正確", next));
        }
        // 密碼不一致
        if(password !== confirmPassword) {
            return next(appError("400", "密碼不一致", next));
        }
        // 密碼需 8 碼以上
        if(!validator.isLength(password, { min:8 })){
            return next(appError("400", "密碼需 8 碼以上", next));
        }
        // 是否為 Email
        if(!validator.isEmail(email)) {
            return next(appError("400", "Email 格式不正確", next));
        }

        // 加密密碼
        password = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            email,
            password,
            name
        });
        generateSendJWT(newUser, 201, res); // 201: 新增資源成功
    },

    // 登入
    async signIn(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(appError( 400, '帳號密碼不可為空', next));
        }
        const user = await User.findOne({ email }).select('+password');
        const auth = await bcrypt.compare(password, user.password);
        if(!auth) {
            return next(appError(400, '您的密碼不正確',next));
        }
        generateSendJWT(user, 200, res);
    },

    // 取得個人資訊
    async profile(req, res, next) {
        successHandle(res, req.user);
    },

    // 更新個人資料
    async updateProfile(req, res, next) {
        const { name, gender, photo } = req.body;
        if(!name) {
            return next(appError("400", "欄位未填寫正確", next));
        }

        const updateUser = await User.findByIdAndUpdate(
            req.user.id,
            {
              name,
              gender,
              photo,
            },
        );
        successHandle(res, updateUser);
    },

    // 重設密碼
    async updatePassword(req, res, next) {
        const { password, confirmPassword } = req.body;
        if(password !== confirmPassword) {
            return next(appError("400","密碼不一致！", next));
        }
        const newPassword = await bcrypt.hash(password, 12);
        
        const user = await User.findByIdAndUpdate(req.user.id, {
            password: newPassword
        });
        generateSendJWT(user, 200, res)
    },
}

module.exports = users;
