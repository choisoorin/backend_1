// @ts-check
// 익스프레스 패키지 모듈 불러옴 (주소값없으면 node_modules에서 불러옴)
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // 백엔드에서 쿠키사용하기
  // res.cookie('alert', true, {
  //   expires: new Date(Date.now() + 1000 * 60),
  //   httpOnly: true,
  // });

  // 실습
  // res.cookie('name', '최수린', {
  //   expires: new Date(Date.now() + 1000 * 60),
  //   httpOnly: true,
  // });
  // console.log(req.cookies);
  // const key = Object.keys(req.cookies)[0];
  // console.log(key);
  // res.render('index', { key: key, value: req.cookies[key] });
  //
  // console.log(req.cookies.alert);
  // console.log(req.cookies.soo);
  // res.render('index', { alert: req.cookies.alert });

  // res.render('index', { cookie: req.cookies.cookie });

  res.render('index', { popup: req.cookies.popup });
});

router.get('/cookie', (req, res) => {
  res.cookie('cookie', true, {
    // expires: new Date(Date.now() + 1000 * 5),
    maxAge: 1000 * 60,
    httpOnly: false,
  });
  res.clearCookie('cookie');
  res.send('쿠키 굽기 성공!');
});

// 실습
router.post('/cookie', (req, res) => {
  res.cookie('popup', 'hide', {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send('쿠키 생성 성공');
});

// 중요!
module.exports = router;
