import { BrowserRouter, Route, Routes } from "react-router-dom";
import Singup from "./pages/Singup";
import Singin from "./pages/Singin";
import Dashboad from "./pages/Dashboad";
import Send from "./pages/Send";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/singup" element={<Singup />} />
          <Route path="/singin" element={<Singin />} />

          <Route path="/dashboad" element={<Dashboad />} />

          <Route path="/send" element={<Send />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
