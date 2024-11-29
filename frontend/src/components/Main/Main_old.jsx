
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; 
import jwt_decode from 'jwt-decode'; 
import "./Main.css";

import Modal from '../../elements/Modal';
import Mensaje from '../../elements/Mensaje';
import Paginacion from '../../elements/Paginacion';

const Main = () => {

	const [logged, setLogged] = useState(false);
	const [role, setRole] = useState('');

	const [userName, setUserName] = useState(null);
	const [loading, setLoading] = useState(true); 
	const [error, setError] = useState(null); 

	useEffect(() => {
		const token = Cookies.get('token'); 

		if (token) {
			try {
				// Decodificamos el token para obtener el id del usuario
				const decodedToken = jwt_decode(token); 
				const userId = decodedToken.id;

				// Hacemos la solicitud al backend para obtener los datos del usuario
				fetch(`http://localhost:3000/api/users/${userId}`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`, // Enviamos el token en la cabecera
					},
				})
				.then((response) => {
					if (!response.ok) {
						throw new Error('Error al obtener los datos del usuario');
					}
					return response.json();
				})
				.then((data) => {

					console.log(data);
					setUserName(data.nombre); // el backend devuelve el nombre del usuario
					setLoading(false);
				})
				.catch((error) => {
					console.error('Error:', error);
					setError(error.message); // Guardamos el error para mostrarlo al usuario
					setLoading(false);
				});
			} catch (err) {
				console.error('Error al decodificar el token:', err);
				setError('Error al decodificar el token');
				setLoading(false);
			}
		} else {
			setError('Usuario no autenticado');
			setLoading(false);
		}
	}, []);

	// Si está cargando, mostramos un mensaje de espera
	if (loading) {
		return <h1>Conectando...</h1>;
	}

	// si hay un error, mostramos el mensaje de error
	if (error) {
		return <h1>Error: {error}</h1>;
	}

	return (
		<main className="main">
			<div>
				<h1>Bienvenido {userName ? userName : 'Cargando...'}</h1>
			</div>
		</main>
	);
};

export default Main;
