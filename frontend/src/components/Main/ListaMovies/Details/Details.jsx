
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

	return (
		<>
			<div className="boxDetailsMovie">
				<div className="leftSection">
					<h2>{pelicula.titulo}</h2>
					<img src="https://wallpaperaccess.com/full/2612045.jpg" alt="Imagen de Terminator" />
					
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
					<p><strong>Descripción:</strong> {pelicula.sinopsis}</p>
					<p><strong>Título Original:</strong> aaaaa</p>
					<p><strong>Música:</strong> Brad Fiedel</p>
					<p><strong>Casting:</strong> Arnold Schwarzenegger, Linda Hamilton, Michael Biehn</p>
					<p><strong>Sinopsis:</strong> Un cyborg asesino es enviado al pasasesino es enviado al pasasesino es enviado al pasasesino es enviado al pasasesino es enviado al pasasesino es enviado al pasasesino es enviado al pasasesino es enviado al pasasesino es enviado al pasado...</p>
				</div>
			</div>

			<button className="btn_main" onClick={handleGoBack}>
				Volver
			</button>
		</>
	);
};

export default Details;
