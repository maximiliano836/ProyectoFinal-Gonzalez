import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import "../style/Cart.css";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeItem, clearCart, totalAmount } = useCart();
  const [orderId, setOrderId] = useState(null);

  const handleCheckout = async () => {
    const order = {
      buyer: {
        nombre: "api",
        email: "maxigonzalez.uy@gmail.com",
        telefono: "15556504517",
      },
      items: cart.map(item => ({
        id: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
        total: item.precio * item.cantidad,
        descripcion: item.descripcion,
        imagen: item.imagen,
        categoria: item.categoria,
        stock: item.stock,
      })),
      date: Timestamp.fromDate(new Date()),
    };

    try {
      const docRef = await addDoc(collection(db, "ordenes"), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al generar orden:", error);
    }
  };

  if (orderId) {
    return (
      <div className="orden-confirmada">
        <h2>✅ ¡Compra realizada con éxito!</h2>
        <p>Tu ID de verificación es:</p>
        <strong>{orderId}</strong>
        <br />
        <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>🛒 Carrito vacío</h2>
        <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>🛒 Tu carrito</h2>
      <ul className="cart-list">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.imagen} alt={item.nombre} width={80} />
            <div>
              <h3>{item.nombre}</h3>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio unitario: ${item.precio}</p>
              <p>Subtotal: ${item.precio * item.cantidad}</p>
              <button onClick={() => removeItem(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="total">Total: ${totalAmount()}</h3>
      <div className="cart-actions">
        <button onClick={clearCart}>Vaciar carrito</button>
        <Link to="/checkout">
        <button>Finalizar compra</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;