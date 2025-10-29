import { Outlet } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
