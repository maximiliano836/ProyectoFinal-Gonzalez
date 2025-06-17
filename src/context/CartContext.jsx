import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [mensajeError, setMensajeError] = useState("");

  const addToCart = (producto, cantidad) => {
    const itemEnCarrito = cart.find((item) => item.id === producto.id);
    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    if (cantidadActual + cantidad > producto.stock) {
      setMensajeError("❌ No hay suficiente stock disponible.");
      return false;
    }

    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });

    setMensajeError("");
    return true;
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setMensajeError("");
  };

  const totalItems = () =>
    cart.reduce((total, item) => total + item.cantidad, 0);

  const totalAmount = () =>
    cart.reduce((total, item) => total + item.cantidad * item.precio, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        clearCart,
        totalItems,
        totalAmount, 
        mensajeError,
        setMensajeError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}