// @ts-check
// mongoDB용 컨트롤러

const mongoClient = require('./mongoConnect');

const db = {
  getUsers: (cb) => {
    connection.query('SELECT * FROM mydb.user;', (err, data) => {
      if (err) throw err;
      // console.log(data);
      cb(data);
    });
  },
  // 유저 중복 체크
  userCheck: async (userId) => {
    // mongodb에 접속!!
    const client = await mongoClient.connect();
    // db, collection 설정!!
    const user = client.db('kdt4').collection('user');

    const findUser = await user.findOne({ id: userId });
    // console.log(findUser);
    if (!findUser) return false;
    return findUser;
  },
  // 회원가입
  registerUser: async (newUser) => {
    const client = await mongoClient.connect();
    const user = client.db('kdt4').collection('user');

    const registerResult = await user.insertOne(newUser);
    if (!registerResult.acknowledged) throw new Error('회원 등록 실패');
    return true;
  },
};

module.exports = db;
