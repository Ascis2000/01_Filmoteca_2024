
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import ListaMovies from './ListaMovies';
import MovieForm from './ListaMovies/MovieForm';
import Details from './ListaMovies/Details';

import "./Main.css";

/* import Perfil from './Perfil';
import Error404 from './Error404'; */

function Main() {
	return (
		<main className="boxMain">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/peliculas" element={<ListaMovies />} />
				<Route path="/peliculas/details/:id" element={<Details />} />
				<Route path="/peliculas/create" element={<MovieForm />} /> {/* Crear */}
        		<Route path="/peliculas/edit/:id" element={<MovieForm />} /> {/* Editar */}
				{
				/* <Route path="/perfil" element={<Perfil />} />
        		<Route path="*" element={<Error404 />} /> */
				}
			</Routes>
		</main>
	);
}

export default Main;
