import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

async function runChat(
  prompt: string,
  history?: { role: string; parts: { text: string }[] }[],
  role?: string,
  contextRole?: string
): Promise<string> {
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

  if (role && contextRole) {
    prompt =
      "Ini adalah data kursdollar saat ini: " +
      contextRole +
      " " +
      role +
      " tolong jelaskan dalam bentuk yang mudah dimengerti oleh orang awam yang tidak mengerti tentang kursdollar dan bahasa indonesia yang mudah dimengerti";
  } else {
    prompt =
      "Ini adalah kursdollar saat ini: " +
      JSON.stringify(contextJson) +
      " " +
      prompt +
      " tolong jelaskan dalam bentuk yang mudah dimengerti oleh orang awam yang tidak mengerti tentang kursdollar dan bahasa indonesia yang mudah dimengerti";
  }
  console.log("prompt in runChat", prompt);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {};

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  console.log("history", history);
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: history?.map((item) => ({
      role: item.role as "user" | "model" | "function",
      parts: item.parts,
    })),
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

async function getResponse(prompt: string) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  prompt =
    prompt +
    " " +
    'tolong berikan response dalam bentuk json {"tips": ["tip1", "tip2", "tip3"]} dan jumlah tipsnya adalah 10 atau lebih. Juga buatlah response dalam kata-kata yang mudah dimengerti oleh orang awam yang tidak mengerti tentang kursdollar.';

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  console.log(text);
  return text;
}

export { runChat, getResponse };
