import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'; 
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Logout.module.css";

const Logout = () => {
  const { logout, user, isAuthenticated } = useAuth0();
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const createUser = async () => {
      if (isAuthenticated) {
        try {
          await axios.post("http://localhost:3001/usuarios/new", {
            email: user.email,
            nombre: user.name,
            avatar: user.picture,
          });
        } catch (error) {
          console.error("Error creating user", error);
        }
      }
    };

    createUser();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        if (isAuthenticated && user && user.email) {
          const response = await axios.get(`http://localhost:3001/usuarios/email/${user.email}`);
          if(response.data.length > 0) {
            setUserImage(response.data[0].picture);
          } else {
            console.error('No se encontró ningún usuario con ese correo electrónico.');
          }
        }
      } catch (error) {
        console.error('Error al obtener la imagen del usuario:', error);
      }
    };

    fetchUserImage();
  }, [isAuthenticated, user]);
  
  return (
    <div className={styles.logoutContainer}>
      <div className={styles.userInfo}>
        <Link to="/profile" className={styles.link}>
          <img className={styles.picture} src={userImage|| user.picture} alt={user.name} width={"50px"}/>
        </Link>
      </div>
      <button
        className={styles.logoutButton}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;