import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainPage from "./pages/MainPage";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PerfilPage from "./pages/PerfilPage";
import CreateAuthorPage from "./pages/CreateAuthorPage";
import CreateBookPage from "./pages/CreateBookPage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import AuthorPage from "./pages/AuthorPage";
import SearchBooksPage from "./pages/SearchBooksPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const browser = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/perfil", element: <PerfilPage /> },
      { path: "/createauthor", element: <CreateAuthorPage /> },
      { path: "/createbook", element: <CreateBookPage /> },
      { path: "/books", element: <BooksPage />},
      { path: "/book/:bookIdentifier", element: <BookPage />},
      { path: "/author/:authorName", element: <AuthorPage />},
      { path: "/books/search/:bookName", element: <SearchBooksPage />},
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={browser} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
