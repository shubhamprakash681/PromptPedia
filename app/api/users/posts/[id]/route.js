import Prompt from "@models/Prompt";
import { connectToDb } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    return new Response(`Failed to load user's posts`, {
      status: 500,
    });
  }
};
