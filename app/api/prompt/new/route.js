import Prompt from "@models/Prompt";
import { connectToDb } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDb();

    const newPrompt = await Prompt.create({
      creator: userId,
      tag,
      prompt,
    });

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (err) {
    return new Response("Failed to create a new Prompt", {
      status: 500,
    });
  }
};
