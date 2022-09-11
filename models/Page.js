const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionText: {
      type: String,
      required: "Please enter a reaction!",
      maxLength: 280,
    },
    username: {
      type: String,
      required: "Please tell us who wrote this!",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

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
    reactions: [ReactionSchema],
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
