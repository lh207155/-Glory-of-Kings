const express = require("express");

const app = express();
app.set("secret", "f4ds561f6f1a9fa");
app.use(require("cors")());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
require("./routes/admin")(app);
require("./routes/web")(app);
require("./plugins/db")(app);
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
//dsadadsada
