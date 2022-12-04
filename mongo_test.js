// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://soorin:soorin427!@cluster0.y2f7962.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();
  const member = client.db('kdt4').collection('member');

  const deleteResult = await member.deleteMany({});

  if (!deleteResult.acknowledged) throw new Error('삭제이상');

  const insertResult = await member.insertMany([
    {
      id: 'tetz',
      name: '이효석',
      isMarried: false,
      age: 38,
    },
    {
      id: 'eric',
      name: '김성재',
      isMarried: true,
      age: 38,
    },
    {
      id: 'ailee',
      name: '이재연',
      isMarried: false,
      age: 35,
    },
    {
      id: 'alex',
      name: '하승호',
      isMarried: false,
      age: 34,
    },
    {
      id: 'uncle',
      name: '박동희',
      isMarried: true,
      age: 38,
    },
  ]);
  if (!insertResult.acknowledged) throw new Error('삽입 실패');

  // ted 삽입
  const insertOneResult = await member.insertOne({
    id: 'ted',
    name: '방성민',
    isMarried: false,
    age: 37,
  });
  if (!insertOneResult.acknowledged) throw new Error('삽입 실패');

  // ted 수정
  const updateOneResult = await member.updateOne(
    { id: 'ted' },
    { $set: { isMarried: true } },
  );
  if (!updateOneResult.acknowledged) throw new Error('수정 실패');

  // 데이터 하나만 출력하는 코드
  //   const dataOne = await member.findOne({ id: 'ted' });
  //   console.log(dataOne);

  // 나이가 38살 이상이면서 결혼한 회원의 목록 출력
  //   const find1 = member.find({
  //     $and: [{ age: { $gte: 38 } }, { isMarried: true }],
  //   });
  //   await find1.forEach(console.log);

  // 나이가 36살 이하이거나 결혼한 회원 목록 출력
  //   const find2 = member.find({
  //     $or: [{ age: { $lte: 36 } }, { isMarried: true }],
  //   });
  //   await find2.forEach(console.log);

  // 업데이트 타임 적용 코드
  const updateManyResult = await member.updateMany(
    {},
    { $set: { updateTime: new Date(Date.now()) } },
  );
  if (!updateManyResult.acknowledged) throw new Error('전체데이터 수정 실패');

  // 전체데이터 출력코드
  const findCursor = member.find({});
  const data = await findCursor.toArray();
  console.log(data);

  client.close();
}

main();
