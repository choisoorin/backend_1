// @ts-check
// mongoose 컨트롤러
const connect = require('./mongooseConnect');

const User = require('../models/user');

// db접속코드!
connect();

const db = {
  // 유저 중복 체크 -> 스키마에서 unique로 중복체크 해주기 때문에 회원가입시 해당 코드 필요없음!
  userCheck: async (userId) => {
    try {
      const findUser = await User.findOne({ id: userId });
      console.log(findUser);
      if (!findUser) return false;
      return findUser;
    } catch (err) {
      console.error(err);
      return { status: 'unexpected', err };
    }
  },
  // 회원가입 -> try, catch문 변경 및 코드고도화
  registerUser: async (newUser) => {
    try {
      const registerResult = await User.create(newUser);
      console.log(registerResult); // 객체가들어오면 회원가입성공
      if (!registerResult) throw new Error('회원 등록 실패');
      return { status: 'success' };
    } catch (err) {
      console.error(err);
      if (err.code === 11000) return { status: 'duplicated' };
      return { status: 'unexpected', err };
    }
  },
};

module.exports = db;
