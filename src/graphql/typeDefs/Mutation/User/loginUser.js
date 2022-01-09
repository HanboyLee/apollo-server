const { User } = require('../../../../models');
const jwt = require('jsonwebtoken');
const { pwdVerifyHelper } = require('../../../../utils/common');
const __ = require('lodash');

module.exports = async (parent, args, req) => {
    try {
        const {
            UserCreateInput: { email, password: targetPwd },
        } = args;
        const user = await User.findByEmail(email);

        if (!user) {
            return { Successful: { state: false, code: 400, message: '此帳號不存在!!' } };
        }

        const verifyPwd = await pwdVerifyHelper.isPwdEqual(targetPwd, user.password);

        if (!verifyPwd) {
            return { Successful: { state: false, code: 400, message: '密碼有誤!!' } };
        }
        const clone = JSON.parse(JSON.stringify(user));
        const handleClone = __.omit(clone, ['__v', 'password']);
        return {
            id: user._id,
            ...clone,
            Successful: { state: true, code: 200, message: '成功' },
            token: jwt.sign(handleClone, process.env.SECRETKEY, { expiresIn: process.env.EXPIRESIN }),
            lastLogin: new Date(),
        };
    } catch (error) {
        console.log(error);
    }
};
