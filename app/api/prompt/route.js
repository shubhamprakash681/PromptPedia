import Prompt from "@models/Prompt";
import { connectToDb } from "@utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDb();

    // keyword
    const spl = req.url.split("?");
    const keyword = spl[spl.length - 1].split("=")[1];
    // console.log("here, query: ", keyword);

    const prompts = await Prompt.find().populate("creator");

    if (keyword) {
      const creatorFiltered = prompts.filter((prompt) =>
        prompt.creator.username.toLowerCase().includes(keyword.toLowerCase())
      );

      const tagFiltered = prompts.filter((prompt) =>
        prompt.tag.toLowerCase().includes(keyword.toLowerCase())
      );

      return new Response(
        JSON.stringify([...creatorFiltered, ...tagFiltered]),
        {
          status: 200,
        }
      );
    }

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to get prompts...", {
      status: 500,
    });
  }
};
