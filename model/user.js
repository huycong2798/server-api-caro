const { db } = require("../db");
const bcrypt = require("bcrypt");
const USERS = "users";
const SALT_ROUNDS = 10;
const get = async (email) => {
  return await db.records.collection(USERS).findOne({ email });
};
exports.get = get;
exports.vailidPassWord = async (email, password) => {
  const user = await get(email);
  if (user &&  bcrypt.compareSync(password, user.password)) return user;
  return null;
};
exports.register = async (email, password) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return await db.records.collection(USERS).insertOne({
    email,
    password: hash,
    name: "Noname",
    p_number: "",
  });
};
exports.validJwtPayloadId = async (id) => {
  return await db.records.collection(USERS).findOne({ email: id });
};
exports.editInfo = async (email, info) => {
  return await db.records
    .collection(USERS)
    .updateOne({ email: email }, { $set: { name: info.name,p_number: info.p_number } });
};
