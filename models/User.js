const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const dateFormat = require("../utils/dateFormat");
//validating email
const validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

//creating the user schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: "Please enter a username!",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Please provide an email address!",
      validate: [validateEmail, "PLease provide a valid email!"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: "Please enter a password!",
      trim: true,
    },
    pages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Page",
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

//NOTE: DO realize that mongoose doesnt invoke middleware in update() so the password must be save() to update a password
//hasing password before it is saved to database
UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// password verification implementation
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.passowrd, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//create the User model using our schema
const User = model("User", UserSchema);

module.exports = User;
