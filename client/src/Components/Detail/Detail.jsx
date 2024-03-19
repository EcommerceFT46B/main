import { useParams } from 'react-router-dom'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { addProductCart } from '../../Redux/CarritoSlice'
import  Rating  from '../Rating/Rating'
import styles from './Detail.module.css'

const Detail = () =>  {
  const dispatch = useDispatch()
  const { id } = useParams()

 
  const product = useSelector((state) => {
    const products = state.products.products; 
    return products.find(product => product.id === parseInt(id)) 
  })

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const idCarritoUser = localStorage.getItem("idCarritoUser")
  console.log('---------------- Carrito id ----------------')
  console.log(idCarritoUser)
  
  const handlerCarritoAdd = async()=> {
    // console.log('State global carrito')
    // console.log(stateGlobalCarrito.productsCarrito)
    // console.log('product')
    // console.log(product)
    dispatch(addProductCart(product))
  }

  
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar className={styles.star} />)
    }
    return stars;
  }

  return (
    <div className={styles.container}>
      <FaShoppingCart className={"productCard__cart"} onClick={handlerCarritoAdd} />
      <h2 className={styles.title}>{product.nombre}</h2>
      <img className={styles.image} src={product.imagen} alt={product.nombre} width={'60%'}/>
      <p className={styles.price}>Precio: ${product.precio}</p>
      <p className={styles.descripcion}>Descripción: {product.descripcion}</p>
      <p className={styles.especificaciones}>Especificaciones: {product.especificaciones}</p>
      <p className={styles.nroserie}>Número de Serie: {product.nroserie}</p>
      <p className={styles.nromac}>Número MAC: {product.nromac}</p>
      <p className={styles.stock}>Stock: {product.stock}</p>
      <p className={styles.minimo}>Mínimo: {product.minimo}</p>
      <p className={styles.preferencia}>Preferencia: {product.preferencia}</p>
      <p className={styles.estado}>Estado: {product.estado ? 'Activo' : 'Inactivo'}</p>
      <p className={styles.categoria}>Categoría: {product.Categoria.nombre}</p>
      <p className={styles.marca}>Marca: {product.Marca.nombre}</p>
      <p className={styles.fabricante}>Fabricante: {product.Fabricante.nombre}</p>
      <div className={styles.rating}>
        <p className={styles.textRating}>Rating:</p>
        <div className={styles.stars}>{renderStars(product.rating)}</div>  
        <div><Rating idProducto={product.id}/></div>       
      </div>
    </div>
  )
}

export default Detail;
