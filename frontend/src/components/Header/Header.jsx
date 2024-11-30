
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 

import "./Header.css"
import Nav from './Nav'

import Auth from "../../elements/Auth";
import { AuthContext } from '../../context/AuthContext'

import Modal from '../../elements/Modal';
import Mensaje from '../../elements/Mensaje';

const Header = () => {

    const { isAuthenticated, logout } = useContext(AuthContext);
    const [isVisible, setIsAuthVisible] = useState(true);
    
    // FUNCION
    // Toogle que muestra u oculta la capa de autenticacion 
    const toggleAuth = () => {
        const visible = !isVisible; // invierte el estado actual
        setIsAuthVisible(visible); // actualiza el estado con el nuevo valor
    };

    return (
        <>
            {isVisible && <Auth onClose={toggleAuth} />}

            {/* <header className="header-container">
            {
                isAuthenticated ? (
                    <p>Estás autenticado</p>
                ) : (
                    <p>No estás autenticado</p>
                )
            }
                <Nav onAuthClick={toggleAuth} />
                
            </header> */}

            <header className="boxHeader">
                <Nav onAuthClick={toggleAuth} />
            </header>
        </>
    );
};

export default Header;
