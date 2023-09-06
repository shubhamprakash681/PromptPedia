import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "PromptPedia",
      useNewURLParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Connected to db successfully");
  } catch (err) {
    console.log(err);
  }
};
