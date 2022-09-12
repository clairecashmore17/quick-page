const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PageSchema = new Schema(
  {
    html_page: {
      type: String,
      required: "Please provide html for your page!",
    },
    style_page: {
      type: String,
      required: "Please provide css for your page!",
    },
    title: {
      type: String,
      required: "Please provide a title for your piece!",
    },
    entry_code: {
      type: String,
      required: "Please provide a code to share your page!",
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const Page = model("Page", PageSchema);

module.exports = Page;
