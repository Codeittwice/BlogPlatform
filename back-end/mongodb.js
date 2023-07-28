const { MongoClient, ObjectID } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "blog-platform-api";

MongoClient.connect(connectionURL, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database");
  }

  const db = client.db(databaseName);

  console.log(
    "----------------------------------------------------------------"
  );
  db.getCollection("posts")
    .find()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
