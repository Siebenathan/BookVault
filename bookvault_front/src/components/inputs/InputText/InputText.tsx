import { PiCheckDuotone } from "react-icons/pi";

interface InputTextInterface {
  value: string;
  onChange: (e: any) => void;
  labelText?: string;
  placeholder?: string;
  type?: "email" | "password" | undefined;
}

export default function InputText({
  onChange,
  value,
  labelText,
  placeholder,
  type
}: InputTextInterface) {
  return (
    <label className="w-full text-xl">
      {labelText}
      <PiCheckDuotone className="text-green-500 inline"/>
      <input
        className="block rounded-lg border-none p-2 w-full"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className="text-end text-sm">Teste</p>
    </label>
  );
}
