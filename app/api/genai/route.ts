import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();

  const prompt = reqBody.data.prompt;
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
    systemInstruction:
      "You're a helpful assistant. You are also an expert on data science and visualization. Provide all answers in simple and plain language. Explain the concept of data science and visualization as to a 5 year old but keep the number of words few.",
  });
  const stramingResponse = await model.generateContentStream(prompt);
  return new StreamingTextResponse(GoogleGenerativeAIStream(stramingResponse));
}
