import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./homeDashboard.module.css";
import axios from "axios";

const HomeDashboard = () => {
  const [products, setProducts] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error trayendo los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:3001/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error trayendo las categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await axios.get("http://localhost:3001/marcas");
        setMarcas(response.data);
      } catch (error) {
        console.error("Error trayendo las marcas:", error);
      }
    };

    fetchMarcas();
  }, []);

  useEffect(() => {
    const fetchFabricantes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/fabricantes");
        setFabricantes(response.data);
      } catch (error) {
        console.error("Error trayendo las marcas:", error);
      }
    };

    fetchFabricantes();
  }, []);

  const restoreProduct = async (productId) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea restaurar este producto?"
    );
    if (confirmRestore) {
      try {
        await axios.put(`http://localhost:3001/productos/change/${productId}`, {
          estado: true,
        });
        const response = await axios.get("http://localhost:3001/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al actualizar producto:", error);
      }
    }
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar este producto?"
    );
    if (confirmDelete) {
      try {
        await axios.put(`http://localhost:3001/productos/change/${productId}`, {
          estado: false,
        });
        const response = await axios.get("http://localhost:3001/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  const deleteCategoria = async (categoriaId) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar esta categoria?"
    );
    if (confirmDelete) {
      try {
        await axios.put(`http://localhost:3001/categorias/change/${categoriaId}`, {
          estado: false,
        });
        const response = await axios.get("http://localhost:3001/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al eliminar categoria:", error);
      }
    }
  };

  const restoreCategoria = async (categoriaId) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea restaurar esta categoria?"
    );
    if (confirmRestore) {
      try {
        await axios.put(`http://localhost:3001/categorias/change/${categoriaId}`, {
          estado: true,
        });
        const response = await axios.get("http://localhost:3001/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al restaurar categoria:", error);
      }
    }
  };

  const deleteMarcas = async (marcaId) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea eliminar esta Marca?"
    );
    if (confirmRestore) {
      try {
        await axios.put(`http://localhost:3001/marcas/change/${marcaId}`, {
          estado: false,
        });
        const response = await axios.get("http://localhost:3001/marcas");
        setMarcas(response.data);
      } catch (error) {
        console.error("Error al eliminar marca:", error);
      }
    }
  };

  const restoreMarcas = async (marcaId) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea restaurar esta Marca?"
    );
    if (confirmRestore) {
      try {
        await axios.put(`http://localhost:3001/marcas/change/${marcaId}`, {
          estado: true,
        });
        const response = await axios.get("http://localhost:3001/marcas");
        setMarcas(response.data);
      } catch (error) {
        console.error("Error al restaurar Marcas:", error);
      }
    }
  };

  const deleteFabricantes = async (fabricanteId) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea eliminar este fabricante?"
    );
    if (confirmRestore) {
      try {
        await axios.put(`http://localhost:3001/fabricantes/change/${fabricanteId}`, {
          estado: false,
        });
        const response = await axios.get("http://localhost:3001/fabricantes");
        setFabricantes(response.data);
      } catch (error) {
        console.error("Error al eliminar fabricante:", error);
      }
    }
  };

  const restoreFabricantes = async (fabricanteId) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea restaurar este Fabricante?"
    );
    if (confirmRestore) {
      try {
        await axios.put(`http://localhost:3001/fabricantes/change/${fabricanteId}`, {
          estado: true,
        });
        const response = await axios.get("http://localhost:3001/fabricantes");
        setFabricantes(response.data);
      } catch (error) {
        console.error("Error al restaurar fabricante:", error);
      }
    }
  };

  return (
    <div className={styles.productsContainer}>
      <div className={styles.buttonContainer}>
        <div>
          <Link to="/dashboard" className={styles.buttonDashboard}>Admin Usuarios</Link>
        </div>
        <div>
          <Link to="/dashboard/creationProduct" className={styles.buttonCreation}>Crear Producto</Link>
        </div>
        <div>
          <Link to="/dashboard/creationCategory" className={styles.buttonCreation}>Crar Categoría</Link>
        </div>
        <div>
          <Link to="/dashboard/creationFabricante" className={styles.buttonCreation}>Crear Fabricante</Link>
        </div>
        <div>
          <Link to="/dashboard/creationMarca" className={styles.buttonCreation}>Crear Marca</Link>
        </div>
      </div>
      <h1 className={styles.title}>Lista de productos</h1>

      <table className={styles.productTable}>
        <thead>
          <tr>
            <th className={styles.name}>ID</th>
            <th className={styles.name}>Nombre</th>
            <th className={styles.name}>Descripcion</th>
            <th className={styles.name}>Especificaciones</th>
            <th className={styles.name}>Número de serie</th>
            <th className={styles.name}>Número de MAC</th>
            <th className={styles.name}>Precio</th>
            <th className={styles.name}>Stock</th>
            <th className={styles.name}>Preferencia</th>
            <th className={styles.name}>Categoría</th>
            <th className={styles.name}>Marca</th>
            <th className={styles.name}>Fabricante</th>
            <th className={styles.name}>Imágenes</th>
            <th className={styles.name}>Votos</th>
            <th className={styles.name}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={`${product.estado ? "" : styles.deletedProduct}`}>
              <td className={styles.name}>{product.id}</td>
              <td className={styles.name}>{product.nombre}</td>
              <td className={styles.name}>{product.descripcion}</td>
              <td className={styles.name}>{product.especificaciones}</td>
              <td className={styles.name}>{product.nroserie}</td>
              <td className={styles.name}>{product.nromac}</td>
              <td className={styles.name}>{product.precio}</td>
              <td className={styles.name}>{product.stock}</td>
              <td className={styles.name}>{product.preferencia}</td>
              <td className={styles.name}>{product.Categoria.nombre}</td>
              <td className={styles.name}>{product.Marca.nombre}</td>
              <td className={styles.name}>{product.Fabricante.nombre}</td>
              <td>
                <div className={styles.imagesContainer}>
                  {product.Imagenes.slice(0, 1).map((imagen) => (
                    <img
                      key={imagen.id}
                      src={imagen.url}
                      alt={`Imagen ${imagen.id}`}
                      className={styles.productImage}
                    />
                  ))}
                </div>
              </td>
              <td>
                <ul className={styles.votesList}>
                  {product.Votos.slice(0, 3).map((voto) => (
                    <li key={voto.id} className={styles.voteItem}>
                      Voto: {voto.voto}, Comentario: {voto.comentario}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                {product.estado ? (
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => deleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                ) : (
                  <button
                    className={`${styles.actionButton} ${styles.restoreButton}`}
                    onClick={() => restoreProduct(product.id)}
                  >
                    Restaurar
                  </button>
                )}
                <Link to={`/dashboard/modifications/products/${product.id}`} className={styles.linkEditar}>
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    

        <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2 className={styles.productName}>Lista de Categorias</h2>
          <div className={styles.listContainer}>
            {categorias.map((categoria) => (
              <div key={categoria.id} className={`${styles.itemLista} ${!categoria.estado ? styles.deletedCategoria : ""}`}>
                <div  className={styles.nombre}>{categoria.nombre}</div>
                <button
                  className={categoria.estado ? styles.deleteButton2 : styles.restoreButton2}
                  onClick={() => categoria.estado ? deleteCategoria(categoria.id) : restoreCategoria(categoria.id)}
                >
                  {categoria.estado ? "Eliminar" : "Restaurar"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Marcas */}
        <div className={styles.card}>
          <h2 className={styles.productName}>Lista de Marcas</h2>
          <div className={styles.listContainer}>
            {marcas.map((marca) => (
              <div key={marca.id} className={`${styles.itemLista} ${!marca.estado ? styles.deletedCategoria : ""}`}>
                <div  className={styles.nombre}>{marca.nombre}</div>
                <button
                  className={marca.estado ? styles.deleteButton2 : styles.restoreButton2}
                  onClick={() => marca.estado ? deleteMarcas(marca.id) : restoreMarcas(marca.id)}
                >
                  {marca.estado ? "Eliminar" : "Restaurar"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fabricantes */}
        <div className={styles.card}>
          <h2 className={styles.productName}>Lista de Fabricantes</h2>
          <div className={styles.listContainer}>
            {fabricantes.map((fabricante) => (
              <div key={fabricante.id} className={`${styles.itemLista} ${!fabricante.estado ? styles.deletedCategoria : ""}`}>
                <div className={styles.nombre}>{fabricante.nombre}</div>
                <button
                  className={fabricante.estado ? styles.deleteButton2 : styles.restoreButton2}
                  onClick={() => fabricante.estado ? deleteFabricantes(fabricante.id) : restoreFabricantes(fabricante.id)}
                >
                  {fabricante.estado ? "Eliminar" : "Restaurar"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;