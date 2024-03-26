import React, { useContext, useState } from "react";
import { AuthContext } from "../../utils/auth.context"; // Importa el contexto de autenticación
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom
import { loginService } from "../../utils/auth.services.js"; // Importa el servicio de inicio de sesión

const LoginPage = () => {
  const { authenticateUser } = useContext(AuthContext); // Usa el contexto de autenticación
  const navigate = useNavigate(); // Utiliza useNavigate para manejar la navegación
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Llama al servicio de inicio de sesión para obtener el token de autenticación
      const { authToken } = await loginService(credentials);
      // Guarda el token de autenticación en localStorage
      localStorage.setItem("authToken", authToken);
      // Llama a la función authenticateUser para establecer el estado de autenticación en la aplicación
      await authenticateUser();
      // Redirige al usuario a la página principal después de iniciar sesión correctamente
      navigate("/");
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

          <div className="field--wrapper">
            <input
              type="submit"
              value="Login"
              className="btn btn--lg btn--main"
            />
          </div>
        </form>

        <p>
          Don't have an account? Register <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
