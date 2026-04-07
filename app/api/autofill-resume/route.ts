import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
// async function extractTextFromPDF(buffer: ArrayBuffer) {
//   const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

//   // ✅ disable worker globally
//   // ✅ HARD disable worker
//   (pdfjsLib as any).GlobalWorkerOptions.workerPort = null;

//   const pdf = await pdfjsLib.getDocument({
//     data: buffer,
//   }).promise;

//   let text = "";

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const content = await page.getTextContent();

//     const strings = content.items.map((item: any) => item.str);
//     text += strings.join(" ") + "\n";
//   }

//   return text;
// }

async function extractTextFromPDF(buffer: ArrayBuffer) {
  const data = await pdfParse(Buffer.from(buffer));
  return data.text;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
console.log(process.env.GEMINI_API_KEY);

const responseSchema = {
  description: "Resume data extraction",
  type: SchemaType.OBJECT,
  properties: {
    profile: {
      type: SchemaType.OBJECT,
      properties: {
        full_name: { type: SchemaType.STRING },
        email: { type: SchemaType.STRING },
        bio: { type: SchemaType.STRING },
        location: { type: SchemaType.STRING },
        social_links: { type: SchemaType.OBJECT },
      },
    },
    experience: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          company: { type: SchemaType.STRING },
          role: { type: SchemaType.STRING },
          start_date: { type: SchemaType.STRING },
          end_date: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
        },
      },
    },
    projects: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          tech_stack: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
          git_link: { type: SchemaType.STRING },
          live_link: { type: SchemaType.STRING },
        },
      },
    },
    achievements: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          category: { type: SchemaType.STRING },
          issuer: { type: SchemaType.STRING },
          date: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
        },
      },
    },
    skills: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
  },
} as any;

export async function POST(req: NextRequest) {
  try {
    // console.log("Step 1: Request received");
    const { url } = await req.json();
    // console.log("Step 2: URL =", url);

    const pdfBuffer = await fetch(url).then(res => res.arrayBuffer());
    // console.log("Step 3: PDF fetched");
    const data = await extractTextFromPDF(pdfBuffer);
    // console.log("Step 4: Text extracted");

    let rawText = data;
    if (rawText.length > 15000) {
      rawText = rawText.slice(0, 15000);
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const prompt = `Extract structured data from this resume:
    ${rawText}`;

    const result = await model.generateContent(prompt);
    // console.log("Step 5: Sending to Gemini");
    const parsed = JSON.parse(result.response.text());

    // console.log(parsed);
    return NextResponse.json(parsed);

  } catch (err: any) {
    console.log("Error: ", err);

    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}