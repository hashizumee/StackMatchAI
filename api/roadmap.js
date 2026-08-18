import Groq from 'groq-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { skillGaps, role } = req.body;

  if (!skillGaps || !role) {
    return res.status(400).json({ error: 'Data skillGaps atau role tidak lengkap.' });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server tidak dikonfigurasi dengan API Key Groq.' });
    }

    const groq = new Groq({ apiKey });

    const prompt = `
      Anda adalah seorang Senior Tech Mentor dan Curriculum Developer.
      Kandidat ini memiliki beberapa "Skill Gaps" (kelemahan/kekurangan skill) saat melamar untuk posisi: ${role}.
      
      Skill Gaps kandidat:
      ${JSON.stringify(skillGaps, null, 2)}
      
      Tugas Anda:
      Buatkan sebuah "Learning Roadmap" atau kurikulum belajar yang spesifik dirancang untuk menutup celah skill tersebut.
      Bagi roadmap menjadi maksimal 4 modul/tahapan belajar yang masuk akal dan progresif (dari dasar hingga lanjut, atau per topik).
      Untuk setiap modul, berikan 1 atau 2 referensi link belajar eksternal (misalnya link ke YouTube search, dokumentasi resmi, atau free course Udemy/Coursera) agar user tahu harus belajar ke mana.

      Berikan respons DALAM FORMAT JSON SAJA yang persis sesuai dengan struktur berikut:
      {
        "modules": [
          {
            "title": "Judul Modul/Tahap Belajar (misal: Fundamental Docker)",
            "description": "Deskripsi singkat mengapa modul ini penting untuk menutup gap.",
            "topics": ["Konsep Containerization", "Docker CLI Dasar", "Dockerfile"],
            "resources": [
              {
                "name": "Docker for Beginners (YouTube)",
                "url": "https://www.youtube.com/results?search_query=docker+for+beginners+tutorial"
              }
            ]
          }
        ]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      temperature: 0.1,
    });
    
    let text = chatCompletion.choices[0]?.message?.content || '';
    
    const resultJson = JSON.parse(text);

    return res.status(200).json({ roadmap: resultJson.modules });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: 'Gagal menghasilkan roadmap belajar: ' + error.message });
  }
}
