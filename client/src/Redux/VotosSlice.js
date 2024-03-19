import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url="http://localhost:3001/votos"

export const getVotosUsuario = createAsyncThunk(
  "dataVotosUsuario",
  async (idUsuario) => {
    const config = {
      method: 'get',
      url: `${url}'/user/${idUsuario}`
    };
    try {
      const response = await axios(config);
      return await response.data;
    }   
    catch (error) {
      console.log(error);
    }
  }
)

export const getVotos = createAsyncThunk(
  "datosVotos",
  async (id) => {
    const config = {
      method: 'get',
      url: `${url}/producto/${id}`
    };
    try {
      const response = await axios(config);
      return await response.data;
    }   
    catch (error) {
      return {error: error.message};
    }
  }
)

export const postVotos = createAsyncThunk(
  "nuevoVoto",
  async (votos) => {
    console.log(votos);
    const config = {
      method: 'post',
      url: `${url}/new`,
      data:votos
    };
    try {
        const response = await axios(config);
        return await response.data;
    }
    catch (error) {
        console.log(error);
    }
  }

)

const votosSlice = createSlice({
  name: 'votos',
  initialState: {
    rating:[]
  },
  reducers:{ },
  extraReducers: (builder) => {
    builder
      .addCase(getVotosUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVotosUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.dataVotosUsuario = action.payload;
        state.error = null;
      })
      .addCase(getVotosUsuario.rejected, (state, action) => {
        state.loading = false;
        state.dataVotosUsuario = [];
        state.error = action.error.message;
      })

      .addCase(getVotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVotos.fulfilled, (state, action) => {
        state.loading = false;
        state.datosVotos = action.payload;
        state.error = null;
      })
      .addCase(getVotos.rejected, (state, action) => {
        state.loading = false;
        state.datosVotos = [];
        state.error = action.error.message;
      })

      .addCase(postVotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(postVotos.fulfilled, (state, action) => {
        state.loading = false;
        state.nuevoVoto = action.payload;
        state.error = null;
      })

      .addCase(postVotos.rejected, (state, action) => {
        state.loading = false;
        state.nuevoVoto = "ERROR FORM POST";
        state.error = action.error.message;
      })
  },
});
export default votosSlice.reducer;