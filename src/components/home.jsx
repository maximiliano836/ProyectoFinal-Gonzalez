import "../style/home.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="home">
      <h2>¡Bienvenido a TecnoStore!</h2>
      <p>Tu tienda de tecnología favorita. Descubre los mejores productos al mejor precio.</p>
      <Link to="/catalogo">Descubre nuestro catálogo</Link>
    </section>
  );
};

export default Home;