import express from "express";
const path = require("path");
let log = console.log;

export const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3000;

// let static_typora_realtive_path = __dirname + "\\" + "static_typora";
let static_typora_realtive_path = path.join(__dirname, "static_typora"); // path.join is important, coz __dirname could use \ or / based on os its running on, and thus we'd accordingly need to use / or \ to join the dirname with the file name thus, path.join does its magic nicely.

// app.use("/", express.static("static_typora"));// This works for same package, but doesn't if used as dependency.
app.use("/", express.static(static_typora_realtive_path)); // This works for the case of dependency too.

log(static_typora_realtive_path);

// app.get("/", async (req, res) => {
//   res.send("running2...");
// });

export const listen = (customPort) => {
  const portInUse = customPort ? customPort : port;
  app.listen(portInUse, () => {
    console.log(`Object database server running @ http://localhost:${portInUse}`);
  });
};
