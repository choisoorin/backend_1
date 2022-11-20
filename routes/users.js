// @ts-check

const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'soorin',
    name: '최수린',
    email: 'ss@naver.com',
  },
  {
    id: 'son',
    name: '손흥민',
    email: 'son@naver.com',
  },
];

// EJS 사용 파트
// http://localhost:4000/users
router.get('/', (req, res) => {
  res.render('users', { USER, userCounts: USER.length });
});

// 유저 라우터, 전체 회원 목록 조회
// http://localhost:4000/users/list
router.get('/list', (req, res) => {
  res.send(USER);
});

// 배열 find 예제
// const arr = [1, 2, 3, 4, 5, 6, 7];

// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }

// router.get('/:id', (req, res) => {
//     const findArr = arr.find((el) => {
//       console.log('elemnet', el);
//       return el === 5;
//     });
//     console.log('result', findArr);
//   });

// 특정 ID를 가진 회원 정보 조회
router.get('/id/:id', (req, res) => {
  const findUser = USER.find((user) => {
    console.log(user);
    return user.id === req.params.id;
  });
  if (findUser) {
    res.send(findUser);
  } else {
    const err = new Error('ID를 찾을 수 없습니다!');
    err.statusCode = 404;
    throw err;
  }
});

// 새로운 회원 등록
router.post('/', (req, res) => {
  console.log(req.body);
  if (Object.keys(req.query).length > 0) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.send('회원 등록 완료!');
    } else {
      const err = new Error('정확한 쿼리를 입력하세요! Unexpected Query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      USER.push(newUser);
      res.redirect('/users');
    } else {
      const err = new Error('정확한 쿼리를 입력하세요! Unexpected Query');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 수정 API
router.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
    if (findUserIndex !== -1) {
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[findUserIndex] = modifyUser;
      res.send('회원 정보 수정 완료!');
    } else {
      const err = new Error('ID를 찾을 수 없습니다!');
      err.statusCode = 404;
      throw err;
    }
  } else {
    console.log('Unexpected Query');
    const err = new Error('정확한 쿼리를 입력하세요! Unexpected Query');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 삭제 API
router.delete('/:id', (req, res) => {
  const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
  if (findUserIndex !== -1) {
    USER.splice(findUserIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    const err = new Error('해당 ID를 찾을 수 없습니다!');
    err.statusCode = 404;
    throw err;
  }
});

// 동적 웹 그리기
// http://localhost:4000/users/show
// router.get('/show', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
//   res.write('<h1>Hello, Dynamic Web page!</h1>');
//   for (let i = 0; i < USER.length; i++) {
//     res.write(`<h2>USER id is ${USER[i].id}`);
//     res.write(`<h2>USER name is ${USER[i].name}`);
//     res.write(`<h2>USER email is ${USER[i].email}`);
//   }
//   res.end('');
// });

module.exports = router;
