import { Container } from "../components/Layout/Container";
import InputTextRoot from "../components/inputs/InputText/InputTextRoot";
import InputTextLabel from "../components/inputs/InputText/InputTextLabel";
import InputTextChangeIcon from "../components/inputs/InputText/InputTextChangeIcon";
import InputTextInput from "../components/inputs/InputText/InputTextInput";
import InputTextExtraText from "../components/inputs/InputText/InputTextExtraText";
import { FormEvent, useState, useEffect } from "react";
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";
import TextAreaAutoResize from "../components/inputs/TextAreaAutoResize/TextAreaAutoResize";
import InputFileWithPreview from "../components/inputs/InputFileWithPreview.tsx/InputFileWithPreview";
import Button from "../components/inputs/Button";
import Select from "react-select";
import {
  GetBookGenres,
  GetAllAuthors,
  CreateNewBook
} from "../services/BookVaultApi/BookVaultAPI";
import { AuthorCreateInterface, CreateBookInterface } from "../services/BookVaultApi/BookVaultAPIInterfaces";

interface SelectOptionsInteface {
  value: string;
  label: string;
}

export default function CreateBookPage() {
  const [bookGenders, setBookGenders] = useState<SelectOptionsInteface[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<
    SelectOptionsInteface[]
  >([]);
  const [authorsNames, setAuthorsNames] = useState<SelectOptionsInteface[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");

  const [bookName, setBookName] = useState<string>("");
  const [bookReleaseDate, setBookReleaseDate] = useState<string>("");
  const [bookSynopsis, setBookSynopsis] = useState<string>("");
  const [needToChangeIconAuthor, setNeedToChangeIconAuthor] =
    useState<boolean>(false);
  const [needToChangeIconDateofBirth, setNeedToChangeIconDateofBirth] =
    useState<boolean>(false);
  const [authorImageFile, setAuthorImageFile] = useState<any>(undefined);
  const [authorImage, setAuthorImage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [numberOfPages, setNumberOfPages] = useState<string>("");

  useEffect(() => {
    GetBookGenres().then((items: string[]) => {
      var bookGenresList = items.map((item) => ({
        label: item.replaceAll("_", " "),
        value: item.replaceAll("_", " "),
      }));
      setBookGenders(bookGenresList);
    });
    GetAllAuthors().then((items) => {
      if (items == null) {
        console.log("não chegou nada dos autores");
        return;
      }

      var authorSelectOptions: SelectOptionsInteface[] = [];

      items.forEach((item) => {
        let selectOption: SelectOptionsInteface = {
          label: item.authorName,
          value: item.authorName,
        };
        authorSelectOptions.push(selectOption);
      });

      setAuthorsNames(authorSelectOptions);
    });
  }, []);

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    var bookGendersListString: string[] = [];

    selectedGenders.forEach((item) => {
      bookGendersListString.push(item.value);
    });

    const createNewBook: CreateBookInterface = {
      BookGender: bookGendersListString,
      BookName: bookName,
      AuthorName: selectedAuthor,
      Synopsis: bookSynopsis,
      BookImageFile: imageUrl,
      NumberOfPages: numberOfPages,
      PublicationDate: bookReleaseDate
    };

    CreateNewBook(createNewBook);
  }

  function OnAuthorInputBlur() {}

  function OnDateofBirthInputBlur() {}

  const defaultOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="flex justify-center">
      <Container className="flex flex-center items-center flex-col bg-verde-green text-white p-10">
        <h1 className="text-h1">Create Author</h1>
        <form
          onSubmit={onFormSubmit}
          className="flex flex-center flex-col items-center w-full min-h-screen"
        >
          <div className="grid grid-cols-2 grid-rows-[1fr_1fr_1fr] w-3/5 gap-4 mt-10">
            <InputTextRoot className="w-full">
              <InputTextLabel
                className="w-full text-justify"
                text="Book name: "
              >
                <InputTextChangeIcon
                  firstIcon={FaCheckSquare}
                  secondIcon={FaTimesCircle}
                  condition={needToChangeIconAuthor}
                  secondIconStyle="text-red-500 inline text-end"
                  firstIconStyle="text-green-500 inline text-end"
                />
                <InputTextInput
                  type="text"
                  value={bookName}
                  required
                  className="block w-full rounded-md p-2 text-base text-black"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBookName(e.target.value)
                  }
                  onBlur={OnAuthorInputBlur}
                />
              </InputTextLabel>
            </InputTextRoot>
            <InputTextRoot className="w-full">
              <InputTextLabel
                className="w-full text-justify"
                text="Author date of birth: "
              >
                <InputTextChangeIcon
                  firstIcon={FaCheckSquare}
                  secondIcon={FaTimesCircle}
                  condition={needToChangeIconDateofBirth}
                  secondIconStyle="text-red-500 inline text-end"
                  firstIconStyle="text-green-500 inline text-end"
                />
                <InputTextInput
                  type="date"
                  value={bookReleaseDate}
                  required
                  className="block w-full rounded-md p-2 text-base text-black"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBookReleaseDate(e.target.value)
                  }
                  onBlur={OnDateofBirthInputBlur}
                />
              </InputTextLabel>
            </InputTextRoot>
            <InputTextRoot className="w-full">
              <InputTextLabel
                className="w-full text-justify"
                text="Number of pages: "
              >
                <InputTextChangeIcon
                  firstIcon={FaCheckSquare}
                  secondIcon={FaTimesCircle}
                  condition={needToChangeIconDateofBirth}
                  secondIconStyle="text-red-500 inline text-end"
                  firstIconStyle="text-green-500 inline text-end"
                />
                <InputTextInput
                  type="number"
                  value={numberOfPages}
                  required
                  className="block w-full rounded-md p-2 text-base text-black"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNumberOfPages(e.target.value)
                  }
                  onBlur={OnDateofBirthInputBlur}
                />
              </InputTextLabel>
            </InputTextRoot>
            <label className="text-h6 font-bold">
              Select book genres:
              <Select
                className="col-span-2 text-black text-p font-normal"
                options={bookGenders}
                onChange={(e) => {
                  if (e != null) {
                    setSelectedGenders(e.flat());
                    console.log(e.flat());
                  }
                }}
                isMulti
                required
              />
            </label>
            <label className="text-h6 font-bold col-span-2">
              Select Author:
              <Select
                className="col-span-2 text-black text-p font-normal"
                options={authorsNames}
                onChange={(e) => {
                  if (e != null) setSelectedAuthor(e.value);
                }}
                required
              />
            </label>
          </div>
          <div className="w-2/3 h-full mt-10 flex justify-center">
            <label className="flex flex-col w-full text-h6 font-bold">
              Author Synopsis:
              <TextAreaAutoResize
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBookSynopsis(e.target.value)
                }
                className="max-h-[400px] font-normal"
                value={bookSynopsis}
                required
              />
            </label>
          </div>
          <div className="w-2/3 mt-10">
            <p className="text-h6 font-bold">Image of the author:</p>
            <InputFileWithPreview
              imageFile={authorImage != "" ? setAuthorImage : authorImageFile}
              setFile={setAuthorImageFile}
              spanText="Clique para inserir uma imagem..."
              setImageUrl={setImageUrl}
              required
              styleForPicture={{ height: "fit-content", width: "100%" }}
            />
          </div>
          <Button
            text="Add author"
            type="submit"
            className="bg-erin-green text-black text-2xl hover:bg-black-blacker mt-10 shadow-md hover:text-white w-2/4 h-16 rounded-2xl"
          />
        </form>
      </Container>
    </div>
  );
}
