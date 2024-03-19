import React, { useState } from 'react'
import productData from '../../Components/content'
import { Link } from 'react-router-dom';
import SelectedCategory from '../../Components/SelectedCategory'

const nombre = (
    <h2>Busca entre <span>Miles</span> de <span>Productos</span> para tu equipo de computo.</h2>
)

const desc = "Tenenos lo ultimo en tecnologia para tu equipo de equipo con las mejores marcas de calidad."
const bannerList = [ { 
    iconName: "icofont-users-alt-4", 
    text: "Miles de clientes" }, 
    { 
    iconName: "icofont-notification", 
    text: "Mas de 2000 productos" }, 
    { 
    iconName: "icofont-globe", 
    text: "Recibe cualquier pedido en la puesta de tu casa", }, ];

function Banner() {
    const [searchInput, setSearchInput] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(productData);
    // console.log(productData);

    // search functionality

    const handleSearch = e => {
        console.log(e.target.value);
        const searhTerm = e.target.value;
        setSearchInput(searhTerm);

        // filtering products based of search
        const filtered = productData.filter((product) => product.name.toLowerCase().includes(searhTerm.toLowerCase()));
        setFilteredProducts(filtered);
    }

  return (
    <div className='banner-section style-4'>
        <div className='container'>
            <div className='banner-content'>
                {nombre}
                <form>
                    <SelectedCategory select={'all'}/>
                    <input 
                    type='text' 
                    name='search' 
                    id='search' 
                    placeholder='Seleciona tu producto' 
                    value={searchInput} onChange={handleSearch}/>
                    <button type='submit'>
                        <i className='icofont-search'></i>
                    </button>
                </form>
               <h4>{desc}</h4>
               <ul className='lab-ul'>
                {
                    searchInput && filteredProducts.map((product, i) => <li key={i}>
                        <Link to={`/shop/${product.id}`}>{product.name}</Link>
                    </li>)
                }
                </ul> 
            </div>
        </div>
    </div>
  )
}

export default Banner