const mongoose = require("mongoose");

function connectAsync() {
  return new Promise((resolve, reject) => {
    // Connect to MongoDB
    mongoose.connect(config.database.connectionString, {}, (err, db) => {
      if (err) return reject(err);
      return resolve(db);
    });
  });
}

connectAsync()
  .then((db) => console.log(`Connection to MongoDB established.`))
  .catch((err) => console.log(`Error while connecting to Mongodb: ${err}`));
