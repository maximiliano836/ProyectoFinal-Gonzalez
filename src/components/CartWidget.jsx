import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../style/CartWidget.css"; // si querés estilo visual

export default function CartWidget() {
  const { totalItems } = useCart();

  return (
    <Link to="/carrito" className="cart-widget">
      <FaShoppingCart size={24} />
      {totalItems() > 0 && (
        <span className="cart-count">{totalItems()}</span>
      )}
    </Link>
  );
}