import { BrowserRouter } from "react-router-dom";

import Admin from "./Pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Admin />
      </div>
    </BrowserRouter>
  );
}

export default App;
