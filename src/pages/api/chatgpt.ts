import { openai } from "@/utils/chatgpt";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chatHistory = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: chatHistory,
    temperature: 1,
    max_tokens: 200,
  });

  const chatGptResponse = completion.data.choices[0].message?.content;

  res.status(200).json({ chatGptResponse });
}
