const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    image_id: {
      type: Schema.Types.ObjectId,
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
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    images: this.images,
    author: this.author,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("Post", modelSchema);
