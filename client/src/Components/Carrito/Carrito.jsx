import { useSelector, useDispatch  } from 'react-redux'
import { removeProducto } from '../../Redux/CarritoSlice'

import axios from 'axios'

import styles from './Carrito.module.css'

const Carrito = ()=>{

  const dispatch = useDispatch()

  const stateGlobalCarrito = useSelector((state) => state.productsCarrito)
  const globalCarrito = stateGlobalCarrito

  const carritoJSON = localStorage.getItem("carrito")
  const carritoLocalStorage = JSON.parse(carritoJSON)
  const carrito = carritoLocalStorage
  
  const dropData = (idProduct) => {
    const url = `http://localhost:3001/cartproduct/delete/${idProduct}`
    axios.delete(url)
      .then((response) => {
        console.log("Producto eliminado exitosamente:", response.data)
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error.response.data)
      })
  }

  const handlerDelete = (idProduct)=>{
    dropData(idProduct)
    console.log(globalCarrito)
    dispatch(removeProducto(idProduct))
  }

  const totales = []

  return(
    <div className={styles.container}>
      <h1 className={styles.titulo}>Carrito de productos</h1>
      <table className={styles.table}>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Precio Total</th>
          <th>Borrar</th>
        </tr>
        { 
          carrito && carrito.map(product=>(
            <tr key={product.id}>
              <td>{product.nombre}</td>
              <td>{product.cantidad}</td>
              <td>{product.precio}</td> 
              <td>{totales.push(product.precio * product.cantidad) && product.precio * product.cantidad}</td>
              <td>
                <button className={styles.borrar} onClick={() => handlerDelete(product.id)}>Borrar</button>
              </td>              
            </tr>
          ))
        }
        <tr>
          <td></td>
          <td></td>          
          <td className={styles.totalComprasText}>Total de compra:</td>
          <td className={styles.totalCompras}>{totales ? totales.reduce((acumulador, valorActual) => acumulador + valorActual, 0) : 0}</td>
          <td></td>
        </tr>
      </table>
    </div>
  )
}

export default Carrito
