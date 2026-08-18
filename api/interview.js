import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { cvText, jdText } = req.body;

  if (!cvText || !jdText) {
    return res.status(400).json({ error: 'Data CV atau Job Description tidak lengkap.' });
  }

  try {
    const apiKey = process.env.ANTHROPIC_AUTH_TOKEN || process.env.VITE_ANTHROPIC_AUTH_TOKEN;
    const baseURL = process.env.ANTHROPIC_BASE_URL || process.env.VITE_ANTHROPIC_BASE_URL;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server tidak dikonfigurasi dengan API Key Anthropic.' });
    }

    const anthropic = new Anthropic({ apiKey, baseURL });

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
      {
        "questions": [
          {
            "question": "pertanyaan wawancara teknis",
            "reason": "mengapa pertanyaan ini ditanyakan berdasarkan CV/JD"
          }
        ]
      }
    `;

    const chatCompletion = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      temperature: 0.1,
      messages: [{ role: 'user', content: prompt }]
    });
    
    let text = chatCompletion.content[0].text || '';
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const resultJson = JSON.parse(text);

    return res.status(200).json({ questions: resultJson.questions });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: 'Gagal menghasilkan pertanyaan wawancara: ' + error.message });
  }
}

