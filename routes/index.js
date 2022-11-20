// @ts-check
// 익스프레스 패키지 모듈 불러옴 (주소값없으면 node_modules에서 불러옴)
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

// 중요!
module.exports = router;
