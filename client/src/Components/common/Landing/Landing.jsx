import styles from './Landing.module.css'
import wallpaper from '/wallpaper.jpg'

import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className={styles.container}>
        <img src={wallpaper} className={styles.img} alt="Error 404"/>
        <div className={styles.center}>
          <h1>Bienvenidos a Tech Store</h1>
          <br />
          <hr />
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla neque porro sint perspiciatis ad ratione eos deserunt magni iusto molestias? Vero repudiandae atque cumque veritatis dolores recusandae nesciunt repellendus maiores!
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
