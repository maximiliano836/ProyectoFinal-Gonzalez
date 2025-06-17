import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import NavBar from "./components/NavBar";
import ItemListContainer from "./container/ItemListContainer";
import ItemDetailContainer from "./container/ItemDetailContainer";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <CartProvider>
      <Router basename="/ProyectoFinal-Gonzalez">
        <NavBar />
        <ToastContainer autoClose={2000} position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<ItemListContainer />} />
          <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
          <Route path="/detalle/:productoId" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route
            path="*"
            element={
              <h2
                style={{
                  color: "#fff",
                  background: "linear-gradient(90deg,rgb(27, 29, 67),rgb(37, 36, 34))",
                  padding: "2rem",
                  borderRadius: "20px",
                  textAlign: "center",
                  marginTop: "3rem",
                  fontFamily: "Comic Sans MS, Comic Sans, cursive",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  maxWidth: "500px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                🚧 404 - Página no encontrada 🚀
              </h2>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;