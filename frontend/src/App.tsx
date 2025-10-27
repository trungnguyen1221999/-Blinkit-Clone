import { Outlet } from "react-router-dom";
import { LoginProvider } from "./Context/LoginContext";

function App() {
  return (
    <>
      <LoginProvider>
        <main>
          <Outlet />
        </main>
      </LoginProvider>
    </>
  );
}

export default App;
