
import React, { useState } from "react";
import Cookies from 'js-cookie'; 
import { useNavigate } from "react-router-dom"; 

import "./Header.css"
import Nav from './Nav'

import Modal from '../../elements/Modal';
import Mensaje from '../../elements/Mensaje';

const Header = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        role: "",
    });

	// ESTADO para estado del login
    // variable 'isLoginMode' con el valor 'true'
    // funcion asociada del Estado: setIsLoginMode()
	const [isLoginMode, setIsLoginMode] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLoginMode ? "auth/login" : "auth/register";

        // Muestra el modal con mensaje inicial
        setShowModal(true);
        setModalText("Procesando solicitud...");

        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
			console.log("DATA=", data);
			console.log("data.token=", data.token);
			console.log("role=", data.user.role);

            if (isLoginMode && data.token) {
                Cookies.set("token", data.token, { path: "/" });
                setModalText("¡Inicio de sesión exitoso!");
                setTimeout(() => {
                    setShowModal(false);
                    navigate("/main");
                }, 2000);
            } else if (!isLoginMode) {
                setModalText("¡Registro completado con éxito!");
                setTimeout(() => setShowModal(false), 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            setModalText("Hubo un problema con la solicitud");
            setTimeout(() => setShowModal(false), 2000);
        }
    };

    const handleLogout = () => {
		setShowModal(true);
		setModalText("Has cerrado la sesión correctamente");
        Cookies.remove("token", { path: "/" });
		setTimeout(() => setShowModal(false), 2000);
        
        navigate("/");
    };

    return (
        <header className="header-container">
            <Nav />
            <div className="auth-container">
				<h1>{isLoginMode ? "Inicia Sesión" : "Regístrate"}</h1>
				<form className="auth-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="nombre">Nombre:</label>
						<input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
					</div>

					{!isLoginMode && (
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
						</div>
					)}

					<div className="form-group">
						<label htmlFor="password">Contraseña:</label>
						<input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
					</div>

					<button className="btn-primary" type="submit">
						{isLoginMode ? "Iniciar Sesión" : "Registrarse"}
					</button>
				</form>

				<button className="btn-secondary" onClick={() => setIsLoginMode(!isLoginMode)}>
					{isLoginMode ? "Sign In" : "Log In"}
				</button>

				{Cookies.get("token") && (
					<button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
				)}
			</div>

			{showModal && <Modal texto={modalText} />}
        </header>
    );
};

export default Header;

