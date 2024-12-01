
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// funcion que decodifica el token existente en la Cookie
// Ejemplo de uso: 
//    import utilsToken from "./path/utils/token.js";
//    const decodedToken = utilsToken.getDecodedToken();
//    console.log(decodedToken.id) // obtenemos el id
const getDecodedToken = () => {

    const token = Cookies.get("token");

    if (!token) {
        console.error("Ningún JWT token encontrado");
        return null;
    }

    try {
        const decodedToken = jwt_decode(token);
        return decodedToken || null;

    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};

// funcion que elimina el token almacenado en las cookies
// Ejemplo de uso: 
//    import utilsToken from "./path/utils/token.js";
//    utilsToken.deleteToken();
const deleteToken = () => {
    Cookies.remove("token", { path: "/" });
    console.log("JWT token eliminado de las cookies.");
};

const utilsToken = {
    getDecodedToken,
    deleteToken
};

export default utilsToken;
