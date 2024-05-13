import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDGLn8mEkKv8BLwUjC6jS0kjHMSUbvF7vE";

async function runChat(prompt: string, context?: string): Promise<string> {
  const contextJson = {
    exchange_rates: {
      USD: {
        SGD: {
          buying: 15.97373,
          selling: 16.13427,
        },
        AUD: {
          buying: 10.54106,
          selling: 10.65346,
        },
        EUR: {
          buying: 17.18933,
          selling: 17.36854,
        },
        JPY: {
          buying: 0.14429,
          selling: 0.14571,
        },
        GBP: {
          buying: 21.975,
          selling: 22.175,
        },
        CNY: {
          buying: 2.456,
          selling: 2.476,
        },
      },
    },
  };

  const contextAI =
    "Sebagai seorang pedagang, saya memerlukan pemahaman mendalam mengenai nilai tukar mata uang ini untuk menginformasikan keputusan bisnis saya. Mohon berikan analisis tentang faktor-faktor yang mempengaruhi pergerakan nilai tukar ini, serta prediksi mengenai arah pergerakan masa depannya. Saya juga tertarik untuk mengetahui dampak potensial dari perubahan nilai tukar ini terhadap harga produk impor dan ekspor saya. Informasi ini sangat penting bagi saya dalam merencanakan strategi perdagangan saya. Terima kasih.";

  // add contextJson to the prompt, make sure contextJson is the first element as a string and contextAI is the last element as a string
  // prompt =
  //   "Berikut ini adalah data kursdollar bank mandiri: " +
  //   JSON.stringify(contextJson) +
  //   contextAI;
  prompt = "ini adalah contextnya: " + context + prompt;

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default runChat;
