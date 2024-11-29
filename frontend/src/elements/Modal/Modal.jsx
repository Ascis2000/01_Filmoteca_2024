
import React from "react";
import "./Modal.css"

const Modal = ({ texto="Cargando datos...", style="white" }) => {
	return (
		<>
			<div id="boxModal" className="bg_modal">
				<div className={`modal ${style}`}>
					<p id="txtModal">{texto}</p>
				</div>
			</div>
		</>
	);
};

export default Modal;
