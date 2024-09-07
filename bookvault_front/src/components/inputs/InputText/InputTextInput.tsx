import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputTextInputInterface {
  value: string;
  onChange: (e: any) => void;
  className: string;
  type: "email" | "password" | "date" | "text" | "number" | undefined;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean; 
}

export default function InputTextInput({
  className,
  value,
  onChange,
  placeholder,
  type,
  onBlur,
  required
}: InputTextInputInterface) {
  const [isPasswordType, setPasswordType] = useState<boolean>(false);
  const [changeType, setChangeType] = useState<string>("password");

  useEffect(() => {
    if (type == "password") {
      setPasswordType(true);
    }
  }, []);

  return (
    <>
      {isPasswordType ? (
        <div className="flex gap-2 h-full">
          <input
            className={`text-xl w-4/5 h-full ${className}`}
            value={value}
            type={changeType}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
          />
          <button
            className="w-1/5 rounded-md border-none bg-cinza-fraco min-h-full flex justify-center items-center"
            onClick={() => {
              if(changeType == "password") setChangeType("text");
              if(changeType == "text") setChangeType("password");
            }}
            type="reset"
          >
            {changeType == "password" ? <FaRegEyeSlash className="text-white"/> : <FaRegEye className="text-white"/>}
          </button>
        </div>
      ) : (
        <input
          className={`text-xl ${className}`}
          value={value}
          type={type}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          required={required}
        />
      )}
    </>
  );
}
