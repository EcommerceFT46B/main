const validation = (formData) => {
  const errors = {};

  if (formData.nombre.trim() === "") {
    errors.nombre = "El nombre es obligatorio";
  } else if (formData.nombre.length < 5 || formData.nombre.length > 50) {
    errors.nombre = "El nombre debe tener entre 5 y 50 caracteres";
  }

  if (formData.descripcion.trim() == "") {
    errors.descripcion = "La descripcion es obligatoria";
  } else if (
    formData.descripcion.length < 10 ||
    formData.descripcion.length > 100
  ) {
    errors.descripcion = "La descripción debe tener entre 10 y 100 caracteres";
  }

  if (formData.especificaciones.trim() === "") {
    errors.especificaciones = "La especificaciones es obligatoria";
  } else if (
    formData.especificaciones.length < 10 ||
    formData.especificaciones.length > 100
  ) {
    errors.especificaciones =
      "La especificaciones debe tener entre 10 y 100 caracteres";
  }

  if (formData.nroserie.trim() === "") {
    errors.nroserie = "El número de serie es obligatorio";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.nroserie)) {
    errors.nroserie = "El número de serie solo puede contener letras y números";
  }

  if (formData.nromac.trim() === "") {
    errors.nromac = "El número MAC es obligatorio";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.nromac)) {
    errors.nromac = "El número MAC solo puede contener letras y números";
  }

  if (formData.precio.trim() === "") {
    errors.precio = "El precio es obligatorio";
  } else if (
    isNaN(parseInt(formData.precio)) ||
    parseInt(formData.precio) <= 0
  ) {
    errors.precio = "El precio debe ser un número válido mayor que cero";
  }

  if (
    isNaN(parseInt(formData.minimo)) ||
    parseFloat(formData.minimo) % 1 !== 0
  ) {
    errors.minimo = "El minimo debe ser un número entero";
  } else if (parseInt(formData.minimo) <= 0) {
    errors.minimo = "El minimo debe ser un número entero válido mayor que cero";
  }

  if (
    isNaN(parseInt(formData.preferencia)) ||
    parseFloat(formData.preferencia) % 1 !== 0
  ) {
    errors.preferencia = "La preferencia debe ser un número entero";
  } else if (parseInt(formData.preferencia) <= 0) {
    errors.preferencia =
      "La preferencia debe ser un número entero válido mayor que cero";
  }

  if (isNaN(parseInt(formData.stock)) || parseFloat(formData.stock) % 1 !== 0) {
    errors.stock = "El stock debe ser un número entero";
  } else if (parseInt(formData.stock) <= 0) {
    errors.stock = "El stock debe ser un número entero válido mayor que cero";
  }

  if (!formData.idCategoria) {
    errors.idCategoria = "Seleccione una categoría";
  }
  if (!formData.idMarca) {
    errors.idMarca = "Seleccione una marca";
  }
  if (!formData.idFabricante) {
    errors.idFabricante = "Seleccione un fabricante";
  }

  return errors;
};
export default validation;
