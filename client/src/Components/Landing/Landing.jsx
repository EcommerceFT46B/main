import styles from './Landing.module.css'
import wallpaper from '/wallpaper.jpg'
import logo from "../../../src/img/storelogo.png"

import { NavLink } from "react-router-dom";

const Landing = () => {
  const user = {
    id:0,
    email:'',
    password:'',
    picture:'',
    nombre:'',
    dirFacturacion:'',
    dirEnvio:'',
    telefono:'',
    estado:'',
    idRol:'',
  }
  localStorage.setItem("user", user);
  
  return (
    <>
      <div className={styles.container}>
      <div className={styles.background}></div>
        <img src={wallpaper} className={styles.img} alt="Error 404"/>
        <div className={styles.center}>
          <img src={logo} alt="Error 404" className={styles.logo} />          
          <br />
          <br />
          <br />
          <hr />
          <br />      
          <h1>Bienvenidos a Tech Store</h1>    
          <p>
          Bienvenido a TECH STORE, el lugar donde la tecnología y el arte se fusionan.
¿Eres un apasionado de la tecnología? ¿Te gusta estar a la última en gadgets y dispositivos? Entonces has llegado al lugar indicado. En TECH STORE encontrarás una amplia selección de dispositivos tecnológicos enmarcados a PC, con diseños únicos y originales que convertirán tu hogar u oficina en un espacio moderno y vanguardista.

¿Qué nos hace diferentes?

Productos únicos: En TECH STORE no encontrarás productos genéricos. Todos nuestros dispositivos están cuidadosamente seleccionados y enmarcados con materiales de alta calidad, para ofrecerte una experiencia única y personalizada.
Variedad: Contamos con una amplia gama de dispositivos para satisfacer todas tus necesidades, desde smartphones y tablets hasta relojes inteligentes, auriculares inalámbricos y mucho más.
Diseños exclusivos: Trabajamos con artistas de todo el mundo para ofrecerte diseños originales y llamativos que no encontrarás en ningún otro lugar.
Atención al cliente: En TECH STORE nos preocupamos por nuestros clientes. Por eso, te ofrecemos un servicio de atención al cliente personalizado y de calidad.
¿Qué estás esperando? Visita nuestra tienda online y descubre todo lo que tenemos para ofrecerte.

En TECH STORE, la tecnología se convierte en arte.
          </p>
          <br />
          <NavLink to='/Home'>
            <button className={styles.button}>Ir a Home</button>
          </NavLink>          
        </div>
      </div>      
    </>
  )
}

export default Landing
