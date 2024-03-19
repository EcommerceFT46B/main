
import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from './Contact.module.css';

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contáctanos</h2>
      <h3 className={styles.subtitle}>Envíanos un mensaje</h3>
      <form className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Mensaje:</label>
          <textarea id="message" name="message" rows="4"></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Enviar</button>
      </form>

      
      <div className={styles.contact}>
        <div className={styles.contactItem}>
          <FaMapMarkerAlt className={styles.icon} />
          <p>Dirección: 123 Calle Principal, Ciudad, País</p>
        </div>
        <div className={styles.contactItem}>
          <FaPhone className={styles.icon} />
          <p>Teléfono: (123) 456-7890</p>
        </div>
        <div className={styles.contactItem}>
          <FaEnvelope className={styles.icon} />
          <p>Email: SrThomson@gmail.com</p>
        </div>
      </div>
      <p className={styles.derechos}>© 2024 - Todos los Derechos Reservados</p>

      
      
    </div>
  );
};

export default ContactPage;
