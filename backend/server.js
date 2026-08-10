let express = require("express");
let mongoose = require("mongoose");
let userRoutes = require("./routes/userRoutes");
let studentRoutes = require("./routes/studentRoutes");

require("dotenv").config();

let app = express();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", studentRoutes);
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
