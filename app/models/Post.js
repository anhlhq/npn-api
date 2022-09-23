const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FileUpload = require("./FileUpload");
const fs = require("fs");

const modelSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    imageId: {
      type: Schema.Types.ObjectId,
      ref: "FileUpload",
    },
    type: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

modelSchema.methods.toJson = function () {
  const getURLImage = (this.content ?? "").match(
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
  );
  let previewImage = null;
  if (getURLImage) {
    previewImage = getURLImage[0];
  }

  return {
    id: this._id,
    title: this.title,
    content: this.content,
    imageId: this.image_id,
    author: this.author,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    previewImage,
  };
};

module.exports = mongoose.model("Post", modelSchema);
