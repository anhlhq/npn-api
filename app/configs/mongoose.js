const mongoose = require("mongoose");

const connectMongo = () =>
  new Promise((resolve, reject) => {
    let db =
      process.env.NODE_ENV !== "production"
        ? "mongodb://127.0.0.1:27017/npn-api"
        : "mongodb://clouddb:qaqa1234@sv.quanganh.uk:27017/npn";
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    });
    db = mongoose.connection;
    db.on("error", (err) => reject(err));
    db.once("open", () => resolve());
  });

exports.connect = async () => {
  try {
    await connectMongo();
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
