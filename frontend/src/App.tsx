import { Outlet } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { CartDrawerProvider, useCartDrawer } from "./components/CartDrawerContext";
import CartDrawer from "./components/CartDrawer";
import React from "react";

function App() {
  return (
    <>
      <AuthProvider>
        <CartDrawerProvider>
          <CartDrawerPortal />
          <main>
            <Outlet />
          </main>
        </CartDrawerProvider>
      </AuthProvider>
    </>
  );
}

function CartDrawerPortal() {
  const { open, closeDrawer } = useCartDrawer();
  return <CartDrawer open={open} onClose={closeDrawer} />;
}

export default App;
