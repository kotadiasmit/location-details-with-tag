import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import LocationPage from "./components/LocationPage/LocationPage";
import LocationDetails from "./components/LocationDetails/LocationDetails";
import { Provider } from "react-redux";
import store from "./components/Store/store";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LocationDetails />} />
        <Route path="/locationPage" element={<LocationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

export default App;
