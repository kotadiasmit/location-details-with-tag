import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import LocationPage from "./components/LocationPage/LocationPage";
import LocationDetails from "./components/UserDetails/LocationDetails";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LocationDetails />} />
      <Route path="/locationPage" element={<LocationPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
