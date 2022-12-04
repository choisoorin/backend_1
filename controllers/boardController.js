// @ts-check
// mongoDB용 컨트롤러
const { ObjectId } = require('mongodb');

const connection = require('./dbConnect');
const mongoClient = require('./mongoConnect');

const db = {
  // 모든 글 정보 가져오기
  getAllArticles: async () => {
    // console.log('!');
    // mongoConnect 접속
    const client = await mongoClient.connect();
    // db, collection접근
    const board = client.db('kdt4').collection('board');

    const allArticlesCursor = board.find({});
    const allArticles = await allArticlesCursor.toArray();
    return allArticles;
  },
  // 새로운 글 작성하기
  writeArticle: async (newArticle) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');
    // 방법 2개있음 (라우터(newArticle)에서 처리 or 컨트롤러(아래와같이) 처리 )
    // const writeArticle = {
    //   USERID: newArticle.id,
    //   TITLE: newArticle.title,
    //   CONTENT: newArticle.content,

    const writeResult = await board.insertOne(newArticle);
    if (!writeResult.acknowledged) throw new Error('글 쓰기 실패');
    return true;
  },
  // 특정 ID를 가지는 게시글 찾기
  getArticle: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const findArticle = await board.findOne({ _id: ObjectId(id) });
    if (!findArticle) return false;
    return findArticle;
  },
  // 특정 ID를 가지는 게시글 수정하기
  modifyArticle: async (id, modifyArticle) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const updateResult = await board.updateOne(
      { _id: ObjectId(id) },
      { $set: { TITLE: modifyArticle.title, CONTENT: modifyArticle.content } },
    );

    if (!updateResult.acknowledged) throw new Error('게시글 수정 실패');
    return true;
  },
  // 특정 ID를 가지는 게시글 삭제하기
  deleteArticle: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const deleteResult = await board.deleteOne({ _id: ObjectId(id) });
    if (!deleteResult.acknowledged) throw new Error('게시글 삭제 실패');
    return true;
    // return {
    //   status:200,
    //   result :true,
    //   msg:'게시글 삭제 성공',
    // }
  },
};

module.exports = db;
