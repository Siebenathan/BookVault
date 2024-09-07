import { FaSearch } from "react-icons/fa";

interface SearchInputInterface {
  placeholder: string;
  onClick: () => void;
}

function SearchInput({ placeholder, onClick }: SearchInputInterface) {
  return (
    <form className="flex w-full h-full min-h-14 max-h-40 justify-center item">
      <input
        type="text"
        placeholder={placeholder}
        className="border-none rounded-s-2xl p-3 w-4/5"
      ></input>
      <button onClick={onClick} className="w-fit bg-white px-4 transition delay-150 hover:bg-verde-green box-border rounded-e-2xl">
        <FaSearch className="box-border"/>
      </button>
    </form>
  );
}

export default SearchInput;
