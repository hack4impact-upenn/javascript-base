import { config } from "dotenv";
import mongoose from "mongoose";
import path from "path";

import { generateFakeUsers, IUser } from "./backend/modules/user/model";
import { User } from "./backend/models";

// Connect to database
config({ path: path.resolve(__dirname, "../.env") });
mongoose.connect(process.env.MONGODB_URI as string, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

db.once("open", async function() {
  console.log("> Connected to database");

  // Reset all collections only if development mode
  if (process.env.NODE_ENV !== "production") {
    // Reset the database
    await db.dropDatabase();

    // Generate fake users
    let promises = generateFakeUsers().map((user: IUser) => {
      return new User(user).save();
    });
    Promise.all(promises).then(() => {
      console.log("> Added fake users");
      process.exit();
    });
  }
});
