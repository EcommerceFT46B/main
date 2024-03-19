import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa'
import './Products.css'
import { Link } from 'react-router-dom'

import { addProduct } from '../../Redux/CarritoSlice'
import { useSelector, useDispatch  } from 'react-redux'
import axios from 'axios'


function Products(props) {    
  
  const dispatch = useDispatch()
  const stateGlobalCarrito = useSelector((state) => state.productsCarrito)

  const handlerCarritoAdd = async (cartNewProduct) => {
    console.log(stateGlobalCarrito)
    dispatch(addProduct(cartNewProduct)) 
    
    const usuarioAlmacenado = localStorage.getItem("user")
    const usuario = JSON.parse(usuarioAlmacenado)
    const carData = { idUser: usuario.id }
    const response = await axios.post('http://localhost:3001/car/new', carData)
    console.log('----------------------------------------');
    console.log('Car creation successful:', response.data)

    // Agregar productos al carrito
    const producto = stateGlobalCarrito.productsCarrito[0]
    const cantidad = producto.cantidad
    const idUser = producto.id_user
    const idProduct = producto.id
    const precio = props.precio
    const idCarrito = response.data

    const productData = {
      "idCar": idCarrito,
      "idUser": idUser,
      "idProduct": idProduct,
      "cantidad": cantidad,
      "monto": cantidad*precio,
      "estado": false
    }

    console.log(productData)
    const responseCartProducts = await axios.post('http://localhost:3001/cartproduct/new', productData)
    console.log('Producto agregado al carrito:', responseCartProducts)

    
  }

  return (
    <div className='productList'>
        <div key={props.id} className='productCard'>
            <Link to={`/detail/${props.id}`}>
                {/* <img src={props.imagen} alt='product-img' className='productImage'></img> */}
                {/* <img src={props.imagen} alt='' className='productImage'></img> */}
                {/* <img src={props.imagen} alt='product-img' className='productImage' /> */}
                <img src={props.imagen.imagen} alt='product-img' className='productImage' />

            </Link>
    
            <FaShoppingCart className={"productCard__cart"} onClick={() => handlerCarritoAdd(props)} />
            <FaRegBookmark className={"productCard__wishlist"} />
            <FaFireAlt className={"productCard__fastSelling"} />
    
            <div className='productCard__content'>
                <h5 className='productName'>{props.nombre}</h5>
                <h3 className='productDescription'>{props.descripcion}</h3>
                <div className='displayStack__1'>
                    <div className='productPrice'>${props.precio}</div>
                </div>
                <div className='displayStack__1'>
                    <div className='productNroserie'>Número de serie {props.nroserie}</div>
                </div>
                <div className='displayStack__2'>
                    <div className='productRating' >
                        {[...Array(props.rating)].map((index) => (
                            <FaStar id={index + 1 } key={props.id} />
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
  )
}

export default Products;