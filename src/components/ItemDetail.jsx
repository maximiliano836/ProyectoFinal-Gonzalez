import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../style/ItemDetail.css";

export default function ItemDetail({ producto }) {
  const { addToCart, mensajeError, setMensajeError } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = (cantidad) => {
    const ok = addToCart(producto, cantidad);
    if (ok) {
      setAdded(true);
      setMensajeError(""); // limpia si antes había
    }
  };

  return (
    <div className="item-detail">
      <img src={producto.imagen} alt={producto.nombre} className="item-detail-image" />
      <div className="item-detail-info">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p className="precio">Precio: ${producto.precio}</p>
        {mensajeError && (
          <p className="stock-error">{mensajeError}</p>
        )}
        {added ? (
          <p className="mensaje-ok">✔ Producto en el carrito</p>
        ) : (
          <ItemCount stock={producto.stock} onAdd={onAdd} />
        )}
      </div>
    </div>
  );
}