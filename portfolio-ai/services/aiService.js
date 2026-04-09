import { GoogleGenerativeAI } from "@google/generative-ai";
import PQueue from "p-queue";
import dotenv from "dotenv";

dotenv.config();
// console.log(buildPrompt);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//  create model once
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

//  queue
const queue = new PQueue({ concurrency: 2 });

//  timeout
const withTimeout = (promise, ms = 8000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    ),
  ]);
};

export const generateAIResponse = async (prompt) => {
  //  prevent overload
  if (queue.size > 50) {
    return "Server is busy. Please try again later.";
  }

  return queue.add(async () => {
    try {
      const result = await withTimeout(
        model.generateContent(prompt),
        8000
      );

      return result.response.text();

    } catch (err) {
      console.error("AI ERROR FULL:", err);

      //  retry once
      if (err.status === 429) {
        await new Promise(r => setTimeout(r, 2000));

        try {
          const retry = await model.generateContent(prompt);
          return retry.response.text();
        } catch (retryErr) {
          return "Too many requests. Please try again later.";
        }
      }

      return "Jiya is temporarily unavailable.";
    }
  });
};