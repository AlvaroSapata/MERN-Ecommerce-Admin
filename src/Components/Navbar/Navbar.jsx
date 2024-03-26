import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import navlogoImg from "../Assets/nav-logo-Image.svg";
import navlogoLAGRIMA from "../Assets/nav-logo-LAGRIMA.svg";
import navlogoAdmin from "../Assets/nav-logo-Admin.svg";
import LoginIcon from "../Assets/login.svg";
import LogoutIcon from "../Assets/logout.svg";
import { AuthContext } from "../../utils/auth.context"; // Importa el contexto de autenticación

const Navbar = () => {
  const { user, isLoggedIn, authenticateUser } = useContext(AuthContext); // Obtiene el usuario y el estado de autenticación del contexto de autenticación
  console.log(user);
  console.log(isLoggedIn);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Elimina el token del almacenamiento local
      localStorage.removeItem("authToken");
      // Llama a la función de autenticación con un objeto vacío para cerrar la sesión
      await authenticateUser({});
      // Redirige al usuario a la página de inicio de sesión
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="nav-logo">
          <img src={navlogoImg} className="nav-logo--icon" alt="Icon" />
          <div className="nav-logo--text">
            <img
              src={navlogoLAGRIMA}
              className="nav-logo--title"
              alt="LA.GRIMA"
            />
            <img
              src={navlogoAdmin}
              className="nav-logo--admin"
              alt="Admin Panel"
            />
          </div>
        </div>
      </Link>
      {isLoggedIn ? ( // Si hay un usuario autenticado, muestra su nombre y botón de logout
        <div className="nav-profile">
          <p>Welcome {user.name}</p>
          <img
            src={LogoutIcon}
            className="nav-profile--icon"
            alt="Logout"
            onClick={handleLogout}
          />
        </div>
      ) : (
        // Si no hay usuario autenticado, muestra el botón de login
        <Link to="/login">
          <img src={LoginIcon} className="nav-profile" alt="Login" />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
