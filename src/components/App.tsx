import { useEffect, useState } from "react";
import InputControl from "./InputControl";
import { openai } from "@/utils/chatgpt";
import ChatContainer from "./ChatContainer";
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";
import InfoAlert from "./InfoAlert";
import Banner from "./Banner";

const systemPrompt: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a female therapist named Casey. Your knowledge is limited to therapy. You are not able to comment on anything else. Your mission is to improve the mental well-being of anyone that talks to you.",
};

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [responseAdded, setResponseAdded] = useState(false);
  const [promptAdded, setPromptAdded] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [chatHistory, setChatHistory] = useState<
    ChatCompletionRequestMessage[]
  >([systemPrompt]);

  const handleResponse = async () => {
    setLoadingResponse(true);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
      temperature: 1,
      max_tokens: 200,
    });

    const chatGptResponse = completion.data.choices[0].message?.content;

    setResponse(chatGptResponse || "Error!");

    setResponseAdded(true);
    setPromptAdded(false);
    setLoadingResponse(false);
  };

  useEffect(() => {
    if (chatHistory?.length && promptAdded) {
      handleResponse();
    }
  }, [chatHistory]);

  useEffect(() => {
    if (response && responseAdded) {
      const newResponse: ChatCompletionResponseMessage = {
        role: "assistant",
        content: response,
      };

      setChatHistory((chatHistory) => [...chatHistory, newResponse]);

      setResponseAdded(false);
    }
  }, [response, responseAdded]);

  const getResponse = async (): Promise<void> => {
    setPromptAdded(true);
    const newPrompt: ChatCompletionRequestMessage = {
      role: "user",
      content: prompt,
    };
    setChatHistory((chatHistory) => [...chatHistory, newPrompt]);
    setPrompt("");
  };

  return (
    <main className="flex min-h-screen flex-col px-4 sm:px-24 gap-y-4 pb-4">
      <Banner />
      <div className="grow overflow-y-auto">
        <ChatContainer chatHistory={chatHistory} />
      </div>
      <InputControl
        setPrompt={setPrompt}
        prompt={prompt}
        getResponse={getResponse}
        loadingResponse={loadingResponse}
      />
      {showAlert && <InfoAlert setShowAlert={setShowAlert} />}
    </main>
  );
}
