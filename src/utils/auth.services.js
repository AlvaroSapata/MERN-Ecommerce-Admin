import service from "./config.services";

const signupService = (user) => {
  return service.post("/auth/signup", user);
};

const loginService = (credentials) => {
  // credentials => email, password
  return service.post("/auth/login", credentials);
};

const verifyService = () => {
  // Pasaremos el token
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };