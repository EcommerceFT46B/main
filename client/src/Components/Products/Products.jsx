import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa'
import './Products.css'
import { Link } from 'react-router-dom'

import { addProductCart } from '../../Redux/CarritoSlice'
import { useSelector, useDispatch  } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'

function Products(props) {    
  
  const dispatch = useDispatch()

  const stateGlobal = useSelector((state) => state.products)
  const content = stateGlobal['products']

  console.log('Auth0--->', {useAuth0})
  const { isAuthenticated, user} = useAuth0()
  console.log('isAuthenticated', isAuthenticated)
  console.log('user:', user)
  
  const stateGlobalCarrito = useSelector((state) => state.productsCarrito)

  const getIdUser = async () => {
    const emailUser = user.email
    const respuesta = await axios.get(`http://localhost:3001/usuarios/email/${emailUser}`)
    return respuesta.data[0].id
  }

  let id_Usera 

  (async () => {
    id_Usera = await getIdUser()
  })()

  const handlerCarritoAdd = async (cartNewProduct) => {

    dispatch(addProductCart(cartNewProduct))
    console.log('stateGlobalCarrito--->',stateGlobalCarrito)
    // Crear carrito
    const carData = { idUser: id_Usera }
    const response = await axios.post('http://localhost:3001/car/new', carData)
    console.log('----------------------------------------')
    console.log('Car creation successful:', response.data)

    // Agregar productos al carrito
    // const producto = stateGlobalCarrito.productsCarrito[0]
    console.log('---------------------------------------- producto: ')
    console.log(stateGlobalCarrito)
    const cantidad = cartNewProduct.cantidad
    const idUser = id_Usera
    const idProduct = cartNewProduct.id
    const precio = cartNewProduct.precio
    const idCar = response.data
    const monto = cantidad*precio
    const estado = false
    const productData = {
      idCar,
      idUser,
      idProduct,
      cantidad,
      monto,
      estado
    }

    console.log('////////////////////////// productdata //////////////////////////')
    console.log(productData)

    const responseCartProducts = await axios.post('http://localhost:3001/cartproduct/new', productData)
    console.log('Producto agregado al carrito de la DB:', responseCartProducts)    

  }

  return (
    <div className='productList'>
        <div key={props.id} className='productCard'>
            <Link to={`/detail/${props.id}`}>
                <img src={props.imagen} alt='product-img' className='productImage' height={'100px'}></img>
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