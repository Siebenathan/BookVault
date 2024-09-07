export interface CreateNewUserInterface {
  email: string;
  username: string;
  password: string;
  dateOfBirth: string;
}

export interface LoginInformationInterface {
  email: string;
  password: string;
}

export interface AuthorCreateInterface {
  authorName: string;
  dateOfBirth: string;
  countryOfBirth: string;
  authorSynopsis: string;
  imageOfTheAuthor: string;
}

export interface GetAuthorInterface {
  authorName: string;
  dateOfBirth: string;
  imageOfTheAuthor: string;
  countryOfBirth: string;
  authorSynopsis: string;
}

export interface CreateBookInterface {
  AuthorName: string;
  PublicationDate: string;
  BookName: string;
  Synopsis: string;
  BookGender: string[];
  NumberOfPages: string;
  BookImageFile: string | null;
}

export interface GetBookInterface {
  authorName: string;
  bookName: string;
  synopsis: string;
  publicationDate: string;
  bookGender: string[];
  bookCoverUrl: string;
  numberOfPages: number;
  bookIdentifier: string;
}

export interface GetBookAndAuthorInterface {
  book: GetBookInterface;
  author: GetAuthorInterface;
}

export interface GetAuthorAndAllHisBooksInterface {
  books: GetBookInterface[];
  author: GetAuthorInterface;
}
