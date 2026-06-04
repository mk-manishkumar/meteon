import "dotenv/config";
import Groq from "groq-sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildWeatherPrompt } from "../prompt/aiPrompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const cache = new Map<string, { data: unknown; timestamp: number }>();

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { weather, air } = req.body;

    const cacheKey = JSON.stringify({
      latitude: weather.latitude,
      longitude: weather.longitude,
      temperature: weather.current.temperature_2m,
      aqi: air.hourly.us_aqi?.[0],
    });

    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return res.status(200).json(cached.data);
    }

    const prompt = buildWeatherPrompt(weather, air);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content?.trim();

    if (!text) throw new Error("Empty Groq response");

    const cleaned = text.replaceAll("```json", "").replaceAll("```", "").trim();

    const parsed = JSON.parse(cleaned);

    cache.set(cacheKey, {
      data: parsed,
      timestamp: Date.now(),
    });

    return res.status(200).json(parsed);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      summary: "Unable to generate weather summary.",
      clothing: "Unable to generate clothing recommendation.",
      bestTimeOutside: "Unable to determine the best time outside.",
    });
  }
}
