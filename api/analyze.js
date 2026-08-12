import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { cvText, githubData, jdText } = req.body;

  if (!cvText || !githubData || !jdText) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Gunakan API key dari Environment Variable Vercel
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key Gemini tidak dikonfigurasi di server.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Anda adalah seorang Ahli Rekrutmen Senior dan Technical Assessor.
Tugas Anda adalah membandingkan profil kandidat (dari CV dan GitHub) dengan Deskripsi Pekerjaan (JD) target.

Deskripsi Pekerjaan:
${jdText}

CV Kandidat:
${cvText}

Data GitHub Kandidat (Top Bahasa dan Repo):
${JSON.stringify(githubData, null, 2)}

Buat analisis yang obyektif dan berikan output HANYA dalam format JSON mentah tanpa blok markdown (\`\`\`) dengan struktur persis seperti berikut:
{
  "matchScore": 85,
  "jobReadiness": "Entry Ready",
  "readinessDescription": "Penjelasan singkat (maks 2 kalimat) mengapa kandidat berada di level tersebut.",
  "matchingSkills": [
    {
      "skill": "React.js",
      "evidence": "Ditemukan 3 proyek React di GitHub dan pengalaman kerja di CV."
    }
  ],
  "skillGaps": [
    {
      "skill": "Docker",
      "reason": "Dibutuhkan di JD tapi tidak ada di CV maupun GitHub."
    }
  ],
  "projectRecommendation": {
    "title": "E-Commerce API dengan Docker",
    "description": "Deskripsi singkat proyek untuk menutupi kelemahan kandidat.",
    "tags": ["Node.js", "Docker", "CI/CD"]
  }
}
Pastikan respons murni JSON yang valid.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    
    let text = response.text;
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const resultJson = JSON.parse(text);

    return res.status(200).json(resultJson);
  } catch (error) {
    console.error('AI Error:', error);
    return res.status(500).json({ error: 'Gagal melakukan analisis AI dari server. Detail: ' + (error.message || error.toString()) });
  }
}

