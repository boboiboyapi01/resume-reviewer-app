import { NextRequest, NextResponse } from "next/server";
import { ReviewResultType } from "@/types/review";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Menggunakan kunci API Gemini yang gratis
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.log("⚠️ GEMINI_API_KEY tidak ditemukan di .env. Menggunakan Mock Response (Simulasi).");
      
      await new Promise((resolve) => setTimeout(resolve, 2500));
      const mockResponse: ReviewResultType = {
        score: 78,
        summary: "Your resume shows a solid foundation in software development with good technical skills, but the impact of those skills isn't clearly quantified. The format is easy to read, but you could benefit from stronger action verbs.",
        strengths: [
          "Clear and logical structure that is easy for ATS (Applicant Tracking Systems) to parse.",
          "Good mix of frontend and backend technologies listed in the skills section.",
          "Education section is concise and well-placed."
        ],
        weaknesses: [
          "Many bullet points lack quantifiable metrics (e.g., 'increased performance by X%').",
          "The professional summary is a bit generic and doesn't clearly state your unique value proposition.",
          "Some technical skills listed are outdated or too broad to be meaningful without context."
        ],
        recommendations: [
          "Use the STAR method (Situation, Task, Action, Result) for bullet points to show measurable impact.",
          "Tailor your professional summary to highlight the specific role you are aiming for (e.g., 'Results-driven Full Stack Developer').",
          "Group your skills clearly into categories like 'Languages', 'Frameworks', and 'Tools' for better readability."
        ]
      };
      return NextResponse.json(mockResponse, { status: 200 });
    }

    // ============================================================================
    // IMPLEMENTASI GOOGLE GEMINI AI (GRATIS)
    // ============================================================================
    console.log("✅ GEMINI_API_KEY terdeteksi! Memulai ekstraksi teks...");

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    if (file.type === "application/pdf") {
      const pdfParser = new PDFParse({ data: new Uint8Array(buffer) });
      const parsedPdf = await pdfParser.getText();
      extractedText = parsedPdf.text;
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const parsedDocx = await mammoth.extractRawText({ buffer });
      extractedText = parsedDocx.value;
    } else {
      return NextResponse.json({ error: "Tipe file tidak didukung" }, { status: 400 });
    }

    if (!extractedText || extractedText.trim() === "") {
        return NextResponse.json({ error: "Gagal membaca teks dari dokumen Anda" }, { status: 400 });
    }

    console.log("📄 Teks berhasil diekstrak! Mengirim ke Gemini AI...");

    const genAI = new GoogleGenerativeAI(apiKey);
    // Menggunakan gemini-2.5-flash karena memiliki kinerja super cepat
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { responseMimeType: "application/json" } });

    const prompt = `Anda adalah seorang HR Professional dan Tech Recruiter kelas dunia. Review CV/Resume berikut secara menyeluruh dan berikan feedback yang membangun, objektif, dan tegas.
    
Gunakan standar industri modern. Fokus pada keterbacaan (ATS-friendly), penggunaan action verbs (metode STAR), dan tata bahasa.
Resume Teks:
"""
${extractedText.substring(0, 15000)} // Memotong teks agar tidak melebihi konteks bila sangat panjang
"""
    
Anda WAJIB merespon HANYA menggunakan struktur JSON murni yang sesuai dengan schema berikut (Jangan tambahkan kata-kata lain di luar JSON):
{
  "score": <angka dari 0-100 menggambarkan kualitas CV>,
  "summary": "<satu paragraf padat merangkum kesan keseluruhan dari CV ini>",
  "strengths": ["<poin kekuatan 1>", "<poin kekuatan 2>", "<poin kekuatan 3>"],
  "weaknesses": ["<poin kelemahan 1>", "<poin kelemahan 2>", "<poin kelemahan 3>"],
  "recommendations": ["<rekomendasi spesifik 1>", "<rekomendasi spesifik 2>", "<rekomendasi spesifik 3>"]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse the JSON naturally returned by the model
    const aiData: ReviewResultType = JSON.parse(responseText);

    return NextResponse.json(aiData, { status: 200 });

  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal saat memproses resume Anda" },
      { status: 500 }
    );
  }
}
