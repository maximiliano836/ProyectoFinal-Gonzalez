import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../style/ItemListContainer.css";
import "../style/ProductCard.css"; 

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let ref = collection(db, "productos");

        if (categoryId) {
          ref = query(ref, where("categoria", "==", categoryId));
        }

        const snapshot = await getDocs(ref);
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(productos);

        // Obtener categorías para el selector
        const allSnapshot = await getDocs(collection(db, "productos"));
        const allProductos = allSnapshot.docs.map(doc => doc.data());
        const categoriasUnicas = [...new Set(allProductos.map(p => p.categoria))];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId]);

  const handleCategoriaChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(`/categoria/${value}`);
    } else {
      navigate("/catalogo");
    }
  };

  return (
    <div className="item-list-container">
      <h1 className="catalog-title">{categoryId ? `Categoría: ${categoryId}` : "Catálogo completo"}</h1>

      <div className="select-wrapper">
        <select value={categoryId || ""} onChange={handleCategoriaChange} className="categoria-select">
          <option value="">Todas</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loader">
          <div className="loader-spinner"></div>
          <p>Cargando productos...</p>
        </div>
      ) : items.length === 0 ? (
        <p className="no-products">No hay productos disponibles.</p>
      ) : (
        <div className="product-grid">
          {items.map(item => (
            <div key={item.id} className="product-card">
              <img
                src={item.imagen}
                alt={item.nombre}
                className="product-image"
              />
              <div className="product-info">
                <h3>{item.nombre}</h3>
                <p className="product-price">${item.precio}</p>
                <button
                  className="ver-detalle-btn"
                  onClick={() => navigate(`/detalle/${item.id}`)}
                >
                  Ver detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemListContainer;