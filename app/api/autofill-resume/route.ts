import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();

    // 1️⃣ Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // console.log(authError);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Get resume path from profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("resume_url")
      .eq("id", user.id)
      .single();

    // console.log(profile);

    if (profileError || !profile?.resume_url) {
      return NextResponse.json(
        { error: "No resume uploaded" },
        { status: 400 },
      );
    }

    // 3️⃣ Generate signed URL
    // const { data: signedUrlData, error: signedError } = await supabase.storage
    //   .from("resume")
    //   .createSignedUrl(profile.resume_url, 60);

    const { data: publicURL } = supabase.storage
      .from("resume")
      .getPublicUrl(`${user.id}/resume.pdf`);

    console.log(publicURL.publicUrl);

    // console.log(signedUrlData);

    if (!publicURL.publicUrl) {
      console.log("yaha se aaya");
      return NextResponse.json(
        { error: "Unable to access resume" },
        { status: 500 },
      );
    }

    const parser = new PDFParse({
      url: "https://xxexahipalifxahaqseu.supabase.co/storage/v1/object/public/resume/c63b7077-982d-424e-8710-45591e675a35/resume.pdf",
    });
    const data = await parser.getText();
    console.log(data.text);

    // 4️⃣ Download file buffer
    // const fileRes = await fetch(publicURL.publicUrl);
    // const buffer = Buffer.from(await fileRes.arrayBuffer());

    // console.log("File size:", buffer.length);

    // let rawText = "";

    // if (profile.resume_url.endsWith(".pdf")) {
    //   const parser = new PDFParse({
    //     url: "https://xxexahipalifxahaqseu.supabase.co/storage/v1/object/public/resume/c63b7077-982d-424e-8710-45591e675a35/resume.pdf",
    //   });
    //   //   const pdfData = await PDFParse(buffer);
    //   const result = await parser.getText();
    //   rawText = result.text;
    //   // } else if (profile.resume_url.endsWith(".docx")) {
    //   //   const docxData = await mammoth.extractRawText({ buffer });
    //   //   rawText = docxData.value;
    // } else {
    //   return NextResponse.json(
    //     { error: "Unsupported file type" },
    //     { status: 400 },
    //   );
    // }

    // if (!rawText || rawText.length < 50) {
    //   return NextResponse.json(
    //     { error: "Could not extract text from resume" },
    //     { status: 400 },
    //   );
    // }

    // console.log(rawText);

    return NextResponse.json({ message: "Done." });
  } catch (error) {
    console.error("AUTOFILL ERROR:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 },
    );
  }
}
