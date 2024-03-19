// import './App.css'

import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation ,Navigate} from "react-router-dom"
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// import {Home, About, Services} from "./Components/pages"
import Landing from './Components/Landing/Landing'
import Header from './Components/Header/Header'
import Home from "./Components/pages/Home"
import About from "./Components/pages/About"
import Services from "./Components/pages/Services"
import Contact from "./Components/pages/Contact/Contact"
import Budget from "./Components/pages/Budget"
import Brands from "./Components/pages/Brands"
import Profile from "./Components/Profile/Profile"
import Faq from "./Components/pages/Faq/Faq"
import Detail from "./Components/Detail/Detail"
import Carrito from "./Components/Carrito/Carrito"
import DashboardRoutes from "./DashboardRoutes";
import Banned from "./Components/pages/Dashboard/Banned/Banned"

import Footer from "./Components/Footer/Footer"

function App() {

  const { isAuthenticated, user } = useAuth0();
  const [users, setUsers] = useState([]);

  const [isBanned, setIsBanned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/usuarios`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    
    getUsers();
  }, []);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get(`http://localhost:3001/usuarios/email/${user.email}`);
          if (response.data.length > 0) {
            const userData = response.data[0];
            setIsBanned(!userData.estado);
            setIsAdmin(userData.Role.id === 1); 
          } else {
            console.error('No se encontraron usuarios con ese email.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && user) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated && isBanned) {
    return (
      <Routes>
        <Route path="/" element={<Banned />} />
        <Route path="/Home" element={<Banned />} />
        <Route path="/about" element={<Banned />} />
        <Route path="/brands" element={<Banned />} />
        <Route path="/services" element={<Banned />} />
        <Route path="/contact" element={<Banned />} />
        <Route path="/budget" element={<Banned/>} />
        <Route path="/profile" element={<Banned />} />
        <Route path="/faq" element={<Banned />} />
        <Route path="/dashboard" element={<Banned />} />
      </Routes>
    );
  }

  if ((!isAuthenticated || !isAdmin) && location.pathname.startsWith("/dashboard")) {
    return <Navigate to="/Home" />;
  }
  
  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/Carrito" element={<Carrito/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;