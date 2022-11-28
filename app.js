// @ts-check

/* express 기본 설정 */
// 서버구동
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
// const PORT = 4000;
// env사용
const PORT = process.env.PORT;

// require('./routes'); index생략가능
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const dataRouter = require('./routes/data');
const dbBoardRouter = require('./routes/dbBoard');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

// 서버에 대한 셋팅값 (app.  )
app.set('view engine', 'ejs');

// app.use(cookieParser());
app.use(cookieParser('soorin'));
app.use(
  session({
    // 세션 옵션값 설정
    secret: 'soo',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1000 * 60 * 60,
    // },
  }),
);

// Static 은 브라우저에서 접근이 가능한 폴더의 위치를 지정해 주는 역할
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// localhost:4000
app.use('/', indexRouter);
// 라우터 쓰지 않고 서버 자체에서 랜더링처리 방법(라우터 생성해서 만드는게 좋음)
// app.get('/', (req, res) => {
//   res.render('index');
// });

// localhost:4000/users
app.use('/users', userRouter);

app.use('/posts', postsRouter);

app.use('/board', boardRouter);

// db
app.use('/data', dataRouter);
app.use('/dbBoard', dbBoardRouter);

app.use('/register', registerRouter);
app.use('/login', loginRouter);

// err를 받는 코드 : 서버코드의 미들웨어 가장 마지막에 작성해야함
app.use((err, req, res, next) => {
  // 서버사이드에서는 어떤 에러인지 알아야하므로 console.log
  console.log(err.stack);
  // || 500 중요!
  res.status(err.statusCode || 500);
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다.`);
});
