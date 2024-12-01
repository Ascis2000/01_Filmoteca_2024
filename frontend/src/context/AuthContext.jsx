
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // almacenar los datos del usuario
    const [error, setError] = useState(null); // Estado para manejar errores
    const [loading, setLoading] = useState(true); // Estado de carga

    // verificamos si hay un token almacenado en las cookies cuando el componente se monta 
    // si el token existe, el usuario está autenticado
    // se actualiza el estado 'isAuthenticated' a true.
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            console.log("TOKEN", token)
            setIsAuthenticated(true);
            // Si hay token, obtenemos los datos del usuario
            getUserData(token);
        } else {
            setLoading(false);
        }
    }, []);

    // Función 
    // obtenemos los datos del usuario desde el backend
    // de esta forma activamos useEffect
    const getUserData = (token) => {
        try {
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.id;

            // Ejem: http://localhost:3000/api/users/10
            fetch(`http://localhost:3000/api/users/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos del usuario");
                    }
                    return response.json();
                })
                .then((data) => {
                    setUser(data); // Guardamos los datos del usuario
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error al obtener los datos del usuario:", err);
                    setError(err.message);
                    setLoading(false);
                });
        } catch (err) {
            console.error("Error al decodificar el token:", err);
            setError("Token inválido");
            setLoading(false);
        }
    };

    // creamos la cookie 'token'
    // isAuthenticated = true
    const login = (token) => {
        Cookies.set("token", token, { path: "/" });
        setIsAuthenticated(true);
        getUserData(token); // obtenemos los datos del usuario
    };

    // eliminamos la cookie 'token'
    // isAuthenticated = false
    // limpiamos los datos del usuario
    const logout = () => {
        Cookies.remove("token", { path: "/" });
        setIsAuthenticated(false);
        setUser(null); // Limpiamos los datos del usuario
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
