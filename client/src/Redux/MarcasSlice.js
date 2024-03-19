import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:3001";

export const getMarcas = createAsyncThunk("marcas", async () => {
    try {
      const response = await axios.get(`${url}/marcas`);
      console.log(`${url}/marcas`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

export const getById = createAsyncThunk("detalleMarca", async (id) => {
  try {
    const response = await axios.get(`${url}/marcas/${id}`);

    localStorage.setItem("detalleMarca", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const postMarca = createAsyncThunk(
  "marcas/new",
  async (marca) => {
    console.log(marca);
    try {
      const response = await axios.post(`${url}/Marcas/new`, marca);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const MarcasSlice = createSlice({
  name: "marcas",
  initialState: {
    loading: false,
    marcas: [],
    detalleMarca: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getMarcas.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getMarcas.fulfilled, (state, action) => {
      state.loading = false;
      state.marcas = action.payload;
      state.error = null;
    })
    .addCase(getMarcas.rejected, (state, action) => {
      state.loading = false;
      state.marcas = [];
      state.error = action.error.message;
    })

    .addCase(getById.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(getById.fulfilled, (state, action) => {
    state.loading = false;
    state.detalleMarca = action.payload;
    state.error = null;
    })
    .addCase(getById.rejected, (state, action) => {
    state.loading = false;
    state.detalleMarca = [];
    state.error = action.error.message;
    })

    .addCase(postMarca.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(postMarca.fulfilled, (state, action) => {
    state.loading = false;
    state.Marcas = action.payload;
    state.error = null;
    })
    .addCase(postMarca.rejected, (state, action) => {
    state.loading = false;
    state.Marcas = "ERROR FORM POST";
    state.error = action.error.message;
    })

  },
});

export default MarcasSlice.reducer;