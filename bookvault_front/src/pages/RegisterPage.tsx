import {
  FormEvent,
  useState,
  ComponentType,
} from "react";
import Button from "../components/inputs/Button";
import { Container } from "../components/Layout/Container";
import InputTextRoot from "../components/inputs/InputText/InputTextRoot";
import InputTextLabel from "../components/inputs/InputText/InputTextLabel";
import InputTextInput from "../components/inputs/InputText/InputTextInput";
import InputTextExtraText from "../components/inputs/InputText/InputTextExtraText";
import InputTextChangeIcon from "../components/inputs/InputText/InputTextChangeIcon";
import { FaCheckSquare, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import LinkComponentWithUnderline from "../components/inputs/LinkComponents/LinkComponentWithUnderline/LinkComponentWithUnderline";
import {
  CreateNewUser,
} from "../services/BookVaultApi/BookVaultAPI";
import { CreateNewUserInterface } from "../services/BookVaultApi/BookVaultAPIInterfaces";
import ModalComponent from "../components/modals/SimpleModalComponent/SimpleModalComponent";
import SimpleModalRoot from "../components/modals/SimpleModalComponent/SimpleModalRoot";
import SimpleModalNav from "../components/modals/SimpleModalComponent/SimpleModalNav";
import SimpleModalContentRoot from "../components/modals/SimpleModalComponent/SimpleModalContentRoot";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [dateOfBirht, setDateOfBirth] = useState<string>("");
  const [needToChangeIconEmail, setNeedToChangeIconEmail] =
    useState<boolean>(false);
  const [extraTextEmail, setExtraTextEmail] = useState<string>("");
  const [needToChangeIconPassword, setNeedToChangeIconPassword] =
    useState<boolean>(false);
  const [extraTextPassword, setExtraTextPassword] = useState<string>("");
  const [needToChangeIconUsername, setNeedToChangeIconUsername] =
    useState<boolean>(false);
  const [extraTextUsername, setExtraTextUsername] = useState<string>("");
  const [extraTextDateOfBirth, setExtraTextDateOfBirth] = useState<string>("");
  const [needToChangeIconDateOfBirth, setNeedToChangeIconDateOfBirth] =
    useState<boolean>(false);
  const [ísModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("Sucess!");

  const IconCheckCircle = () => <FaCheckCircle className="text-5xl inline" />;
  const IconTimesCircle = () => <FaTimesCircle className="text-5xl inline" />;
  const navigate = useNavigate();
  const sucessCreatingAccountModalText =
    "Your registration is complete, you can now log into your account, click the button below to be directed to the login page.";
  const [modalTitleIcon, setModalTitleIcon] = useState<ComponentType>(
    () => IconCheckCircle
  );
  const [modalText, setModalText] = useState<string>(
    sucessCreatingAccountModalText
  );
  const [buttonTextModal, setButtonTextModal] = useState<string>("");

  function OnUsernameInputBlur() {
    const minLength = 10;
    const maxLength = 50;

    let extraTextUsernameString = "";

    if (username.length < minLength)
      extraTextUsernameString = "Username must be longer than 10 characters.";
    if (username.length > maxLength)
      extraTextUsernameString = "Username must be less than 60 characters.";

    extraTextUsernameString != ""
      ? setNeedToChangeIconUsername(false)
      : setNeedToChangeIconUsername(true);

    setExtraTextUsername(extraTextUsernameString);
  }

  function OnPasswordInputBlur() {
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const minLength = 10;

    let extraTextPasswordString = "";

    if (!hasNumber.test(password))
      extraTextPasswordString += "A senha precisa ter um número, ";

    if (!hasUpperCase.test(password))
      extraTextPasswordString += "A senha precisa ter uma letra maíuscula, ";

    if (password.length < minLength)
      extraTextPasswordString +=
        "A senha precisa ter pelo menos 10 caracteres.";

    extraTextPasswordString != ""
      ? setNeedToChangeIconPassword(false)
      : setNeedToChangeIconPassword(true);
    setExtraTextPassword(extraTextPasswordString);
  }

  function OnDateOfBirthInputBlur() {
    if (
      dateOfBirht == "" ||
      dateOfBirht == undefined ||
      dateOfBirht == "Invalid type"
    ) {
      setNeedToChangeIconDateOfBirth(false);
      setExtraTextDateOfBirth("Enter a valid date.");
      return;
    }

    const dateOfBirthDateType = new Date(dateOfBirht);
    const age = new Date().getFullYear() - dateOfBirthDateType.getFullYear();
    let extraTextDateOfBirthString = "";

    if (age <= 10)
      extraTextDateOfBirthString =
        "You need to be over 10 years old to create an account.";

    if (age > 120) extraTextDateOfBirthString = "Enter a valid date.";

    extraTextDateOfBirthString != ""
      ? setNeedToChangeIconDateOfBirth(false)
      : setNeedToChangeIconDateOfBirth(true);

    setExtraTextDateOfBirth(extraTextDateOfBirthString);
  }

  function OnEmailInputBlur() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let extraTextEmailString = "";

    if (!emailRegex.test(email))
      extraTextEmailString = "The email provided is not valid.";

    extraTextEmailString != ""
      ? setNeedToChangeIconEmail(false)
      : setNeedToChangeIconEmail(true);
    setExtraTextEmail(extraTextEmailString);
  }

  async function OnFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(dateOfBirht);
    console.log(username);
    console.log(password);
    console.log(email);

    if (
      extraTextDateOfBirth != "" ||
      extraTextPassword != "" ||
      extraTextUsername != "" ||
      extraTextDateOfBirth != ""
    )
      return;

    const user: CreateNewUserInterface = {
      dateOfBirth: dateOfBirht,
      email,
      password,
      username,
    };

    const response = await CreateNewUser(user);
    setModalText(response.responseText);

    if (response.status == 200) {
      setModalTitle("Sucess!");
      setModalTitleIcon(() => IconCheckCircle);
      setButtonTextModal("Ok!");
    } else {
      setModalTitle("Error!");
      setModalTitleIcon(() => IconTimesCircle);
      setButtonTextModal("");
    }

    setIsModalOpen(true);
  }

  return (
    <>
      <SimpleModalRoot isOpen={ísModalOpen}>
        <SimpleModalNav setIsOpen={setIsModalOpen} />
        <SimpleModalContentRoot>
          <div className="flex flex-col items-center text-center gap-8 p-[100px]">
            <h1 className="text-3xl w-full">
              {React.createElement(modalTitleIcon)} {modalTitle}
            </h1>
            <p className="text-lg">{modalText}</p>
            {buttonTextModal && (
              <Button
                text={buttonTextModal}
                onClick={() => {
                  navigate("/login");
                }}
                type="submit"
                className="bg-black-blacker text-white py-2 px-5 w-1/2 text-xl rounded-md hover:bg-verde-green col-span-2 h-full"
              />
            )}
          </div>
        </SimpleModalContentRoot>
      </SimpleModalRoot>
      <div className="flex justify-center items-center bg-rich-black h-[100vh]">
        <Container className="flex bg-bege max-h-[900px] h-full">
          <div className="h-full w-1/3">
            <img
              src="/images/foto_da_pagina_de_login.jfif"
              alt="big_library"
              className="max-h-[900px] w-full h-full"
            />
          </div>
          <div className="w-2/3 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center relative">
              <img
                className="max-w-[150px] max-h-[150px] absolute bottom-4"
                src="/images/logo_sem_fundo.png"
                alt="logo"
              />
              <h1 className="text-5xl font-bold">Be Welcome!</h1>
            </div>
            <p className="text-cinza-fraco py-2">
              Please enter your details below.
            </p>
            <form
              className="w-4/5 grid grid-cols-2 grid-rows-[3fr_1fr] gap-x-4 gap-y-7 h-fit"
              onSubmit={OnFormSubmit}
            >
              <div className="w-full">
                <InputTextRoot className="w-full">
                  <InputTextLabel
                    className="w-full text-justify"
                    text="Email: "
                  >
                    <InputTextChangeIcon
                      firstIcon={FaCheckSquare}
                      secondIcon={FaTimesCircle}
                      condition={needToChangeIconEmail}
                      secondIconStyle="text-red-500 inline text-end"
                      firstIconStyle="text-green-500 inline text-end"
                    />
                    <InputTextInput
                      type="email"
                      value={email}
                      required
                      className="block w-full rounded-md p-2 text-base"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      onBlur={OnEmailInputBlur}
                    />
                    <InputTextExtraText
                      text={extraTextEmail}
                      className="text-end w-full text-sm"
                    />
                  </InputTextLabel>
                </InputTextRoot>
                <InputTextRoot className="w-full mt-4">
                  <InputTextLabel className="w-full" text="Password:">
                    <InputTextChangeIcon
                      firstIcon={FaCheckSquare}
                      secondIcon={FaTimesCircle}
                      condition={needToChangeIconPassword}
                      secondIconStyle="text-red-500 inline text-end"
                      firstIconStyle="text-green-500 inline text-end"
                    />
                    <InputTextInput
                      type="password"
                      value={password}
                      required
                      className="block w-full rounded-md p-2 text-base"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      onBlur={OnPasswordInputBlur}
                    />
                    <InputTextExtraText
                      text={extraTextPassword}
                      className="text-end w-full text-sm"
                    />
                  </InputTextLabel>
                </InputTextRoot>
              </div>
              <div className="w-full">
                <InputTextRoot className="w-full">
                  <InputTextLabel className="w-full" text="Username: ">
                    <InputTextChangeIcon
                      firstIcon={FaCheckSquare}
                      secondIcon={FaTimesCircle}
                      condition={needToChangeIconUsername}
                      secondIconStyle="text-red-500 inline text-end"
                      firstIconStyle="text-green-500 inline text-end"
                    />
                    <InputTextInput
                      type="text"
                      value={username}
                      required
                      className="block w-full rounded-md p-2 text-base"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                      }
                      onBlur={OnUsernameInputBlur}
                    />
                    <InputTextExtraText
                      text={extraTextUsername}
                      className="text-end w-full text-sm"
                    />
                  </InputTextLabel>
                </InputTextRoot>
                <InputTextRoot className="w-full mt-4">
                  <InputTextLabel className="w-full" text="Date of Birth:">
                    <InputTextChangeIcon
                      firstIcon={FaCheckSquare}
                      secondIcon={FaTimesCircle}
                      condition={needToChangeIconDateOfBirth}
                      secondIconStyle="text-red-500 inline text-end"
                      firstIconStyle="text-green-500 inline text-end"
                    />
                    <InputTextInput
                      type="date"
                      value={dateOfBirht}
                      required
                      className="block w-full rounded-md p-2 text-base"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDateOfBirth(e.target.value)
                      }
                      onBlur={OnDateOfBirthInputBlur}
                    />
                    <InputTextExtraText
                      text={extraTextDateOfBirth}
                      className="text-end w-full text-sm"
                    />
                  </InputTextLabel>
                </InputTextRoot>
              </div>
              <Button
                text="Register"
                onClick={() => {}}
                type="submit"
                className="bg-black-blacker text-white py-2 px-5 w-full text-xl rounded-md hover:bg-verde-green col-span-2 h-full"
              />
            </form>
            <p className="m-4">
              Already have a account?{" "}
              <LinkComponentWithUnderline
                linkText="click here!"
                to="/login"
                className="text-verde-green"
              />
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
