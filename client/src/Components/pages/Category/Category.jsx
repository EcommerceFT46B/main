import { useEffect} from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { getCategorias } from '../../../Redux/CategoriasSlice';
import { getMarcas } from '../../../Redux/MarcasSlice';

import './Category.css';
import searchIcon from "../../../../../client/public/icons/search.png"

const SearchBar = ({ setFilterTerm }) => {
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.trim();
    setFilterTerm(searchTerm);
  };

  const categoriaGlobal = useSelector((state) => state.categorias)
  const categorias      = categoriaGlobal['categorias'];

  const marcaGlobal = useSelector((state) => state.marcas)
  const marcas      = marcaGlobal['marcas'];

  const dispatch = useDispatch()

  useEffect(()=>{
    const syncronized = async() => {
      await dispatch(getCategorias());
    }
    syncronized()
  }, [dispatch])
  console.log('categorias--->',categorias)

  useEffect(()=>{
    const syncronized = async() => {
      await dispatch(getMarcas());
    }
    syncronized()
  }, [dispatch])
  console.log('marcas--->',marcas)
  

  return (
    <div className="category-header">
      <label htmlFor="category">Categoría:</label>
      <select id="category">
      <option value="">Selecciona una categoria</option>
      {categorias.map(categoria => (
        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
      ))} 
      </select>
      <label htmlFor="price">Precio:</label>
      <select id="price">
        <option value="">Selecciona un rango de precios</option>
        <option value="0-50">$0 - $50</option>
        <option value="50-100">$50 - $100</option>
        <option value="100+">$100+</option>
      </select>

      <label htmlFor="marca">Marca:</label>
      <select id="marca">
      <option value="">Selecciona una Marca</option>
      {marcas.map(marca=> (
        <option key={marca.id} value={marca.id}>{marca.nombre}</option>
      ))} 
      </select>
      <div className='containerSearchBar'>
      <button>
      <img src={searchIcon} alt="search" className='search' />
      </button> 
      </div>
    </div>
  );
}

export default SearchBar;
