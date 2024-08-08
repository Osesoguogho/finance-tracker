import React, { useState, useEffect } from "react";

// import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate 
} from "react-router-dom";

// import { toast } from "react-toastify";

//components
import Layout from "./components/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

// toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const Token = localStorage.getItem('token');
      const res = await fetch("http://localhost:3100/api/verify", {
        method: "POST",
        headers: {Authorization: Token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
      <Router>
            <Routes>
              <Route path="/" element={<Layout setAuth={setAuth}/>}>
              <Route
              index
              element={
                isAuthenticated ? (
                  <Dashboard setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" replace/>
                )
              }
            />
            <Route
              path="/login" element={
                !isAuthenticated?( <Login setAuth={setAuth} />) : (<Navigate to="/" replace/>)
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (  <Register  setAuth={setAuth}/>) : (<Navigate to="/login" replace />)
              }
            />
            </Route>
            </Routes>
      </Router>
  );
}

export default App;

