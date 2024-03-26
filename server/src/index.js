import dotenv from "dotenv";
import connect from "./db/connection.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8080;

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error while Connecting to MongoDB: ${error}`);
  });
