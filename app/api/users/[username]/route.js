import Prompt from "@models/Prompt";
import User from "@models/User";
import { connectToDb } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();

    const username = params.username;
    const email = `${username}@gmail.com`;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return new Response("User not exists", {
        status: 404,
      });
    }

    const prompts = await Prompt.find({
      creator: user._id,
    }).populate("creator");

    return new Response(
      JSON.stringify({
        prompts,
        user,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response("Failed to load user's posts", {
      status: 500,
    });
  }
};
