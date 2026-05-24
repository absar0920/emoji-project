import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCached, setCached } from "./redis";
import crypto from "crypto";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export function hashKey(input: string): string {
  return crypto.createHash("md5").update(input).digest("hex").slice(0, 12);
}

export async function callGemini(
  prompt: string,
  cacheKey?: string,
  retries: number = 2
): Promise<Record<string, unknown>> {
  if (cacheKey) {
    const cached = await getCached<Record<string, unknown>>(cacheKey);
    if (cached) return cached;
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("No JSON object found in response");
      }
      const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

      if (cacheKey) {
        await setCached(cacheKey, parsed, 3600);
      }

      return parsed;
    } catch (err) {
      if (attempt < retries) {
        console.log(`Gemini call failed (attempt ${attempt + 1}/${retries + 1}), retrying...`);
        continue;
      }
      throw err;
    }
  }
  throw new Error("Unreachable");
}
