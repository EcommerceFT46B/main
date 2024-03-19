import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:3001";

export const getCategorias = createAsyncThunk("categorias", async () => {
    try {
      const response = await axios.get(`${url}/categorias`);
      console.log(`${url}/categorias`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

export const getById = createAsyncThunk("detalleCategorias", async (id) => {
  try {
    const response = await axios.get(`${url}/categorias/${id}`);

    localStorage.setItem("detalleCategorias", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const postCategoria = createAsyncThunk(
  "categorias/new",
  async (categoria) => {
    console.log(categoria);
    try {
      const response = await axios.post(`${url}/categorias/new`, categoria);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const CategoriasSlice = createSlice({
  name: "categorias",
  initialState: {
    loading: false,
    categorias: [],
    detalleCategoria: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getCategorias.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCategorias.fulfilled, (state, action) => {
      state.loading = false;
      state.categorias = action.payload;
      state.error = null;
    })
    .addCase(getCategorias.rejected, (state, action) => {
      state.loading = false;
      state.categorias = [];
      state.error = action.error.message;
    })

    .addCase(getById.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(getById.fulfilled, (state, action) => {
    state.loading = false;
    state.detalleCategoria = action.payload;
    state.error = null;
    })
    .addCase(getById.rejected, (state, action) => {
    state.loading = false;
    state.detalleCategoria = [];
    state.error = action.error.message;
    })

    .addCase(postCategoria.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(postCategoria.fulfilled, (state, action) => {
    state.loading = false;
    state.categorias = action.payload;
    state.error = null;
    })
    .addCase(postCategoria.rejected, (state, action) => {
    state.loading = false;
    state.categorias = "ERROR FORM POST";
    state.error = action.error.message;
    })

  },
});

export default CategoriasSlice.reducer;