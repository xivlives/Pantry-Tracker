import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const generationConfig = {
    maxOutputTokens: 500,
    temperature: 0.7,
  };
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig});

export async function POST(req) {
	const data = await req.json();
  // console.log(data)
	const prompt = data.body;
  // console.log(prompt)
	
  const result = await model.generateContent(prompt);
  // console.dir(result)
  if (!result.response || !result.response.candidates || !result.response.candidates.length) {
    // Handle empty response
    return NextResponse.json({ message: 'No text generated' }, { status: 400 });
  }

  const text = result.response.candidates[0].content.parts[0].text;
   
  return NextResponse.json({ text }, { status: 200 });

}