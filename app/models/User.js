const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/JWT");

const modelSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    displayName: {
      type: String,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

modelSchema.methods.hashPassword = function (password) {
  let self = this;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, __SALT_WORK_FACTOR, function (err, hash) {
      if (err) return reject(err);
      self.password = hash;
      resolve(self);
    });
  });
};

modelSchema.methods.checkMatchPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

modelSchema.methods.toJsonWithToken = function () {
  const token = generateToken(this);
  return {
    id: this._id,
    username: this.username,
    displayName: this.displayName,
    lastActivity: this.lastActivity,
    token: token,
  };
};

modelSchema.methods.toJsonWithoutToken = function () {
  return {
    id: this._id,
    username: this.username,
    displayName: this.displayName,
    lastActivity: this.lastActivity,
  };
};

const User = mongoose.model("User", modelSchema);

module.exports = User;
