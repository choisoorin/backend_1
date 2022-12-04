// @ts-check

// 기본 연결코드
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://soorin:soorin427!@cluster0.y2f7962.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// 공용와이파이 연결시 !! 2.2ver
// let MongoClient = require('mongodb').MongoClient;

// let uri =
//   'mongodb://soorin:soorin427!@ac-2eavgtb-shard-00-00.y2f7962.mongodb.net:27017,ac-2eavgtb-shard-00-01.y2f7962.mongodb.net:27017,ac-2eavgtb-shard-00-02.y2f7962.mongodb.net:27017/?ssl=true&replicaSet=atlas-unuq6h-shard-0&authSource=admin&retryWrites=true&w=majority';
// const client = new MongoClient(uri);
//

// const client = MongoClient.connect(uri)

// MongoClient.connect(uri, function (err, client) {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

module.exports = client;
