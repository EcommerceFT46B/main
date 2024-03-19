import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const LinkGetProductos = "http://localhost:3001/productos"

export const getProducts = createAsyncThunk("carrito/obtener", async () => {
  try {
    const response = await axios.get(LinkGetProductos)
    return response.data
  } catch (error) {
    return { error: error.message }
  }
})

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    //products: [...InitialContent]
    products: []
  },
  reducers: {
    addProduct(state, action) {
      action.payload.forEach((product) => {
        const format = {
          id: product.id,
          nombre: product.nombre,
          descripcion: product.descripcion,
          especificaciones: product.especificaciones,
          imagen: product.imagen,
          nroserie: product.nroserie,
          nromac: product.nromac,
          precio: product.precio,
          stock: product.stock,
          minimo: product.minimo,
          preferencia: product.preferencia,
          estado: product.estado,
          Categoria: {
            id: product.Categoria.id,
            nombre: product.Categoria.nombre,
            descripcion: product.Categoria.descripcion,
            estado: product.Categoria.estado,
          },
          Marca: {
            id: product.Marca.id,
            nombre: product.Marca.nombre,
            descripcion: product.Marca.descripcion,
            estado: product.Marca.estado,
          },
          Fabricante: {
            id: product.Fabricante.id,
            nombre: product.Fabricante.nombre,
            descripcion: product.Fabricante.descripcion,
            estado: product.Fabricante.estado,
          },
        }
        const existingProduct = state.products.find(
          (element) => element.id === format.id
          )
        if (!existingProduct) state.products.push(format)
      })
    },
  },
})

export const { addProduct, removeProducts } = ProductsSlice.actions
export default ProductsSlice.reducer

