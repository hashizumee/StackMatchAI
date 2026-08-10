export const analyzePortfolio = async (cvText, githubData, jdText) => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cvText,
        githubData,
        jdText
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Terjadi kesalahan pada server AI.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error dari API Serverless:', error);
    throw new Error(error.message || 'Gagal terhubung ke API. Pastikan Anda menjalankan npx vercel dev untuk local development.');
  }
};
