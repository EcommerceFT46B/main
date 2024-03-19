import React from 'react'
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
          <span>X <BsTwitterX className='socilaMedia' /></span>
          <span>Pinterest <FaPinterest className='socilaMedia' /></span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
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