const mongoose = require("mongoose");
const tunnel = require("tunnel-ssh");
const fs = require("fs");

const connectTunnel = () => {
  var config = {
    host: "sv.quanganh.uk",
    port: "22",
    username: "cloud",
    dstHost: "127.0.0.1",
    dstPort: "27017",
    localHost: "127.0.0.1",
    localPort: "27000",
    privateKey: fs.readFileSync("/home/lhqa/.ssh/id_rsa"),
  };

  return new Promise((resolve, reject) => {
    tunnel(config, (error, server) => {
      if (error) {
        console.log("SSH connection error: " + error);
        return reject(error);
      }
      resolve(server);
    });
  });
};

const connectMongo = () =>
  new Promise((resolve, reject) => {
    var db = "mongodb://127.0.0.1:27017/" + DB_NAME;
    if (process.env.NODE_ENV != "production" && SSH_DB_ENABLED) {
      db = "mongodb://127.0.0.1:27000/" + DB_NAME;
    }
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
    if (process.env.NODE_ENV !== "production" && SSH_DB_ENABLED) {
      await connectTunnel();
    }
    await connectMongo();
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
