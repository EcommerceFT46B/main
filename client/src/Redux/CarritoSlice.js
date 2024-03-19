import { createSlice } from '@reduxjs/toolkit';

const CarritoSlice = createSlice({
  name: 'productsCarrito',
  initialState: {
    productsCarrito: []
  },
  reducers: {
    addProductCart(state, action) {
      const existingProductIndex = state.productsCarrito.findIndex((product) => product.id === action.payload.id)
      const idCarritoUser = localStorage.getItem("idCarritoUser")
      if (existingProductIndex !== -1) {
        state.productsCarrito[existingProductIndex].cantidad += 1
      }
      else {
        const usuario = localStorage.getItem("user")
        console.log('usuario--->', usuario)
        state.productsCarrito.push({ id_user: usuario.id, id_carrito: idCarritoUser, ...action.payload, cantidad: 1})

      }
      localStorage.setItem("carrito", JSON.stringify(state.productsCarrito))  
    },
    removeProducto(state, action) {
      const productToRemove = state.productsCarrito.find(
        (product) => product.id === action.payload
      )

      if (productToRemove) {
        const index = state.productsCarrito.indexOf(productToRemove)
        state.productsCarrito.splice(index, 1)          
      }
      localStorage.setItem("carrito", JSON.stringify(state.productsCarrito))
    }
  }
})

export const { addProductCart, removeProducto } = CarritoSlice.actions
export default CarritoSlice.reducer
