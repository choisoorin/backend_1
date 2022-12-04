// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://soorin:soorin427!@cluster0.y2f7962.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect((err, db) => {
//   console.log(db);
//   client.close();
// });

// 1
client.connect((err, db) => {
  const user = client.db('kdt4').collection('user');

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
            user.updateMany(
              { age: { $gte: 5 } },
              { $set: { name: '5살이상' } },
              (err, updateManyResult) => {
                if (updateManyResult?.acknowledged) {
                  const findCursor = user.find({});
                  findCursor.toArray((err, data) => {
                    console.log(data);
                    client.close();
                  });
                }
              },
            );
          }
        },
      );
    }
  });
});
