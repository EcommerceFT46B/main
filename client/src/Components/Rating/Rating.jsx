import { useAuth0 } from "@auth0/auth0-react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVotos, postVotos } from '../../Redux/VotosSlice';
import axios from 'axios';
//import { FaStar } from 'react-icons/fa';
import './Rating.module.css'

const Rating = ({idProducto}) => {
  console.log('idProducto---->',idProducto);
  const stateGlobal = useSelector((state) => state.votos);
  const datosVotos = stateGlobal['datosVotos'];
  const [isLoading, setIsLoading] = useState(true);

  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState(0);

  const dispatch = useDispatch();

  const syncronized = async () => {
    await dispatch(getVotos(idProducto));
  }

  //Recuperando los datos de los votos del producto
  useEffect(() => {
    const fetchData = async () => {
      await syncronized();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //recuperando el id del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(`http://localhost:3001/usuarios/email/${user.email}`);
          if (response.data.length > 0) {
            const userData = response.data[0];
            console.log('user.data--->', userData);
            setUserId(userData.id);
            console.log('userId--->', userData.id);
          } else {
            console.error('No se encontraron usuarios con ese email.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [isAuthenticated, user.email]);
  

  let sw=0;
  let promedio=0;
  let totalVotos=0;
  let comentarios="";

  if(datosVotos && datosVotos.length > 0) {
    promedio=parseFloat(datosVotos[0].promedio).toFixed(2); 
    totalVotos=datosVotos[1].count;
    const listacomentarios = [];
    for (let i = 2; i < datosVotos.length; i++) {
      listacomentarios.push(datosVotos[i].comentario);
    }
    comentarios = listacomentarios.join("<br/>");
    console.log('comentarios->',comentarios);
    if(userId>0){
      //useEffect(()=>{dispatch(getvotosUser(idUser));},[dispatch, idUser])
      if(datosVotos && datosVotos.length > 0) sw=0;
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    const voto = document.getElementById('voto').value;
    const comentario = document.getElementById('comentario').value;
    const newVote={
      idUsuario  : userId,
      idProducto : idProducto,
      voto       : voto,
      comentario : comentario
    };
    console.log("Voto nuevo--->",newVote);
    dispatch(postVotos(newVote));
  }
  //Configurando el área para voto y comentario del usuario
  let datosRatingUser=null;
  if(userId>0 && sw===0) {
    datosRatingUser=(
        <div id="datosRatingUser" className="rating-Conteiner">
          <form onSubmit={handleSubmit}>
              <label>Calificar el producto</label>
              <select name="voto" id="voto" tabIndex={1}>
                <option value="1">1 min</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 max</option>
              </select>
              <h4>Agregar comentario</h4>
                <textarea
                  name="comentario" 
                  id="comentario" 
                  placeholder="Escriba su comentario sobre el producto"
                  rows={2}
                  maxLength={700} 
                  tabIndex={2}
                />
            <button type='submit' tabIndex={3}>Votar</button>
        </form>
        <h4>Comentarios sobre el producto:</h4>
        <h4>{comentarios}</h4>
      </div>
    )
  }
  const datosRating=(
  <div>
    <hr/>
    <h4 className="rating-text">⭐{promedio}&nbsp;&nbsp;🗳 Votos:{totalVotos}</h4>
  </div>)
  console.log('isLoading--->', isLoading);
  return (
    <div className="rating-conteiner">
    {!isLoading && (
      <>
        {datosRating}
        {datosRatingUser}
      </>
    )}
  </div>
  )
}
export default Rating;