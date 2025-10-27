import { Outlet } from "react-router-dom";
import { LoginProvider } from "./Context/LoginContext";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <LoginProvider>
          <main>
            <Outlet />
          </main>
        </LoginProvider>
      </AuthProvider>
    </>
  );
}

export default App;
