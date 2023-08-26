import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Comic from "./routes/Comic.js";
import fileUpload from "express-fileupload";

import { configDotenv } from "dotenv";
configDotenv();

const PORT = process.env.PORT || 5000;
const app = express();

const corsOption = {
  origin: process.env.DOMAIN_ORIGIN,
};

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send({
    message: "Hello from Comic API ",
  });
});

app.use("/api/comic", Comic);

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
