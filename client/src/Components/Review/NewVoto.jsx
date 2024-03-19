import React, { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './NewVoto.module.css'; // Importa tus estilos CSS

const NewVoto = ({ idProducto, idUsuario }) => {
    const { isAuthenticated } = useAuth0();
    const [calificacion, setCalificacion] = useState(0);
    const [comentario, setComentario] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCalificacionClick = (value) => {
        setCalificacion(value === calificacion ? 0 : value);
    };
    

    const handleVotoSubmit = async () => {
        try {
            if (!isAuthenticated) {
                throw new Error('Usuario no autenticado');
            }

            setLoading(true);
            setError('');

            const response = await axios.post('http://localhost:3001/votes', {
                idProducto,
                idUsuario,
                voto: calificacion, 
                comentario
            });

           
            setLoading(false);
        } catch (error) {
           
            setError('Error al enviar el voto');
            setLoading(false);
        }
    };

    return (
        <div className={styles.newVotoContainer}>
            <h3>Deja tu Voto</h3>
            <div className={styles.calificacion}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <span
                        key={value}
                        className={value <= calificacion ? styles.starSelected : styles.star}
                        onClick={() => handleCalificacionClick(value)}
                    >
                        <FaStar />
                    </span>
                ))}
            </div>
            <div className={styles.formGroup}>
                <label>Comentario:</label>
                <textarea value={comentario} onChange={(e) => setComentario(e.target.value)}></textarea>
            </div>
            <button className={styles.btn} onClick={handleVotoSubmit} disabled={loading}>
                Enviar Voto
            </button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default NewVoto;
