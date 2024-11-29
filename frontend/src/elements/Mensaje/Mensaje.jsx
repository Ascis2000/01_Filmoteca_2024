
import React from "react";
import "./Mensaje.css"

const Mensaje = ({ tipo = "info", texto = "Información" }) => {

	const estilos = {
		error: "error",
		success: "bg-green-100 text-green-800 border-green-400",
		warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
		info: "bg-blue-100 text-blue-800 border-blue-400",
	};

	// Iconos dinámicos según el tipo de mensaje
	const iconos = {
		error: "❌", // Puedes usar un ícono SVG o librerías como FontAwesome
		success: "✅",
		warning: "⚠️",
		info: "ℹ️",
	};

	return (
		<>
			<div className="boxError">
				<div className={`${estilos[tipo]}`}>
					<span className="">{iconos[tipo]}</span>
					<div>{texto}</div>
				</div>
			</div>
		</>
	);
};

export default Mensaje;
