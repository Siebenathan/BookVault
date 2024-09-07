import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import InputText from "../components/inputs/InputText/InputText";
import { FormEvent, useState } from "react";
import Button from "../components/inputs/Button";
import { Container } from "../components/Layout/Container";
import ThreeDimensionButton from "../components/inputs/ThreeDimensionButton/ThreeDimensionButton";
import InputTextRoot from "../components/inputs/InputText/InputTextRoot";
import InputTextLabel from "../components/inputs/InputText/InputTextLabel";
import InputTextIcon from "../components/inputs/InputText/InputTextIcon";
import InputTextInput from "../components/inputs/InputText/InputTextInput";
import InputTextExtraText from "../components/inputs/InputText/InputTextExtraText";
import InputTextChangeIcon from "../components/inputs/InputText/InputTextChangeIcon";
import { FaCheckSquare } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { Login } from "../services/BookVaultApi/BookVaultAPI";
import LinkComponentWithUnderline from "../components/inputs/LinkComponents/LinkComponentWithUnderline/LinkComponentWithUnderline";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [needToChangeIconEmail, setNeedToChangeIconEmail] =
    useState<boolean>(false);
  const [extraTextEmail, setExtraTextEmail] = useState<string>("");

  // function OnPasswordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const hasNumber = /\d/;
  //   const hasUpperCase = /[A-Z]/;
  //   const minLength = 10;

  //   let extraTextPasswordString = "";

  //   if(!hasNumber.test(e.target.value)) extraTextPasswordString += "A senha precisa ter um número";

  //   if(!hasUpperCase.test(e.target.value)) extraTextPasswordString += "A senha precisa ter uma letra maíuscula";

  //   if(e.target.value.length < minLength) extraTextPasswordString += "A senha precisa ter pelo menos 10 caracteres"

  //   setExtraTextPassword(extraTextPasswordString);
  //   setPassword(e.target.value);

  // }

  // function OnPasswordInputBlur() {
  //   const hasNumber = /\d/;
  //   const hasUpperCase = /[A-Z]/;
  //   const minLength = 10;

  //   let extraTextPasswordString = "";

  //   if (!hasNumber.test(password))
  //     extraTextPasswordString += "A senha precisa ter um número, ";

  //   if (!hasUpperCase.test(password))
  //     extraTextPasswordString += "A senha precisa ter uma letra maíuscula, ";

  //   if (password.length < minLength)
  //     extraTextPasswordString += "A senha precisa ter pelo menos 10 caracteres.";

  //   extraTextPasswordString != "" ? setNeedToChangeIconPassword(false) : setNeedToChangeIconPassword(true);
  //   setExtraTextPassword(extraTextPasswordString);
  // }

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

    const response = await Login({email, password});
    console.log(response);  
  }

  return (
    <div className="flex justify-center items-center bg-rich-black h-[100vh]">
      <Container className="flex bg-bege max-h-[900px] h-full">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center relative">
            <img
              className="max-w-[150px] max-h-[150px] absolute bottom-4"
              src="/images/logo_sem_fundo.png"
              alt="logo"
            />
            <h1 className="text-5xl font-bold">Welcome Back!</h1>
          </div>
          <p className="text-cinza-fraco py-2">Please enter your details</p>
          <ul className="flex gap-3 pb-4">
            <ThreeDimensionButton
              icon={FcGoogle}
              iconSize="text-3xl"
              className="px-8 py-2 bg-white shadow-[0px_8px_#BEBEBE] active:translate-y-2 active:shadow-[0px_0px_#BEBEBE]"
            />
            <ThreeDimensionButton
              icon={FaFacebook}
              iconSize="text-3xl"
              className="px-8 py-2 bg-white shadow-[0px_8px_#BEBEBE] active:translate-y-2 active:shadow-[0px_0px_#BEBEBE]"
            />
            <ThreeDimensionButton
              icon={FaApple}
              iconSize="text-3xl"
              className="px-8 py-2 bg-white shadow-[0px_8px_#BEBEBE] active:translate-y-2 active:shadow-[0px_0px_#BEBEBE]"
            />
          </ul>
          <p className="pb-4 text-cinza-fraco">or</p>
          <form className="w-1/2" onSubmit={OnFormSubmit}>
            <InputTextRoot className="w-full">
              <InputTextLabel className="w-full" text="Email:">
                <InputTextInput
                  type="email"
                  value={email}
                  required
                  className="block w-full rounded-md p-2 text-sm"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  onBlur={OnEmailInputBlur}
                />
              </InputTextLabel>
            </InputTextRoot>
            <InputTextRoot className="w-full mt-4">
              <InputTextLabel className="w-full" text="Password:">
                <InputTextInput
                  type="password"
                  value={password}
                  required
                  className="block w-full rounded-md p-2 text-sm"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <LinkComponentWithUnderline
                  linkText="forgot password?"
                  to=""
                  className="text-sm"
                ></LinkComponentWithUnderline>
              </InputTextLabel>
            </InputTextRoot>
            <Button
              text="Sign in"
              type="submit"
              className="bg-black-blacker text-white py-2 px-5 w-full mt-6 rounded-md hover:bg-verde-green"
            />
            <p className="text-center m-5">
              Dont have a account?{" "}
              <LinkComponentWithUnderline
                className="inline text-verde-green"
                linkText="click here!"
                to="/register"
              />
            </p>
          </form>
        </div>
        <div className="h-full w-1/2">
          <img
            src="/images/foto_da_pagina_de_login.jfif"
            alt="big_library"
            className="max-h-[900px] w-full"
          />
        </div>
      </Container>
    </div>
  );
}
