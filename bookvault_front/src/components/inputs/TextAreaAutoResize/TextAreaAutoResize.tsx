import { useState } from "react";
import styles from "./TextAreaAutoResize.module.css";

interface TextAreaAutoResizeInterface {
  value: string;
  onChange: (e: any) => void;
  className?: string;
  required?: boolean;
}

export default function TextAreaAutoResize({
  value,
  onChange,
  className,
  required
}: TextAreaAutoResizeInterface) {
  const [textAreaHeight, setTextAreaHeight] = useState<string>("59px");

  function onKeyUpEvent(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const textArea: any = document.querySelector("#textAreaAutoResizeInput");
    textArea.style.height = "63px";
    const target = e.target as HTMLTextAreaElement;
    const scrollHeight = target.scrollHeight;
    textArea.style.height = `${scrollHeight}px`;
  }

  return (
    <textarea
      className={`${styles.textAreaInput} ${className} resize-none outline-none p-5 rounded-md text-p border-slate-400 text-black overflow-hidden`}
      onKeyUp={onKeyUpEvent}
      value={value}
      required={required}
      id="textAreaAutoResizeInput"
      onChange={onChange}
    />
  );
}
