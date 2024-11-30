
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; 

import "./Auth.css";
import Modal from "../Modal";

const Auth = ({ onClose }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
    });

	const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");
    
    const { login, logout, user, isAuthenticated } = useContext(AuthContext); 
    const [isLoginMode, setIsLoginMode] = useState(true);

    useEffect(() => {
        // si el usuario está logueado, podemos omitir los campos de login/registro
        if (isAuthenticated) {
            setIsLoginMode(false); // isLoginMode = false
        }
    }, [isAuthenticated]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLoginMode ? "auth/login" : "auth/register";

        setShowModal(true);
        setModalText("Procesando solicitud...");

        try {
            console.log("endpoint", endpoint)
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("data.token", data.token)
            if (isLoginMode && data.token) {
                login(data.token); // llamamos al método del contexto
                setModalText("¡Se ha iniciado la sesión!");
                setTimeout(() => {
                    setShowModal(false); 
                    onClose();
                    navigate("/");
                }, 2000);
            } else if (!isLoginMode) {
                setModalText("¡Registro completado con éxito!");
                setTimeout(() => setShowModal(false), 100);
            }
        } catch (error) {
            setModalText("Hubo un problema con la solicitud");
            setTimeout(() => setShowModal(false), 100);
        }
    };

    const handleLogout = () => {
        logout(); // llamamos al método del contexto
        setShowModal(true);
        setModalText("Has cerrado la sesión correctamente");
        setTimeout(() => {
            setShowModal(false);
            navigate("/");
        }, 1000);
    };

    return (
        <div className="boxAuth">
            <i className="fa fa-times close-icon auth-close" onClick={onClose}></i>

            <h3>
                {isAuthenticated 
                    ? "Sesión Iniciada" 
                    : isLoginMode 
                    ? "Inicia Sesión" 
                    : "Regístrate"
                }
            </h3>
            
            {!isAuthenticated && (
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {!isLoginMode && (
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">
                        {isLoginMode ? "Iniciar Sesión" : "Registrarse"}
                    </button>
                </form>
            )}

            {!isAuthenticated && (
                <button onClick={() => setIsLoginMode(!isLoginMode)}>
                    {isLoginMode ? "Registrarse" : "Iniciar Sesión"}
                </button>
            )}

            {isAuthenticated && (
                <>
                    <div className="infoUser">
                        <div><strong>Usuario: </strong>{user?.nombre}</div>
                        <div><strong>Tipo: </strong> 
                        {
                            user?.role == 1 ? "No Premium" : 
                            user?.role == 2 ? "Premium" : "Admin"
                        }
                        </div>
                    </div>
                    <button className="close" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </>
            )}

            {showModal && <Modal text={modalText} />}
        </div>
    );
};

export default Auth;