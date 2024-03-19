import { Link, NavLink } from "react-router-dom";

import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa6";
import "./Footer.scss"

function Footer() {
  return (
    <div className='footer'>
      <div className="top">
        <div className="item">
          <h1>Social Media</h1>
          <span>Facebook <FaFacebookSquare className='socilaMedia' /></span>
          <span>Instagram <FaInstagramSquare className='socilaMedia' /></span>
          <span>Twitter <BsTwitterX className='socilaMedia' /></span>
          <span>Pinterest <FaPinterest className='socilaMedia' /></span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <a className="link">
          <NavLink to="/home">
            Home
          </NavLink>
        </a>
        <a className="link">
          <NavLink to="/brands">
            Marcas
          </NavLink>
        </a>
        <a className="link">
          <NavLink to="/services">
            Servicios
          </NavLink>
        </a>
        <a className="link">
          <NavLink to="/contact">
            Contact
          </NavLink>
        </a>
        <a className="link">
          <NavLink to="/about">
            About
          </NavLink>
        </a>
        <a className="link">
          <NavLink to="/faq" >
            Preguntas Frecuentes
          </NavLink>
        </a>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, perferendis iste veniam laborum nobis sed error facilis eaque ad totam maxime voluptatem voluptas quo quam quaerat incidunt corrupti rem. Temporibus.</span>
        </div>
        <div className="item">
        <h1>Contact</h1>
          <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, perferendis iste veniam laborum nobis sed error facilis eaque ad totam maxime voluptatem voluptas quo quam quaerat incidunt corrupti rem. Temporibus.</span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">TECH-STORE</span>
          <span className="copyright"> © Copyright 2024. All Rights Reserved.</span>
        </div>
        <div className="right">
          <img src="../../../public/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer