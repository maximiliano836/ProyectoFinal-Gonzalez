import { Link } from "react-router-dom";
import "../style/Item.css";

export default function Item({ producto }) {
  return (
    <div className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
      <div className="producto-info">
        <h3 className="producto-nombre">{producto.nombre}</h3>
        <p className="producto-precio">${producto.precio}</p>
        <Link to={`/producto/${producto.id}`} className="producto-detalle-btn">
          Ver detalle
        </Link>
      </div>
    </div>
  );
}