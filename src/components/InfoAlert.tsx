import { Dispatch, SetStateAction, useState } from "react";
import InfoSVG from "./icons/InfoSVG";
import CloseSVG from "./icons/CloseSVG";

interface InfoAlertProps {
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

export default function InfoAlert({ setShowAlert }: InfoAlertProps) {
  return (
    <div className="alert alert-info shadow-lg">
      <div className="flex sm:flex-row flex-col">
        <InfoSVG />
        <span>
          If you're experiencing serious mental health issues, please seek the
          help of a licensed mental health professional. This app is not
          intended to replace medical advice or treatment.
        </span>
      </div>
      <button
        onClick={() => setShowAlert(false)}
        className="btn btn-ghost btn-xs alertButton"
      >
        <CloseSVG />
      </button>
    </div>
  );
}
