const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    minetype: String,
    filename: String,
    path: String,
    size: Number,
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

modelSchema.methods.idFile = function () {
  return {
    id: this._id,
  };
};

module.exports = mongoose.model("FileUpload", modelSchema);
