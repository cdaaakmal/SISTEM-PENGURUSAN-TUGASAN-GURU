import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key tidak ditemui. Sila pastikan process.env.API_KEY telah ditetapkan.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateTaskDescription = async (title: string, role: string, category: string): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      Bertindak sebagai pentadbir sekolah yang berpengalaman. Sila sediakan deskripsi tugas ringkas dalam BAHASA MELAYU FORMAL (HURUF BESAR) untuk:
      
      UNIT/JAWATANKUASA: ${title}
      JAWATAN/PERANAN: ${role}
      KATEGORI: ${category}
      
      Arahan Khusus:
      1. Jika peranan adalah 'PENGERUSI/KETUA', fokus kepada aspek memimpin, mempengerusikan mesyuarat dan memantau.
      2. Jika peranan adalah 'SETIAUSAHA', fokus kepada pengurusan fail, minit mesyuarat dan dokumentasi.
      3. Jika peranan adalah 'AJK', fokus kepada membantu pelaksanaan program dan tugas-tugas operasi.
      4. Tulis dalam satu perenggan padat (40-60 patah perkataan).
      5. Jangan gunakan bullet points atau markdown. Hanya teks biasa.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "GAGAL MENJANA DESKRIPSI.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "RALAT SAMBUNGAN AI.";
  }
};