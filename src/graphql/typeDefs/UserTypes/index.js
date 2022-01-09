const { gql } = require('apollo-server-express');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    interface UserValidation {
        token: String
    }
    # 訊息
    type Successful {
        state: Boolean
        code: Int
        message: String
    }

    # 這是使用者資訊
    type User implements UserValidation {
        #編號
        id: ID # returns a String
        #信箱
        email: String
        #年紀
        age: Int
        #名字
        name: String
        #電話
        phone: String
        #工作
        job: String
        #性別
        gender: Int
        #地址
        address: String
        #圖片
        _thumbnail: ID
        #令牌
        token: String
        #錯誤
        Successful: Successful
    }
    type UserProfile {
        #編號
        id: ID
        #信箱
        email: String
        #年紀
        age: Int
        #名字
        name: String
        #電話
        phone: String
        #工作
        job: String
        #性別
        gender: Int
        #地址
        address: String
        #圖片
        _thumbnail: ID
        #錯誤
        Successful: Successful
    }

    input UserEditInput {
        id: ID!
        name: String
        age: Int
        job: String
        gender: Int
        address: String
    }

    input UserCreateInput {
        #Account
        email: String!
        #Password
        password: String!
    }
`;

module.exports = { typeDefs };
