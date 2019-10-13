const {db} = require('../db');
const bcrypt = require('bcrypt');
const USERS = 'users';
const SALT_ROUNDS = 10;
exports.get = async (email) => {
    return await db.records.collection(USERS).findOne({email});
};
exports.vailidPassWord = async (email,password) => {
    return await db.records.collection(USERS).findOne({email,password});
};
exports.register = async (email, password) => {
   const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return await db.records.collection(USERS).insertOne({email, password:hash,name:'',
        p_number:'',address:'',isActivated: false});
};