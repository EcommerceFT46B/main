import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './adminUsers.module.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/usuarios`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error trayendo usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdateRole = async (userId, newRoleId) => {
        try {
            const response = await axios.put(
                `http://localhost:3001/usuarios/change/${userId}`,
                { Role: { id: newRoleId } }
            );

            if (!response.data) {
                console.error("Error updating user role:", response.statusText);
                return;
            }

            await fetchUsers();
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };
    
    const handleBanUser = async (userId, isBanned) => {
        try{
            const response = await axios.put(
                `http://localhost:3001/usuarios/change/${userId}`,
                { estado: isBanned }
            );
            if(!response.data) {
                console.error("Errr actualizando el estado de baneo:", response.statusText)
                return;
            }

            await fetchUsers();
        } catch(error) {
            console.error("Error actualizando el estado de baneo:", error) ;
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Administración de usuarios</h1>
            <button className={styles.homeButton}>
            <Link to="/dashboard/HomeDashboard" className={styles.homeLink}>
               HomeDashboard
            </Link>

            </button>
            <ul className={styles.userList}>
                {users.map((user) => (
                    <li key={user.id} className={styles.userListItem}>
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>{user.nombre}</span>
                            <button
                                className={`${styles.adminButton} ${user.Role.rol === "Administrador" ? styles.admin : styles.user}`}
                                onClick={() => handleUpdateRole(user.id, user.Role.rol === "Administrador" ? 2 : 1)}
                            >
                                {user.Role.rol === "Administrador" ? "Quitar admin" : "Hacer Admin"}
                            </button>
                            <button
                                className={`${styles.bannedButton} ${user.estado ? styles.unbanned : styles.banned}`}
                                onClick={() => handleBanUser(user.id, !user.estado)}
                            >
                                {user.estado ? "Banear" : "Desbanear"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUsers;
