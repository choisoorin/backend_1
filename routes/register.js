// @ts-check
// 몽구스

const express = require('express');
const db = require('../controllers/userController');

const router = express.Router();

// 회원 가입 페이지
router.get('/', (req, res) => {
  res.render('register');
});

// 회원 가입 처리
router.post('/', async (req, res) => {
  // 중복회원여부 체크 -> 필요없어짐(db 스키마에서 unique)
  const testUser = {
    idd: 'test',
    password: 'test',
  };

  const registerResult = await db.registerUser(req.body);
  if (registerResult.status === 'success') {
    res.send('회원 가입 성공!<br><a href="/login">로그인 페이지로 이동</a>');
  } else if (registerResult.status === 'duplicated') {
    res.status(400);
    res.send(
      '중복된 ID가 존재합니다!<br><a href="register">회원 가입 페이지로 이동</a>',
    );
  } else {
    res.status(500);
    res.send(
      `${registerResult.err}<br><a href="register">회원 가입 페이지로 이동</a>`,
    );
  }
});

module.exports = router;
