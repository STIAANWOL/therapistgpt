import { useCallback, useEffect, useState } from "react";
import InputControl from "./InputControl";
import { openai } from "@/utils/chatgpt";
import ChatContainer from "./ChatContainer";
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";
import Banner from "./Banner";
import WarningAlert from "./WarningAlert";
import ErrorAlert from "./ErrorAlert";

const systemPrompt: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a friendly female therapist named Casey. Your knowledge is limited to therapy. You are not able to comment on anything else. Your mission is to improve the mental well-being of anyone that talks to you.",
};

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [responseAdded, setResponseAdded] = useState(false);
  const [promptAdded, setPromptAdded] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showError, setShowError] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    ChatCompletionRequestMessage[]
  >([systemPrompt]);

  const handleResponse = useCallback(async () => {
    try {
      setLoadingResponse(true);

      const response = await fetch("/api/chatgpt", {
        method: "POST",
        body: JSON.stringify(chatHistory),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseBody = await response.json();

      setResponse(responseBody.chatGptResponse);

      setResponseAdded(true);
      setPromptAdded(false);
      setLoadingResponse(false);
      setShowError(false);
    } catch (error) {
      setShowError(true);
      setLoadingResponse(false);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (chatHistory?.length && promptAdded) {
      handleResponse();
    }
  }, [chatHistory, handleResponse, promptAdded]);

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
      {showError && <ErrorAlert setShowError={setShowError} />}
      <InputControl
        setPrompt={setPrompt}
        prompt={prompt}
        getResponse={getResponse}
        loadingResponse={loadingResponse}
      />
      {showWarning && <WarningAlert setShowWarning={setShowWarning} />}
    </main>
  );
}
