import React, { useContext, useState } from "react";
import { AuthContext } from "../../utils/auth.context"; // Importa el contexto de autenticación
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom
import { signupService } from "../../utils/auth.services.js"; // Importa el servicio de registro
import { Link } from "react-router-dom";

const SignupPage = () => {
  const { authenticateUser } = useContext(AuthContext); // Usa el contexto de autenticación
  const navigate = useNavigate(); // Utiliza useNavigate para manejar la navegación
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      // Llama al servicio de registro para crear una nueva cuenta
      const { authToken, message } = await signupService(userInfo);
      if (message) {
        // Si hay un mensaje de error, establece el mensaje de error en el estado
        setErrorMessage(message);
      } else {
        // Si no hay mensaje de error, guarda el token de autenticación en localStorage
        localStorage.setItem("authToken", authToken);
        // Llama a la función authenticateUser para establecer el estado de autenticación en la aplicación
        await authenticateUser();
        setErrorMessage(""); // Limpia el mensaje de error
        // Redirige al usuario a la página principal después de registrarse correctamente
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={handleSignup}>
          <div className="field--wrapper">
            <label>
              Email:
              <input
                required
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={userInfo.email}
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
                value={userInfo.password}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="field--wrapper">
            <label>
              Confirm Password:
              <input
                required
                type="password"
                name="confirmPassword"
                placeholder="Confirm password..."
                value={userInfo.confirmPassword}
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
              value="Sign Up"
              className="btn btn--lg btn--main"
            />
          </div>
        </form>

        <p>
          Already have an account? <Link to="/login" className="loginSignupLink">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
