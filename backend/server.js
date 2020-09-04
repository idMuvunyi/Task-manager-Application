const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully !");
});

// import Links from both Tasks and Employees model
const taskRouter = require("./routes/tasks");
const employeeRouter = require("./routes/employees");

app.use("/tasks", taskRouter);
app.use("/employees", employeeRouter);
//

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
