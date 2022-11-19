// @ts-check

/* express 기본 설정 */
const express = require('express');

const app = express();
const userRouter = express.Router();
const POST = 4000;

app.set('view engine', 'ejs');

// css 적용을 위한 views 폴더 접근
// Static 은 브라우저에서 접근이 가능한 폴더의 위치를 지정해 주는 역할
app.use(express.static('views'));
app.use(express.static('public'));

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

// 유저 라우터, 전체 회원 목록 조회
userRouter.get('/', (req, res) => {
  res.send(USER);
});

// 배열 find 예제
// const arr = [1, 2, 3, 4, 5, 6, 7];

// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }

// userRouter.get('/:id', (req, res) => {
//     const findArr = arr.find((el) => {
//       console.log('elemnet', el);
//       return el === 5;
//     });
//     console.log('result', findArr);
//   });

// 특정 ID를 가진 회원 정보 조회
userRouter.get('/id/:id', (req, res) => {
  const findUser = USER.find((user) => {
    console.log(user);
    return user.id === req.params.id;
  });
  if (findUser) {
    res.send(findUser);
  } else {
    res.send('ID를 못찾았습니다.');
  }
});

// 새로운 회원 등록
userRouter.post('/', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
    };
    USER.push(newUser);
    res.send('회원 등록 완료!');
  } else {
    res.send('정확한 쿼리를 입력하세요! Unexpected Query');
  }
});

// 회원 수정 API
userRouter.put('/:id', (req, res) => {
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
      res.send('ID를 찾을 수 없습니다!');
    }
  } else {
    console.log('Unexpected Query');
    res.send('정확한 쿼리를 입력하세요! Unexpected Query');
  }
});

// 회원 삭제 API
userRouter.delete('/:id', (req, res) => {
  const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
  if (findUserIndex !== -1) {
    USER.splice(findUserIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    res.send('해당 ID를 찾을 수 없습니다.');
  }
});

// 동적 웹 그리기
// http://localhost:4000/users/show
userRouter.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
  res.write('<h1>Hello, Dynamic Web page!</h1>');
  for (let i = 0; i < USER.length; i++) {
    res.write(`<h2>USER id is ${USER[i].id}`);
    res.write(`<h2>USER name is ${USER[i].name}`);
    res.write(`<h2>USER email is ${USER[i].email}`);
  }
  res.end('');
});

// EJS 사용 파트
// http://localhost:4000/users/ejs
userRouter.get('/ejs', (req, res) => {
  res.render('index', { USER, userCounts: USER.length });
});

app.use('/users', userRouter);

app.listen(POST, () => {
  console.log(`서버는 ${POST}번에서 실행 중입니다.`);
});
