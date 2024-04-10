import React, { useContext, useState } from "react";
import { AuthContext } from "../../utils/auth.context"; // Importa el contexto de autenticación
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom
import { loginService } from "../../utils/auth.services.js"; // Importa el servicio de inicio de sesión
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { authenticateUser } = useContext(AuthContext); // Usa el contexto de autenticación
  const navigate = useNavigate(); // Utiliza useNavigate para manejar la navegación
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Llama al servicio de inicio de sesión para obtener el token de autenticación
      const { authToken, message } = await loginService(credentials);
      if (message) {
        // Si hay un mensaje de error, establece el mensaje de error en el estado
        setErrorMessage(message);
      } else {
        // Si no hay mensaje de error, guarda el token de autenticación en localStorage
        localStorage.setItem("authToken", authToken);
        // Llama a la función authenticateUser para establecer el estado de autenticación en la aplicación
        await authenticateUser();
        setErrorMessage(""); // Limpia el mensaje de error
        // Redirige al usuario a la página principal después de iniciar sesión correctamente
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={handleLogin}>
          <div className="field--wrapper">
            <label>
              Email:
              <input
                required
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={credentials.email}
                onChange={handleInputChange}
                autoComplete="email"
              />
            </label>
          </div>

          <div className="field--wrapper">
            <label>
              Password:
              <input
                required
                type="password"
                name="password"
                placeholder="Enter password..."
                value={credentials.password}
                onChange={handleInputChange}
              />
            </label>
          </div>

          {errorMessage && (
            <small style={{ color: "#A01848" }}>{errorMessage}</small>
          )}

          <div className="field--wrapper">
            <input
              type="submit"
              value="Login"
              className="btn btn--lg btn--main"
            />
          </div>
        </form>

         <p>
          Don't have an account? <Link to="/register" className="loginSignupLink">Register here</Link>
        </p> 
      </div>
    </div>
  );
};

export default LoginPage;
