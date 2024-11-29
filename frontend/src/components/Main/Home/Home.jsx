
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../../context/AuthContext";

const Home = () => {

	const { isAuthenticated, user, loading, error } = useContext(AuthContext);

    if (loading) {
        return <h1>Conectando...</h1>;
    }

    if (error) {
        return <h3>Error: {error}</h3>;
    }

    return (
        <div className="home">
            {
				isAuthenticated ? (
					<>
						<h1>Bienvenido, {user?.nombre || "Usuario"}!</h1>
						<p>Tu rol es: {user?.role || "Sin rol asignado"}</p>

						{
							user?.role == 1 ? (
								<>
									<p>Tu rol rollero es: {user?.role || "Sin rol asignado"}</p>
								</>
							) : (
								<p>Tu rol es {user?.role}</p>
							)
						}
					</>
				) : (
					<p>Por favor, inicia sesión para continuar.</p>
				)
			}
        </div>
    );
};

export default Home;