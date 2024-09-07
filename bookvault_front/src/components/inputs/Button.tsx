interface ButtonInterface {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  onClick?: () => void;
}

function Button({ text, className, onClick, type }: ButtonInterface) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`transition ease-in-out delay-150 ${className} `}
    >
      {text}
    </button>
  );
}

export default Button;
