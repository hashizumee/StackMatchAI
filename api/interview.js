import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { cvText, jdText } = req.body;

  if (!cvText || !jdText) {
    return res.status(400).json({ error: 'Data CV atau Job Description tidak lengkap.' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server tidak dikonfigurasi dengan API Key Gemini.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Anda adalah seorang Senior Technical Recruiter dan Software Engineer.
      Saya akan memberikan teks Curriculum Vitae (CV) kandidat dan Job Description (JD) yang mereka lamar.
      
      Tugas Anda:
      Hasilkan tepat 5 pertanyaan wawancara teknis (Mock Interview) yang disesuaikan secara khusus untuk menguji KESESUAIAN kandidat ini terhadap JD tersebut, terutama fokus pada potensi kelemahan (skill gaps) mereka.
      Berikan pertanyaan dalam bahasa Indonesia yang profesional.

      CV Kandidat:
      ${cvText}

      Target Job Description:
      ${jdText}

      Berikan respons DALAM FORMAT JSON SAJA yang berisi array objek pertanyaan:
      [
        {
          "question": "pertanyaan wawancara teknis",
          "reason": "mengapa pertanyaan ini ditanyakan berdasarkan CV/JD"
        }
      ]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });
    
    const responseText = response.text;
    
    // Extract JSON from response
    let jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Format balasan AI tidak valid');
    }

    const questions = JSON.parse(jsonMatch[0]);

    return res.status(200).json({ questions });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: 'Gagal menghasilkan pertanyaan wawancara: ' + error.message });
  }
}

