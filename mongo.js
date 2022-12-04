// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://soorin:soorin427!@cluster0.y2f7962.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const user = client.db('kdt_test').collection('test');
  user.deleteMany({}, (err, deleteResult) => {
    if (deleteResult?.acknowledged) {
      user.insertMany(
        [
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
        ],
        (err, insertResult) => {
          if (insertResult?.acknowledged) {
            const cursor = user.find({
              $or: [{ age: { $gte: 5 } }, { name: 'crong' }],
            });

            cursor.toArray((err, data) => {
              console.log(data);
              client.close();
            });
          }
        },
      );
    }
  });
});
