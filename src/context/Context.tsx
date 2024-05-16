import React, { ReactNode, createContext, useState } from "react";
import { runChat } from "../config/gemini";

interface Props {
  children: ReactNode; // ReactNode is a type for any React node
}

interface ContextType {
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  onSent: (prompt?: string, context?: string) => void;
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
}

export const Context = createContext<ContextType>({
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

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt?: string, context?: string) => {
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
    let response = await runChat(prompt, context, chats);
    // if (prompt !== undefined) {
    //   response = await runChat(prompt, context, chats);
    //   setRecentPrompt(prompt);
    // } else {
    //   setPrevPrompts((prev) => [...prev, input]);
    //   setRecentPrompt(input);
    //   response = await runChat(input, context, chats);
    // }

    let responseArray = response.split("**");
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

  const contextValue: ContextType = {
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
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;