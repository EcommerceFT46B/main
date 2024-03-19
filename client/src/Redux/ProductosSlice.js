import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "localhost:3001";

import axios from "axios";

export const getProductos = createAsyncThunk(
  "productos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/productos`);
      localStorage.setItem("productos", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue([]);
    }
  }
);

export const getById = createAsyncThunk("detalleProductos", async (id) => {
  try {
    const response = await axios.get(`${url}/productos/${id}`);

    localStorage.setItem("detalleProductos", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const postProducto = createAsyncThunk(
  "productos/new",
  async (product) => {
    console.log(product);
    try {
      const response = await axios.post(`${url}/productos/new`, product);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCategories = createAsyncThunk("categorias", async () => {
  try {
    const response = await axios.get(`${url}/categorias`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    detalleProductos: [],
    categories: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.detalleProductos = action.payload;
        state.error = null;
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.detalleProductos = [];
        state.error = action.error.message;
      })

      .addCase(getProductos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProductos.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      })

      .addCase(postProducto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(postProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })

      .addCase(postProducto.rejected, (state, action) => {
        state.loading = false;
        state.products = "ERROR FORM POST";
        state.error = action.error.message;
      })

      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.categories = [];
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
