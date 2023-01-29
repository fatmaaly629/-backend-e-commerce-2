const mongoose = require("mongoose");

const dbConection = () => {
  mongoose.connect(process.env.DB_URL).then((conn) => {
    console.log(`database connected:${conn.connection.host}`);
  });
  // .catch((err) => {
  //   console.error(`Database Erroe: ${err}`);
  //   process.exit(1);
  // });
};
module.exports = dbConection;
