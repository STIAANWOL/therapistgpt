import { Dispatch, SetStateAction } from "react";
import UpRightSVG from "./icons/UpRightSVG";

interface InputControlProps {
  getResponse: () => Promise<void>;
  setPrompt: Dispatch<SetStateAction<string>>;
  prompt: string;
  loadingResponse: boolean;
}

export default function InputControl({
  getResponse,
  setPrompt,
  prompt,
  loadingResponse,
}: InputControlProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getResponse();
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <div className="grow">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input w-full"
        />
      </div>
      <button
        type="submit"
        disabled={!prompt || loadingResponse}
        className={`btn btn-ghost ${loadingResponse && "loading"}`}
      >
        {!loadingResponse && <UpRightSVG />}
      </button>
    </form>
  );
}
