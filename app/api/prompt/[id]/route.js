import Prompt from "@models/Prompt";
import { connectToDb } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch prompt", {
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDb();

    const updatedPrompt = await Prompt.findByIdAndUpdate(params.id, {
      prompt,
      tag,
    });

    if (!updatedPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    await updatedPrompt.save();
    return new Response(JSON.stringify(updatedPrompt), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to delete the prompt", {
      status: 500,
    });
  }
};
