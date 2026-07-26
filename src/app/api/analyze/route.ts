import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
});

export async function POST(request: Request) {
  try {
    const { title, log } = await request.json();

    const prompt = `
You are an experienced Site Reliability Engineer.

Analyze this incident.

Title:
${title}

Log:
${log}

Return ONLY valid JSON.

Do not include markdown.

Do not include \`\`\`json.

Return exactly this structure:

{
  "summary": "...",
  "severity": "...",
  "possibleCause": "...",
  "suggestedFix": [
    "...",
    "...",
    "..."
  ]
}
`;
    console.log("Using model: gemini-3.5-flash");
    console.log("API Key exists:", !!process.env.GEMINI_API_KEY);
    const result = await model.generateContent(prompt);

    // const response = result.response.text();

    // return NextResponse.json({
    //   analysis: response,
    // });
    const response = result.response.text();

    const analysis = JSON.parse(response);

    return NextResponse.json({
      analysis,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to analyze incident.",
      },
      {
        status: 500,
      }
    );
  }
}