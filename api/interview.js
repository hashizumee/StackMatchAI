import Groq from 'groq-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { cvText, jdText } = req.body;

  if (!cvText || !jdText) {
    return res.status(400).json({ error: 'Data CV atau Job Description tidak lengkap.' });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server tidak dikonfigurasi dengan API Key Groq.' });
    }

    const groq = new Groq({ apiKey });

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

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'mixtral-8x7b-32768',
      response_format: { type: 'json_object' },
      temperature: 0.1,
    });
    
    let text = chatCompletion.choices[0]?.message?.content || '';
    
    const resultJson = JSON.parse(text);

    return res.status(200).json({ questions: resultJson.questions });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: 'Gagal menghasilkan pertanyaan wawancara: ' + error.message });
  }
}

