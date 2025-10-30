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
import VerifyEmailPage from "./pages/verifyEmailPage";
import VerifiedEmail from "./pages/verifiedEmail";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import UserLayout from "./layout/UserLayout";
import Purchase from "./pages/Purchase";
import ChangePassword from "./pages/ChangePassword";
import AdminLayout from "./layout/adminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCustomer from "./pages/admin/AdminCustomer";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategory from "./pages/admin/AdminCategory";

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
      {
        path: "/verify-email",
        element: (
          <>
            <LoginHeader /> <VerifyEmailPage /> <Footer />
          </>
        ),
      },
      {
        path: "/verify-successfully",
        element: (
          <>
            <LoginHeader /> <VerifiedEmail /> <Footer />
          </>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <>
            <LoginHeader /> <ResetPassword /> <Footer />
          </>
        ),
      },
      {
        path: "/user/account/profile",
        element: (
          <>
            <Header />
            <UserLayout>
              <Profile />
            </UserLayout>
            <Footer />
          </>
        ),
      },
      {
        path: "/user/account/change-password",
        element: (
          <>
            <Header />
            <UserLayout>
              <ChangePassword />
            </UserLayout>
            <Footer />
          </>
        ),
      },
      {
        path: "/user/purchases",
        element: (
          <>
            <Header />
            <UserLayout>
              <Purchase />
            </UserLayout>
            <Footer />
          </>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <>
            <LoginHeader />
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
            <Footer />
          </>
        ),
      },
      {
        path: "/admin/customers",
        element: (
          <>
            <LoginHeader />
            <AdminLayout>
              <AdminCustomer />
            </AdminLayout>
            <Footer />
          </>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <>
            <LoginHeader />
            <AdminLayout>
              <AdminOrder />
            </AdminLayout>
            <Footer />
          </>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <>
            <LoginHeader />
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
            <Footer />
          </>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <>
            <LoginHeader />
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
            <Footer />
          </>
        ),
      },
      {
        path: "/admin/categories",
        element: (
          <>
            <LoginHeader />
            <AdminLayout>
              <AdminCategory />
            </AdminLayout>
            <Footer />
          </>
        ),
      },
    ],
  },
]);

export default router;
