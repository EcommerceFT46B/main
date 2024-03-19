import { useRef,useState,useEffect } from "react";
import { addProduct, removeProducts } from '../../Redux/ProductsSlice'
import { useSelector, useDispatch  } from 'react-redux'
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth0 } from '@auth0/auth0-react';
import "./Header.css";
import logo from "../../../src/img/storelogo.png"
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaShoppingCart } from 'react-icons/fa';
import axios from "axios"

import Products from '../Products/Products';
// import productData from '../../../src/Components/content';

function Navbar() {
  const navRef = useRef();
  const { isAuthenticated ,user} = useAuth0();
  const [isAdmin,setIsAdmin] = useState(false)
  const stateGlobal = useSelector((state) => state.products)
  const content = stateGlobal['products']

  useEffect(()=>{
    const fetchUserRole = async () => {
      try{
        if (user && user.email) {
        const response = await axios.get(`http://localhost:3001/usuarios/email/${user.email}`)
        if(response.data.length>0){
          const userData = response.data[0];
          const roleId = userData.Role.id;
          setIsAdmin(roleId === 1)
         }
        }
      }catch(error){
        console.error("Error al traer rol de usuario:",error)
      }
    }
    if(isAuthenticated){
      fetchUserRole()
    }
  },[isAuthenticated,user])

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const closeNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  const [query, setQuery] = useState('');
	const keys = ['nombre', 'descripcion', 'precio', 'nroserie'];

	function Search(data) {
  const [datos] = data; 
    console.log('datos', datos)
		return (
			data.filter((item) =>
				keys.some(key => item[key].toLowerCase().includes(query)))
		);
	}
  const stateGlobalCarrito = useSelector((state) => state.productsCarrito)
  const globalCarrito = stateGlobalCarrito
  const cantidadProducts = globalCarrito.productsCarrito.length
  return (
    <header className="fixed-header">
      <Link to="/">
        <img className="title-image" src={logo} alt="Logo" />
      </Link>

      <div className=''>
				<input
          // value={query}
					type="text"
					placeholder='buscar...'
					className='input-search'
					onChange={e => setQuery(e.target.value)} />
				{/* <Products data={Search(content)} /> */}
        <FaMagnifyingGlass onClick={() =>{ handleButton() }} className="glass"/>
			</div>

      <nav ref={navRef}>
        <img className="nav-btn-title nav-close-btn-title" src={logo} alt="Logo" />
        <a className="title-name">
          <NavLink to="/home" onClick={closeNavbar}>
            Home
          </NavLink>
        </a>
        <a className="title-name">
          <NavLink to="/brands" onClick={closeNavbar}>
            Marcas
          </NavLink>
        </a>
        <a className="title-name">
          <NavLink to="/services" onClick={closeNavbar}>
            Servicios
          </NavLink>
        </a>
        <a className="title-name">
          <NavLink to="/contact" onClick={closeNavbar}>
            Contact
          </NavLink>
        </a>
        <a className="title-name">
          <NavLink to="/about" onClick={closeNavbar}>
            About
          </NavLink>
        </a>
        <a className="title-name2">
          <NavLink to="/faq" onClick={closeNavbar}>
            Preguntas Frecuentes
          </NavLink>
        </a>
        {isAdmin && (
           <Link to="/dashboard" onClick={closeNavbar} className="admin-btn">
            ADMIN
           </Link>
        )}

        {isAuthenticated ? (
          <Logout closeNavbar={closeNavbar} />
        ) : (
          <Login closeNavbar={closeNavbar} />
        )}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <a>
        <NavLink to="/Carrito">
          <p className="cantidadProducts">{cantidadProducts}</p>
          <FaShoppingCart className="productCard-cartTwo" />
        </NavLink>
      </a>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
