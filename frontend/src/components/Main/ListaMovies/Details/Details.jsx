
import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const pelicula = location.state; // Datos enviados desde ListaMovies

  if (!pelicula) {
    return <div>Error: No se encontraron los datos de la película.</div>;
  }

  return (
    <div>
      <h1>Detalles de la Película</h1>
      <h2>{pelicula.titulo}</h2>
      <p><strong>Director:</strong> {pelicula.director}</p>
      <p><strong>Año:</strong> {pelicula.anio}</p>
      <p><strong>Descripción:</strong> {pelicula.descripcion}</p>
      {/* Agrega más detalles según los datos disponibles */}
    </div>
  );
};

export default Details;
