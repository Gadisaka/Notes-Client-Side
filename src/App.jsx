import { useState } from "react";
import ModifyUser from "./components/ModifyUser";
import Navbar from "./components/Navbar";
import User from "./components/user";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import ProtectedRoute from "./components/userProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Main />
      </Router>
    </>
  );
}

const Main = () => {
  const location = useLocation();
  const hideNavbarRoute = ["/auth"];
  return (
    <div>
      {!hideNavbarRoute.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route
          path="/modify"
          element={
            <ProtectedRoute>
              <ModifyUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
