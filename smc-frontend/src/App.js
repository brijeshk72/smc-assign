import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart, Products } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
export default App;
