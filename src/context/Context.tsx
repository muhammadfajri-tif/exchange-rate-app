import React, { ReactNode, createContext, useState } from "react";
import { runChat } from "../config/gemini";

interface Props {
  children: ReactNode;
}

interface ExchangeRate {
  buy: string;
  sell: string;
}

interface CurrencyRates {
  USD: ExchangeRate;
  SGD: ExchangeRate;
  EUR: ExchangeRate;
  CNY: ExchangeRate;
  GBP: ExchangeRate;
  JPY: ExchangeRate;
  SAR: ExchangeRate;
}

interface Payload {
  type: string;
  bank: string;
  date: number;
  IDRExchangeRate: CurrencyRates;
}

interface ContextType {
  fetchPayload: () => Promise<void>;
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  onSent: (
    prompt?: string,
    context?: string,
    role?: string,
    contextRole?: string
  ) => void;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  recentPrompt: string;
  showResult: boolean;
  loading: boolean;
  isFirst: boolean;
  resultData: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  chats: { role: string; parts: { text: string }[] }[];
  setChats: React.Dispatch<
    React.SetStateAction<{ role: string; parts: { text: string }[] }[]>
  >;
  newChat: () => void;
  tips: string[];
  setTips: React.Dispatch<React.SetStateAction<string[]>>;
  carouseLoading: boolean;
  setCarouseloading: React.Dispatch<React.SetStateAction<boolean>>;
  payload: Payload[] | null;
  setPayload: React.Dispatch<React.SetStateAction<Payload[] | null>>;
}

export const Context = createContext<ContextType>({
  fetchPayload: async () => {},
  prevPrompts: [],
  setPrevPrompts: () => {},
  onSent: () => {},
  setRecentPrompt: () => {},
  recentPrompt: "",
  showResult: false,
  loading: false,
  isFirst: true,
  resultData: "",
  input: "",
  chats: [],
  setChats: () => {},
  setInput: () => {},
  newChat: () => {},
  tips: [],
  setTips: () => {},
  carouseLoading: true,
  setCarouseloading: () => {},
  payload: null,
  setPayload: () => {},
});

const ContextProvider: React.FC<Props> = (props) => {
  const [chats, setChats] = useState<
    { role: string; parts: { text: string }[] }[]
  >([]);
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [resultData, setResultData] = useState("");
  const [tips, setTips] = useState<string[]>([]);
  const [carouseLoading, setCarouseloading] = useState<boolean>(true);
  const [payload, setPayload] = useState<Payload[] | null>(null);

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (
    prompt?: string,
    context?: string,
    role?: string,
    contextRole?: string
  ) => {
    console.log("prompt", prompt);
    console.log("context", context);

    if (!prompt) {
      return;
    }

    setRecentPrompt(prompt);

    let recentPrompt = {
      role: "user",
      parts: [{ text: prompt } as { text: string }],
    };
    setChats((prev) => [...prev, recentPrompt]);

    setInput("");

    setResultData("");
    setLoading(true);
    setShowResult(true);
    // let response = await runChat(prompt, context, chats); // dri feat/api
    let response = "";

    if (role && contextRole) {
      response = await runChat(prompt, context, chats, role, contextRole);
    } else {
      response = await runChat(prompt, context, chats);
    }
    // if (prompt !== undefined) {
    //   response = await runChat(prompt, context, chats);
    //   setRecentPrompt(prompt);
    // } else {
    //   setPrevPrompts((prev) => [...prev, input]);
    //   setRecentPrompt(input);
    //   response = await runChat(input, context, chats);
    // }

    // let responseArray = response.split("**");
    let responseArray = response;
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    let recentResponse = {
      role: "model",
      parts: [{ text: response } as { text: string }],
    };
    setChats((prev) => [...prev, recentResponse]);
    console.log(chats);

    setIsFirst(false);
    setLoading(false);
  };

  // fetch payload
  const fetchPayload = async () => {
    try {
      const response = await fetch(
        "http://exchange-rates-project.s3-website-ap-southeast-1.amazonaws.com/dev/scraping/exchange-rates.json"
      );
      let dataText = await response.text();
      // the response is [] so we need to parse it
      const data = JSON.parse(dataText);
      // const data = await response.json();

      const result: Payload[] = data;

      setPayload(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const contextValue: ContextType = {
    fetchPayload,
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    isFirst,
    newChat,
    chats,
    setChats,
    tips,
    setTips,
    carouseLoading,
    setCarouseloading,
    payload,
    setPayload,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
