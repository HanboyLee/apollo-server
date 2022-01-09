const bcrypt = require('bcrypt');

exports.commonHelper = {
    /**
     *深拷貝
     * @param {Object|Array} origin
     * @param {constructs} hashMap - Garbage collection mechanism（垃圾回收機制作用）
     * @returns {Object|Array} cloned value
     */

    deepClone: function (origin = [], hashMap = new WeakMap()) {
        if (origin == 'undefined' || typeof origin !== 'object') {
            return origin;
        }
        if (origin instanceof Date) {
            return new Date();
        }
        const hashkey = hashMap.get(origin);
        if (hashkey) {
            return hashkey;
        }
        let target = new origin.constructor(); // {}||[]
        hashMap.set(origin, target);
        for (const k in origin) {
            if (origin.hasOwnProperty(k)) {
                target[k] = deepClone(origin[k], hashMap);
            }
        }
        return target;
    },
    /**
     *
     * @param {Object} obj 原來的物件
     * @param {String} newKey 新的keyName
     * @param {String} oldKey 舊的keyName
     * @returns {Object} 返回新的物件
     */
    renameKey: function (obj, newKey, oldKey) {
        const deepCopy = JSON.parse(JSON.stringify(obj));
        deepCopy[newKey] = obj[oldKey];
        delete deepCopy[oldKey];
        return deepCopy;
    },
    /**
     *
     * @param {String} str
     * @returns {String} 獲取資料後綴名 ex:.jepg, .png
     */
    getFileExtensions: (str) => str.slice(((str.lastIndexOf('.') - 1) >>> 0) + 2),
    getFileName: (str) => str.slice(0, str.lastIndexOf('.')),
};

module.exports.pwdVerifyHelper = {
    /**
     * 密碼長度驗證必須大於或等於6以上
     * @param {String} pwd
     * @returns {Boolean}
     */
    isPasswordLongEnough: function (pwd) {
        if (pwd.length >= 6) {
            return true;
        }
        return false;
    },
    /**
     * 密碼驗證必須有特殊字符
     * @param {String} pwd
     * @returns {Boolean}
     */
    hasSpecialChar(pwd) {
        var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        if (format.test(pwd)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 驗證密碼複雜度
     * @param {String} pwd
     * @returns {Boolean}
     */
    isPasswordSafe: function (pwd) {
        if (
            // this.hasSpecialChar(password) &&
            this.isPasswordLongEnough(pwd)
        ) {
            return true;
        }
        throw new Error('密碼有誤');
    },
    /**
     *密碼加密
     * @param {string} pwd
     * @returns {string} hash value - convent hash value
     */
    hashPwd: async function (pwd) {
        if (this.isPasswordSafe(pwd)) return await bcrypt.hash(pwd, 10);
    },
    /**
     *密碼解密
     * @param {String} existPwd - password of existed from db
     * @param {String} targetPwd - The password from given value in ront end.
     * @returns {Boolean}
     */
    isPwdEqual: async function (targetPwd, existPwd) {
        return await bcrypt.compare(targetPwd, existPwd);
    },
};
