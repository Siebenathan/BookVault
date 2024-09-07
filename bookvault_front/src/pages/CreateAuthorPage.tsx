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
import { GetAllCountries } from "../services/RestCountrysAPI";
import { AddAuthor } from "../services/BookVaultApi/BookVaultAPI";
import { AuthorCreateInterface } from "../services/BookVaultApi/BookVaultAPIInterfaces";

interface SelectOptionsInteface {
  value: string;
  label: string;
}

export default function CreateAuthorPage() {
  const [countrySelectOptions, setCountrySelectOptions] = useState<
    SelectOptionsInteface[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const [authorName, setAuthorName] = useState<string>("");
  const [authorDateofBirth, setAuthorDateofBirth] = useState<string>("");
  const [authorSynopsis, setAuthorSynopsis] = useState<string>("");
  const [needToChangeIconAuthor, setNeedToChangeIconAuthor] =
    useState<boolean>(false);
  const [needToChangeIconDateofBirth, setNeedToChangeIconDateofBirth] =
    useState<boolean>(false);
  const [authorImageFile, setAuthorImageFile] = useState<any>(undefined);
  const [authorImage, setAuthorImage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>();

  useEffect(() => {
    GetAllCountries().then((response) => {
      let countrySelectOptionsList: SelectOptionsInteface[] = [];
      countrySelectOptionsList = response.map((item) => {
        const selectOption: SelectOptionsInteface = {
          value: item.countryName,
          label: item.countryName,
        };
        return selectOption;
      });
      setCountrySelectOptions(countrySelectOptionsList);
    });
  }, []);

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newAuthor: AuthorCreateInterface = {
      authorName,
      authorSynopsis,
      countryOfBirth: selectedCountry,
      dateOfBirth: authorDateofBirth,
      imageOfTheAuthor: imageUrl,
    };

    // console.log(imageUrl);
    // console.log(authorImage);
    // console.log(authorImageFile);
  

    AddAuthor(newAuthor);
  }

  function OnAuthorInputBlur() {}

  function OnDateofBirthInputBlur() {}

  const options = [
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
          <div className="grid grid-cols-2 grid-rows-[1fr_auto] w-3/5 gap-4 mt-10">
            <InputTextRoot className="w-full">
              <InputTextLabel
                className="w-full text-justify"
                text="Author name: "
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
                  value={authorName}
                  required
                  className="block w-full rounded-md p-2 text-base text-black"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthorName(e.target.value)
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
                  value={authorDateofBirth}
                  required
                  className="block w-full rounded-md p-2 text-base text-black"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthorDateofBirth(e.target.value)
                  }
                  onBlur={OnDateofBirthInputBlur}
                />
              </InputTextLabel>
            </InputTextRoot>
            <label className="col-span-2 text-h6 font-bold">
              Select author nacionality:
              <Select
                className="col-span-2 text-black text-p font-normal"
                options={countrySelectOptions}
                onChange={(e) => {
                  if (e != null) setSelectedCountry(e.value);
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
                  setAuthorSynopsis(e.target.value)
                }
                className="max-h-[400px] font-normal"
                value={authorSynopsis}
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
