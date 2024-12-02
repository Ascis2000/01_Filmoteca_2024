
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Details.css"

const Details = () => {

	const navigate = useNavigate();

	const location = useLocation();
	const pelicula = location.state; // Datos enviados desde ListaMovies

	if (!pelicula) {
		return <div>Error: No se encontraron los datos de la película.</div>;
	}

	const handleGoBack = () => {
		navigate(-1); // Navega hacia la página anterior
	};

	const defaultImageUrl = "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"; 

	return (
		<>
			<div className="boxDetailsMovie">
				<div className="leftSection">
					<h2>{pelicula.titulo}</h2>
					<img src={pelicula.image_url || defaultImageUrl} alt="Imagen de " />
					
				</div>
				<div className="rightSection">
					<p><strong>Calificación: </strong> 
						<i className="fas fa-star on"></i>
						<i className="fas fa-star on"></i>
						<i className="fas fa-star on"></i>
						<i className="fas fa-star on"></i>
						<i className="fas fa-star on"></i>
					</p>
					<p><strong>Director:</strong> {pelicula.director}</p>
					<p><strong>Año:</strong> {pelicula.anio}</p>
					<p><strong>Título Original:</strong> {pelicula.titulo_original}</p>
					<p><strong>Música:</strong> {pelicula.musica}</p>
					<p><strong>Casting:</strong> John Doe and Johanna Doe</p>
					<p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
				</div>
			</div>

			<button className="btn_main" onClick={handleGoBack}>
				Volver
			</button>
		</>
	);
};

export default Details;
