// CRUD

const { MongoClient, ObjectId } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const ll = console.log;

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) return ll(err);

  const db = client.db(databaseName);

  db.collection("users").findOne(
    { _id: new ObjectId("5ee031bbf9998f281f56eef2") },
    (error, user) => {
      ll(user);
    }
  );

  const cursor = db.collection("users").find({ class: "Fullstack Engineer" });
  cursor.count((err, users) => {
    ll(users);
  });

  ll("\nTasks:");
  db.collection("users").findOne(
    { _id: ObjectId("5ef177929821cd2d58add69e") },
    (err, task) => ll(task)
  );
  db.collection("users")
    .find({ completed: false })
    .toArray((err, incomplete) => ll(incomplete));
});

function insertItemsFactory() {
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

  return { insert1, insert2, insert3 };
}
