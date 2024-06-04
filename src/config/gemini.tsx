import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

async function runChat(
  prompt: string,
  context?: string,
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

  const contextAI =
    "Sebagai seorang pedagang, saya memerlukan pemahaman mendalam mengenai nilai tukar mata uang ini untuk menginformasikan keputusan bisnis saya. Mohon berikan analisis tentang faktor-faktor yang mempengaruhi pergerakan nilai tukar ini, serta prediksi mengenai arah pergerakan masa depannya. Saya juga tertarik untuk mengetahui dampak potensial dari perubahan nilai tukar ini terhadap harga produk impor dan ekspor saya. Informasi ini sangat penting bagi saya dalam merencanakan strategi perdagangan saya. Terima kasih.";

  // add contextJson to the prompt, make sure contextJson is the first element as a string and contextAI is the last element as a string
  // prompt =
  //   "Berikut ini adalah data kursdollar bank mandiri: " +
  //   JSON.stringify(contextJson) +
  //   contextAI;
  // prompt = "ini adalah kursdollar bank mandiri: " + context + prompt;
  // prompt =
  //   contextAI +
  //   " berikut ini adalah data kursdollar bank mandiri: " +
  //   context +
  //   prompt;
  let firstHistory =
    "Sebagai seorang pedagang, saya memerlukan pemahaman mendalam mengenai nilai tukar mata uang ini untuk menginformasikan keputusan bisnis saya. Mohon berikan analisis tentang faktor-faktor yang mempengaruhi pergerakan nilai tukar ini, serta prediksi mengenai arah pergerakan masa depannya. Saya juga tertarik untuk mengetahui dampak potensial dari perubahan nilai tukar ini terhadap harga produk impor dan ekspor saya. Informasi ini sangat penting bagi saya dalam merencanakan strategi perdagangan saya. Jika saya bertanya di luar konteks yang saya berikan usahakan kamu menjawabnya sesuai dengan informasi di dunia nyata." +
    " berikut ini adalah data kursdollar bank mandiri: " +
    context;
  if (role && contextRole) {
    prompt =
      "Ini adalah data kursdollar saat ini: " +
      contextRole +
      " " +
      role +
      " tolong jelaskan dalam bentuk yang mudah dimengerti oleh orang awam yang tidak mengerti tentang kursdollar dan bahasa indonesia yang mudah dimengerti";
  } else {
    // prompt = firstHistory + " " + prompt;
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

  const generationConfig = {
    // temperature: 0.9,
    // topK: 1,
    // topP: 1,
  };

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
  // add first message to the history
  let newHistory = [
    {
      role: "user",
      parts: [
        {
          text: firstHistory,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Baik, berikut analisis mengenai faktor-faktor yang mempengaruhi pergerakan nilai tukar mata uang dan prediksi mengenai arah pergerakan masa depannya.",
        },
      ],
    },
  ];

  // add history to the newHistory
  if (history) {
    newHistory = [...history];
  }

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: history?.map((item) => ({
      role: item.role as "user" | "model" | "function",
      parts: item.parts,
    })),
    // history: [
    //   {
    //     role: "user",
    //     parts: [
    //       {
    //         text: "Pretend you're a snowman and stay in character for each response.",
    //       },
    //     ],
    //   },
    //   {
    //     role: "model",
    //     parts: [
    //       {
    //         text: "Hello! It's cold! Isn't that great?",
    //       },
    //     ],
    //   },
    // ],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

async function getResponse(prompt: string) {
  // For text-only input, use the gemini-pro model
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // add context for prompt to make it response as json
  // prompt = prompt + " " + "tolong berikan response dalam bentuk json seperti berikut;
  prompt =
    prompt +
    " " +
    'tolong berikan response dalam bentuk json {"tips": ["tip1", "tip2", "tip3"]} dan jumlah tipsnya adalah 10 atau lebih. Juga buatlah response dalam kata-kata yang mudah dimengerti oleh orang awam yang tidak mengerti tentang kursdollar.';

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  // remove ** from the response
  // text.replace("**", "");
  console.log(text);
  return text;
}

export { runChat, getResponse };
