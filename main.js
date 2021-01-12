import writeJsonFile from "write-json-file";
import loadJsonFile from "load-json-file";
import {app, listen} from "./express-app";
import dotenv from "dotenv";

dotenv.config();

let log = console.log;

export * from "./express-app.js";

let initialEmptyData = {
  coffee: 10,
  tea: 20,
  market: ["beans", "mutton"],
};

app.post("/*", async (req, res) => {
  let slug = req.originalUrl.slice(1); // slug is assigned the * value in the `/*` pattern.

  if (slug === "") return res.send("Please provide slug.");

  let slugFilePath = "mydbs/" + slug + ".json";

  if (Object.keys(req.body).length === 0) {
    //   Fetching from `dbPath`
    log("::Fetch::");
    try {
      let fetchedData = await loadJsonFile(slugFilePath);
      res.send(fetchedData);
    } catch (error) {
      await writeJsonFile(slugFilePath, initialEmptyData);
      res.send(initialEmptyData);
    }
  } else {
    //   Saving to `mydb.json`
    if (`$partial` in req.body && typeof req.body.$partial === "object") {
      console.log("::Partial::");
      let old = await loadJsonFile(slugFilePath);
      let updatedData = {...old, ...req.body.$partial}; // * We can add/update many partial properties at once too.
      await writeJsonFile(slugFilePath, updatedData);
      return res.send(updatedData);
    } else {
      // Updating complete database.
      log("::Post::");
      // console.log("::BODY::", req.body);
      await writeJsonFile(slugFilePath, req.body);
      return res.send(req.body);
    }
  }
});
// * Docs: You can send nothing or {} i.e., empty object to fetch from `mydb.json` file.
// * You can send a property like `$partial` to indicate that you don't want to update complete database but some properties only.

//? live testing of library below!!!

if (process.env.isTesting) {
  log("--running testing environemnt--");
  listen();
}
