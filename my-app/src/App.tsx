import { Routes, Route } from "react-router-dom";
import Login from "./services/pages/Login";
import PaymentButton from "./services/pages/Payment";
function App() {
  return (
    <Routes>
            <Route path="/payment" element={<PaymentButton />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
