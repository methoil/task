// CRUD

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new mongodb.ObjectId();

const ll = console.log;

ll(id.id);
ll(id.id.length);
ll(id.toHexString());
ll(id.toHexString().length);

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) return ll(err);

  const db = client.db(databaseName);

  const insert1 = () =>
    db.collection("users").insertOne(
      {
        _id: id,
        name: "Methos",
        class: "Demon Hunter",
      },
      (error, result) => {
        if (error) {
          return ll("Unable to insert user");
        }

        ll(result.ops);
      }
    );
  insert1();

  const insert2 = () =>
    db.collection("users").insertMany(
      [
        {
          name: "Jen",
          class: "Designer",
        },
        {
          name: "Gunther",
          class: "General",
        },
      ],
      (err, result) => {
        if (err) {
          return ll("Unable to insert docs", err);
        }
        ll(result.ops);
      }
    );

  const threeEntries = [
    {
      description: "task1",
      completed: true,
    },
    {
      description: "task2",
      completed: false,
    },
    {
      description: "task3",
      completed: true,
    },
  ];
  const insert3 = () =>
    db.collection("users").insertMany(threeEntries, (err, result) => {
      if (err) {
        return ll("error", err);
      }

      ll(result.ops);
    });
  insert3();
});