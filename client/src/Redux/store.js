import { configureStore } from "@reduxjs/toolkit";

import ProductsSlice from "./ProductsSlice";
import CarritoSlice from "./CarritoSlice";
import VotosSlice from "./VotosSlice";
import CategoriasSlice from "./CategoriasSlice";
import MarcasSlice from "./MarcasSlice";

const store = configureStore({
  reducer: {
    products: ProductsSlice,
    productsCarrito: CarritoSlice,
    votos: VotosSlice,
    categorias: CategoriasSlice,
    marcas: MarcasSlice
  },
});

export default store;
