// @ts-check

const express = require('express');

const router = express.Router();

const POSTS = [
  {
    title: '1번째 글',
    content: '가나다라마바사',
  },
  {
    title: '2번째 글',
    content: '아자차카타파하',
  },
];

// EJS 사용 파트
// localhost:4000/posts
// posts 서비스 페이지
router.get('/', (req, res) => {
  res.render('posts', { POSTS, postCounts: POSTS.length });
});

// 전체 포스트 목록 보여주기
// localhost:4000/posts/list
router.get('/list', (req, res) => {
  res.send(POSTS);
});

// 새로운 post 등록
// form태그는 body로 받음
router.post('/', (req, res) => {
  console.log(req.body);
  if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      POSTS.push(newPost);
      res.redirect('/posts');
    } else {
      const err = new Error('no data');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 포스트 삭제
router.delete('/:title', (req, res) => {
  const findPostIndex = POSTS.findIndex(
    (post) => post.title === req.params.title
  );
  if (findPostIndex !== -1) {
    POSTS.splice(findPostIndex, 1);
    res.send('삭제 완료');
  } else {
    const err = new Error('해당 ID를 찾을 수 없습니다!');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
