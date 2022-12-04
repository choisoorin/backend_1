// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://soorin:soorin427!@cluster0.y2f7962.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// async function main() {
//   const db = await client.connect();
//   console.log(db);
//   client.close();
// }

// main();

async function main() {
  await client.connect();

  const user = client.db('kdt4').collection('user');

  const deleteResult = await user.deleteMany({});

  if (!deleteResult.acknowledged) throw new Error('삭제이상');
  //   if(deleteResult.acknowledged){
  //     user.insertMany(~~)
  //   };

  //   const insertResult = await user.insertMany([
  //     {
  //       name: 'pororo',
  //       age: 5,
  //     },
  //     {
  //       name: 'loofy',
  //       age: 6,
  //     },
  //     {
  //       name: 'crong',
  //       age: 4,
  //     },
  //   ]);

  //   if (!insertResult.acknowledged) throw new Error('삽입 이상');

  //   const dataCursor = user.find({});
  //   const data = await dataCursor.toArray();

  //   console.log(data);

  // 실습
  const insertResult = await user.insertMany([
    {
      name: 'pororo',
      age: 5,
    },
    {
      name: 'loopy',
      age: 6,
    },
    {
      name: 'crong',
      age: 4,
    },
  ]);
  if (!insertResult.acknowledged) throw new Error('삽입이상');

  //   const updateManyResult = await user.updateMany(
  //     { age: { $gte: 5 } },
  //     { $set: { name: '5살이상' } },
  //   );

  //   if (!updateManyResult.acknowledged) throw new Error('삭제이상');

  // findOne
  //   const data = await user.findOne({ name: 'loopy' });
  //   console.log(data);

  // find (find는 await 필요x)
  const dataCursor = user.find({ age: { $gte: 5 } });
  const data = await dataCursor.toArray();
  // 한줄로사용 const data = await user.find({ age: { $gte: 5 } }).toArray();

  console.log(data);

  //   const findCursor = user.find({});
  //   const data = await findCursor.toArray();
  //   console.log(data);

  client.close();
}

main();
