const { User } = require('../../../../models');
const __ = require('lodash');
const jwt = require('jsonwebtoken');
const { pwdVerifyHelper } = require('../../../../utils/common');
module.exports = async (root, args, context) => {
    try {
        const defulatValue = { name: '', age: 0, job: '', gender: 0, address: '', _thumbnail: '' };

        const {
            UserCreateInput: { email, password },
        } = args;
        const isExistUserEmail = await User.findOneMailIsExist(email);

        if (isExistUserEmail) {
            console.log('error');
            return { Successful: { state: false, code: 400, message: '帳號已存在!!' } };
        }

        const hashpwd = await pwdVerifyHelper.hashPwd(password);

        const composeUser = {
            email,
            password: hashpwd,
            builtTime: new Date(),
            ...defulatValue,
        };

        const newUser = await new User(composeUser).save();
        const clone = JSON.parse(JSON.stringify(newUser));
        const handleClone = __.omit(clone, ['__v', 'password']);
        return {
            id: newUser._id,
            ...newUser,
            token: jwt.sign(handleClone, process.env.SECRETKEY, { expiresIn: process.env.EXPIRESIN }),
            lastLogin: new Date(),
            Successful: { state: true, code: 200, message: '成功' },
        };
    } catch (error) {
        console.log(error);
    }
};
