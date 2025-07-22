
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Page404 from "./pages/Page404";
import NavBar from './components/NavBar';
import Profil from './pages/Profil';  


function App() {

    const [isSwitched, setIsSwitched] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--stripe-color',
      isSwitched ? '#000' : '#fff'
    );
  }, [isSwitched]);

  const handleToggle = () => {
    setIsSwitched(prev => !prev);
  };
  return (
    <Router>
            <section className="wrapper">
        <div className="hero"></div>
      </section>

            <NavBar isSwitched={isSwitched} handleToggle={handleToggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}


export default App;

