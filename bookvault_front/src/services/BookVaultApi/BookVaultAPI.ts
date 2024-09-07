import {
  GetBookInterface,
  AuthorCreateInterface,
  CreateBookInterface,
  CreateNewUserInterface,
  LoginInformationInterface,
  GetAuthorInterface,
  GetBookAndAuthorInterface,
  GetAuthorAndAllHisBooksInterface,
} from "./BookVaultAPIInterfaces";

export async function CreateNewUser({
  email,
  username,
  password,
  dateOfBirth,
}: CreateNewUserInterface) {
  const user = { email, name: username, password, dateOfBirth };

  try {
    const response = await fetch(
      "http://localhost:5111/bookvault/user/create",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      }
    );
    const responseText = await response.text();
    return { status: response.status, responseText };
  } catch (err: any) {
    const responseText = await err.text();
    return { status: err.status, responseText };
  }
}

export async function Login({ email, password }: LoginInformationInterface) {
  try {
    const response = await fetch(
      `http://localhost:5111/BookVault/user/login?email=${email}&password=${password}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    const responseText = await response.text();
    return { status: response.status, responseText };
  } catch (err: any) {
    const responseText = await err.text();
    return { stauts: err.status, responseText };
  }
}

export async function AddAuthor({
  authorName,
  dateOfBirth,
  countryOfBirth,
  authorSynopsis,
  imageOfTheAuthor,
}: AuthorCreateInterface) {
  const newAuthorFormData = new FormData();
  newAuthorFormData.append("authorName", authorName);
  newAuthorFormData.append("dateOfBirth", dateOfBirth);
  newAuthorFormData.append("countryOfBirth", countryOfBirth);
  newAuthorFormData.append("authorSynopsis", authorSynopsis);
  newAuthorFormData.append("imageOfTheAuthor", imageOfTheAuthor);
  try {
    const response = await fetch(
      `http://localhost:5111/BookVault/admin/createauthor`,
      {
        method: "POST",
        body: newAuthorFormData,
      }
    );
    console.log(response);
    console.log(await response.text());
    // const responseText = await response.text();
    // return { status: response.status, responseText };
  } catch (err: any) {
    console.log(err);
    // const responseText = await err.text();
    // return { stauts: err.status, responseText };
  }
}

export async function GetAllAuthors() {
  try {
    const response = await fetch(
      `http://localhost:5111/BookVault/admin/getallauthors`,
      {
        method: "GET",
      }
    );
    const json: GetAuthorInterface[] = await response.json();
    return json;
  } catch (err: any) {
    console.log(err);
  }
}

export async function GetBookGenres() {
  try {
    const response = await fetch(
      "http://localhost:5111/bookvault/get/bookgenres"
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

export async function CreateNewBook({
  AuthorName,
  BookGender,
  BookName,
  Synopsis,
  BookImageFile,
  NumberOfPages,
  PublicationDate,
}: CreateBookInterface): Promise<void> {
  const newBook = {
    AuthorName,
    BookGender,
    BookName,
    Synopsis,
    NumberOfPages,
    PublicationDate,
  };

  const newAuthorFormData = new FormData();
  if (BookImageFile != null)
    newAuthorFormData.append("imageFile", BookImageFile);

  const newListBookGender = newBook.BookGender.map((item) =>
    item.replaceAll(" ", "_")
  );

  newBook.BookGender = newListBookGender;
  console.log(newListBookGender);

  newAuthorFormData.append("data", JSON.stringify(newBook));

  try {
    const response = await fetch(
      `http://localhost:5111/BookVault/admin/createnewbook`,
      {
        method: "POST",
        body: newAuthorFormData,
      }
    );
    console.log(response);
    console.log(await response.text());
    // const responseText = await response.text();
    // return { status: response.status, responseText };
  } catch (err: any) {
    console.log(err);
    // const responseText = await err.text();
    // return { stauts: err.status, responseText };
  }
}

export async function GetAllBooks(): Promise<GetBookInterface[] | void> {
  try {
    const response = await fetch(
      "http://localhost:5111/BookVault/get/allBooks"
    );
    var json: GetBookInterface[] = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return json;
  } catch (err: any) {
    //provisório melhor mudar depois retornar algo como null, para depois decidir o que fazer
    alert("Ocorreu algum erro ao buscar os livros!");
  }
}

// função está funcionando mas não estou usando no momento.
// export async function GetBookByIdentifier(bookIdentifier: string): Promise<GetBookInterface | void> {
//   try {
//     const response = await fetch(
//       "http://localhost:5111/BookVault/get/bookByIdentifier?bookIdentifier=" + bookIdentifier.replaceAll(" ", "%20")
//     );
//     var json: GetBookInterface = await response.json();
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return json;
//   } catch (err: any) {
//     //provisório melhor mudar depois retornar algo como null, para depois decidir o que fazer
//     alert("Ocorreu algum erro ao buscar o livro!");
//   }
// }

export async function GetBookAndAuthorByIdentifier(
  bookIdentifier: string
): Promise<GetBookAndAuthorInterface | void> {
  try {
    const response = await fetch(
      "http://localhost:5111/BookVault/get/bookAndAuthorByBookIdentifier?bookIdentifier=" +
        bookIdentifier.trim().replaceAll(" ", "%20")
    );
    var json: GetBookAndAuthorInterface = await response.json();
    return json;
  } catch (err: any) {
    //provisório melhor mudar depois retornar algo como null, para depois decidir o que fazer

    alert("Ocorreu algum erro ao buscar o livro!");
  }
}

export async function GetAuthorAndAllHisBooks(
  authorName: string
): Promise<GetAuthorAndAllHisBooksInterface | void> {
  try {
    const response = await fetch(
      "http://localhost:5111/BookVault/get/authorAndAllHisBooks?authorName=" +
        authorName.trim().replaceAll(" ", "%20")
    );
    var json: GetAuthorAndAllHisBooksInterface = await response.json();
    return json;
  } catch (err: any) {
    //provisório melhor mudar depois retornar algo como null, para depois decidir o que fazer
    alert("Ocorreu algum erro ao buscar o livro!");
  }
}

export async function GetBooksByName(
  bookName: string
): Promise<GetBookInterface[] | void> {
  try {
    const response = await fetch(
      "http://localhost:5111/BookVault/get/bookByName?bookName=" +
        bookName.trim().replaceAll(" ", "%20")
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    var json: GetBookInterface[] = await response.json();
    return json;
  } catch (err: any) {
    //provisório melhor mudar depois retornar algo como null, para depois decidir o que fazer
    alert("Ocorreu algum erro ao buscar o livro!");
  }
}
