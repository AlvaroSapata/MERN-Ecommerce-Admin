import { BrowserRouter } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Admin from "./Pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <div>
      <Navbar />
        <Admin />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
