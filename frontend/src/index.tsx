import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";
import LoginHeader from "./components/LoginHeader";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <>
            <Header /> <Home /> <Footer />
          </>
        ),
      },
      {
        path: "/search",
        element: (
          <>
            <Header /> <SearchPage /> <Footer />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <LoginHeader /> <LoginPage /> <Footer />
          </>
        ),
      },
      {
        path: "/register",
        element: (
          <>
            <LoginHeader /> <RegisterPage /> <Footer />
          </>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <>
            <LoginHeader /> <ForgotPassword /> <Footer />
          </>
        ),
      },
    ],
  },
]);

export default router;
