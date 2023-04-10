import { Dispatch, SetStateAction } from "react";
import InfoSVG from "./icons/InfoSVG";
import CloseSVG from "./icons/CloseSVG";

interface ErrorAlertProps {
  setShowError: Dispatch<SetStateAction<boolean>>;
}

export default function ErrorAlert({ setShowError }: ErrorAlertProps) {
  return (
    <div className="alert alert-error shadow-lg">
      <div className="flex sm:flex-row flex-col">
        <InfoSVG />
        <span>Unable to process request. Please try again later.</span>
      </div>
      <button
        onClick={() => setShowError(false)}
        className="btn btn-ghost btn-xs alertButton"
      >
        <CloseSVG />
      </button>
    </div>
  );
}
