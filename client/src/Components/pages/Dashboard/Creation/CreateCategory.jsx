import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./createCategory.module.css";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3001/categorias/new", data);
      setSuccessMessage("Categoría creada exitosamente.");
      setTimeout(() => {
        setSuccessMessage("");
        reset()
    }, 2000);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className={styles.container}>
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      <h2 className={styles.title}>Crear Nueva Categoría</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formControl}>
          <label htmlFor="nombre" className={styles.nombre}>
            Nombre:
          </label>
          <input
            type="text"
            {...register("nombre", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[^0-9]+$/,
                message: "No debe contener números",
              },
              minLength: {
                value: 5,
                message: "El nombre debe tener al menos 5 caracteres",
              },
              maxLength: {
                value: 20,
                message: "El nombre debe tener menos de 20 caracteres",
              },
            })}
          />
          {errors.nombre && (
            <p className={styles.error}>{errors.nombre.message}</p>
          )}
        </div>
        
        <div className={styles.formControl}>
          <label htmlFor="descripcion" className={styles.descripcion}>
            Descripción:
          </label>
          <input
            type="text"
            {...register("descripcion", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[^0-9]+$/,
                message: "No debe contener números",
              },
              minLength: {
                value: 5,
                message: "La descripción debe tener al menos 5 caracteres",
              },
              maxLength: {
                value: 50,
                message: "La descripción debe tener menos de 50 caracteres",
              },
            })}
          />
          {errors.descripcion && (
            <p className={styles.error}>{errors.descripcion.message}</p>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Crear Categoría
        </button>
      </form>

      <Link to="/dashboard/HomeDashboard" className={styles.link}>
        Volver a HomeDashboard
      </Link>
    </div>
  );
};

export default CreateCategory;