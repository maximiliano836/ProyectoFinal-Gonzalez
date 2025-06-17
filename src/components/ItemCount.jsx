import { useState } from "react";
import "../style/ItemCount.css";

function ItemCount({ stock, initial = 1, onAdd }) {
  const [cantidad, setCantidad] = useState(initial);
  const [error, setError] = useState("");

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
      setError("");
    } else {
      setError("❌ No hay más stock disponible.");
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      setError("");
    }
  };

  const agregarAlCarrito = () => {
    if (cantidad <= stock) {
      onAdd(cantidad);
      setError(""); // limpiar mensaje si estaba
    } else {
      setError("❌ No hay stock suficiente.");
    }
  };

  return (
    <div className="item-count">
      <div className="contador">
        <button onClick={decrementar} disabled={cantidad <= 1}>-</button>
        <span>{cantidad}</span>
        <button onClick={incrementar} disabled={cantidad >= stock}>+</button>
      </div>
      {error && <p className="stock-error">{error}</p>}
      <button onClick={agregarAlCarrito} disabled={cantidad > stock}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ItemCount;