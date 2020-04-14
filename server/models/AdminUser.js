const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    //$2a$10$sZr71RxslCYKAPijbHQaNez99bdqB5cLpNUtIdJKdJWiUNU/z.aP.
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
});

module.exports = mongoose.model("AdminUser", schema);
