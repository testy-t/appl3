
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">Мой сайт</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-blue-200">
              Главная
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-blue-200">
              О нас
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-white hover:text-blue-200">
              Услуги
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
