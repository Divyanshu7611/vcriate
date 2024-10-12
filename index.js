const express = require("express");
const app = express();

const dotenv = require("dotenv");
const database = require("./config/dbConnect");
const authRoute = require("./routes/authRoute");
const questionRoute = require("./routes/questionRoute");
const quizRoute = require("./routes/quizRoute");
const resultRoute = require("./routes/resultRoute");
const cookieParser = require("cookie-parser");
dotenv.config();

const PORT = process.env.PORT || 4000;
database.connect();

app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/quiz", quizRoute);
app.use("/api/v1/result", resultRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is Running",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

module.exports = app;
