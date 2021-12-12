const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://frostythesnowman2021:MeatUp123@thesnowman.1ublf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function fetchHistory(eventTitle) {
  const chatHistory = [];
  try {
    await client.connect();
    const database = client.db("TheSnowman");
    const history = database.collection("chats");
    // query for chatHistory with the matching eventId
    const query = { eventTitle: `${eventTitle}` };
    const options = {
      // sort returned documents in ascending order
      sort: { timestamp: 1 },
      // Include only the `username` and `message_body` fields in each returned document
      projection: { _id: 0, username: 1, message_body: 1 },
    };
    const cursor = history.find(query, options);
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    await cursor.forEach((item) => {
      chatHistory.push(item);
    });
  } finally {
    await client.close();
  }
  return chatHistory;
}

module.exports = { fetchHistory };
