import { Dispatch, SetStateAction } from "react";
import InfoSVG from "./icons/InfoSVG";
import CloseSVG from "./icons/CloseSVG";

interface WarningAlertProps {
  setShowWarning: Dispatch<SetStateAction<boolean>>;
}

export default function WarningAlert({ setShowWarning }: WarningAlertProps) {
  return (
    <div className="alert alert-warning shadow-lg">
      <div className="flex sm:flex-row flex-col">
        <InfoSVG />
        <span>
          If you&apos;re experiencing serious mental health issues, please seek
          the help of a licensed mental health professional. This app is not
          intended to replace medical advice or treatment.
        </span>
      </div>
      <button
        onClick={() => setShowWarning(false)}
        className="btn btn-ghost btn-xs alertButton"
      >
        <CloseSVG />
      </button>
    </div>
  );
}
