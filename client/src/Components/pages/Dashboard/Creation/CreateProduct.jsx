import { useState, useEffect } from "react";
import validation from "./validationProduct";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./creationProduct.module.css"

const CreateProduct = () => {
    const baseURL = 'http://localhost:3001';
    const [ errorMessage,setErrorMessage] = useState("")
    const [popupOpen, setPopupOpen] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        especificaciones: '',
        nroserie: '',
        nromac: '',
        precio: '',
        stock: '',
        idCategoria: '',
        idMarca: '',
        idFabricante: '',
        minimo:'',
        preferencia:'',
    });

    const [formErrors, setFormErrors] = useState({});
    const [formHasErrors, setFormHasErrors] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [fabricantes, setFabricantes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [previewImage, setPreviewImage] = useState("");

    const openPopup = () => {
        window.open('', 'popup', 'width=400,height=200');
        setPopupOpen(true);
    }

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(`${baseURL}/categorias`);
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener las categorias:", error);
            }
        }
        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchFabricantes = async () => {
            try {
                const response = await axios.get(`${baseURL}/fabricantes`);
                setFabricantes(response.data);
            } catch (error) {
                console.error("Error al obtener los fabricantes:", error);
            }
        }
        fetchFabricantes();
    }, []);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await axios.get(`${baseURL}/marcas`);
                setMarcas(response.data);
            } catch (error) {
                console.error("Error al obtener las marcas:", error);
            }
        }
        fetchMarcas();
    }, []);

    useEffect(() => {
        const errors = validation(formData);
     setFormErrors(errors);
    }, [formData]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        setFormHasErrors(false); 
        
    }

    const handleImage = async (event) => {
        const selectedImage = event.target.files [0];
  
        if(selectedImage){
          setPreviewImage(URL.createObjectURL(selectedImage))
        
         try{
             const formData = new FormData();
             formData.append("image",selectedImage);
  
             const cloudinaryResponse = await axios.post(`${baseURL}/imagenes/uploadImage`,formData,{
              headers: {
                  "Content-Type": "multipart/form-data",
              }
             })
  
             if(cloudinaryResponse.status === 200 ){
              const cloudinaryData = cloudinaryResponse.data;
              console.log("Imagen subida a Cloudinary exitosamente:", cloudinaryData.imageUrl);
              setFormData((prevData) => ({
                  ...prevData,
                  imagen:cloudinaryData.imageUrl
              }))
              console.log("formData--->", formData);
             }else{
              console.error("Error al subir la imagen a Cloudinary")
             }
  
         }catch(error){
          console.error("Error al enviar la imagen a Cloudinary:", error);
      }
    } else {
      setPreviewImage("");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const errors = validation(formData);
    

    if (Object.values(errors).some((error) => error !== "")) {
        setFormErrors(errors);
        setFormHasErrors(true);
        return;
    }

    try {
        await axios.post(`${baseURL}/productos/new`, formData);
            setSuccessMessage("Producto creado exitosamente.");
            setFormData({
                nombre: "",
                descripcion: "",
                especificaciones: "",
                nroserie: "",
                nromac: "",
                precio: "",
                stock: "",
                idCategoria: "",
                idMarca: "",
                idFabricante: "",
                minimo:'',
                preferencia:''
            });
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        
    } catch (error) {
       
        setErrorMessage(error.response.data.error); 
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    }
}; 

 return(
    <div className={styles.container}>
         <h2 className={styles.titulo}>Crear Nuevo Producto</h2>

         <form onSubmit={onSubmit}>
            <div className={styles.formControl}>
                <label className={styles.nombre}>Nombre: </label>
                <input 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                />
                {formErrors.nombre && <p className={styles.errors}>{formErrors.nombre}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.descripcion}>Descripción: </label>
                <input 
                type="text" 
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                />
                {formErrors.descripcion && <p className={styles.errors}>{formErrors.descripcion}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.especificaciones}>Especificaciones: </label>
                <input 
                type="text" 
                name="especificaciones"
                value={formData.especificaciones}
                onChange={handleChange}
                />
                {formErrors.especificaciones && <p className={styles.errors}>{formErrors.especificaciones}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.nroserie}>Nro.Serie: </label>
                <input 
                type="text" 
                name="nroserie"
                value={formData.nroserie}
                onChange={handleChange}
                />
                {formErrors.nroserie && <p className={styles.errors} >{formErrors.nroserie}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.nromac}>Nro.mac: </label>
                <input 
                type="text" 
                name="nromac"
                value={formData.nromac}
                onChange={handleChange}
                />
                {formErrors.nromac && <p className={styles.errors}>{formErrors.nromac}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.precio}>Precio: </label>
                <input 
                type="text" 
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                />
                {formErrors.precio && <p className={styles.errors}> {formErrors.precio}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.stock}>Stock: </label>
                <input 
                type="text" 
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                />
                {formErrors.stock && <p className={styles.errors}> {formErrors.stock}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.minimo}>Minimo: </label>
                <input 
                type="text" 
                name="minimo"
                value={formData.minimo}
                onChange={handleChange}
                />
                {formErrors.minimo && <p className={styles.errors}>{formErrors.minimo}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.preferencia}>Preferencia: </label>
                <input 
                type="text" 
                name="preferencia"
                value={formData.preferencia}
                onChange={handleChange}
                />
                {formErrors.preferencia && <p className={styles.errors}>{formErrors.preferencia}</p>}
            </div>

            <div>
                <label className={styles.image} htmlFor="image">
                    Image:
                </label>
                <input 
                type="file"
                accept="image/*"
                onChange={handleImage}
                name="image"
                />
                {previewImage && (
                    <img 
                    src={previewImage} 
                    alt="Vista Previa"
                    width={"200px"}
                     />
                )}
                {formErrors.image && (
                    <p className={styles.errors}>{formErrors.image}</p>
                )}
            </div>



            <div className={styles.formControl}>
                <label className={styles.categoria}>Categoria: </label>
                <select
                
                name="idCategoria"
                value={formData.idCategoria}
                onChange={handleChange}
                className={styles.select}
                >
                <option value='' disabled>
                    Seleccione una categoria
                </option>
                {categorias.map((categoria,index) => ( 
                    <option key={index} value={categoria.id} className={styles.option}>
                        {categoria.nombre}
                    </option>
                
                ))}
                </select>
                {formErrors.idCategoria && <p className={styles.errors}>{formErrors.idCategoria}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.fabricante}>Fabricantes: </label>
                <select
                
                name="idFabricante"
                value={formData.idFabricante}
                onChange={handleChange}
                className={styles.select}
                >
                <option value='' disabled>
                    Seleccione un fabricante
                </option>
                {fabricantes.map((fabricante,index) => ( 
                    <option key={index} value={fabricante.id} className={styles.option}>
                        {fabricante.nombre}
                    </option>
                
                ))}
                </select>
                {formErrors.idFabricante && <p className={styles.errors}>{formErrors.idFabricante}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.marca}>Marcas: </label>
                <select
                
                name="idMarca"
                value={formData.idMarca}
                onChange={handleChange}
                className={styles.select}
                >
                <option value='' disabled>
                    Seleccione una marca
                </option>
                {marcas.map((marca,index) => ( 
                    <option key={index} value={marca.id} className={styles.option}>
                        {marca.nombre}
                    </option>
                
                ))}
                </select>
                {formErrors.idMarca && <p className={styles.errors}>{formErrors.idMarca}</p>}
            </div>

            <button type="sumbit"  className={styles.button}>Crear Producto</button>
         </form>
        {errorMessage && (alert(errorMessage))}
        {successMessage && (alert(successMessage))}  
         <Link to="/dashboard/HomeDashboard"className={styles.link}>Volver a HomeDashboard</Link>
    </div>
 )
 }
export default CreateProduct