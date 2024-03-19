import React from 'react';
import styles from './Faq.module.css'; 

const Faq = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Preguntas Frecuentes</h2>
      <div className={styles.faqList}>
      <div className={styles.faqElementos}>
              <h3 className={styles.question}>• ¿Cuáles son los métodos de pago aceptados?</h3>
              <p className={styles.answer}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, iste similique eos unde a aperiam dolore ipsa excepturi rerum magni laboriosam saepe amet nam. Beatae blanditiis voluptate aut explicabo laboriosam.</p>
            </div>
            <div className={styles.faqElementos}>
              <h3 className={styles.question}>• ¿Qué pasa si recibo un producto defectuoso o dañado?</h3>
              <p className={styles.answer}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere architecto tempore corporis sunt perspiciatis consequuntur doloribus quo hic ratione molestias, aut accusamus harum dignissimos maiores culpa vel corrupti unde dolorem?</p>
            </div>
            <div className={styles.faqElementos}>
              <h3 className={styles.question}>• ¿Puedo cancelar o modificar mi pedido después de realizarlo?</h3>
              <p className={styles.answer}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, deserunt! A voluptatibus excepturi, amet nihil molestias praesentium nisi pariatur maxime ut dolore? Ea assumenda in doloremque voluptatem ducimus magni! Eos!</p>
            </div>
      </div>
    </div>
  );
};

export default Faq;
