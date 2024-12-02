
import React from "react";
import "./Paginacion.css"

/*
Ejemplo de llamada en el componente que lo utilice:
// ESTADO para paginacion
// variable 'currentPage' con el valor '1'
// funcion asociada del Estado: setCurrentPage()
const [currentPage, setCurrentPage] = useState(1);

// definicion de valores
const itemsPerPage = 25; 
const totalItems = 1025;

// calculamos el rango según la página actual
// cada vez que cambian los valores de currentPage, 
// actualizamos los valores de start y end que lanzan useEfeect nuevamente
const start = ((currentPage - 1) * itemsPerPage) + 1; // ( (1-1) * 25) + 1 => 0 + 1 => 1
const end = currentPage * itemsPerPage; // 1 * 25 => 25

// Uso del Componente
<Paginacion
	currentPage={currentPage}
	itemsPerPage={itemsPerPage}
	totalItems={totalItems}
	onPageChange={(cPage) => setCurrentPage(cPage)}
/>
*/

const Paginacion = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
	
	const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	return (
		
		<div className="boxPagination">
			<div className="boxInfo">
                <h3>Página {currentPage}/{Math.ceil(totalItems/itemsPerPage)}. (Películas del {start} al {end} de {totalItems})</h3>
            </div>
			<div className="boxBotonera">
				<button
					className="btn_pagination"
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
				>
					&lt;&lt;
				</button>
				<button
					className="btn_pagination"
					onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
					disabled={currentPage === 1}
				>
					Anterior
				</button>
				<span className="pagination">Página {currentPage} de {totalPages}</span>
				<button
					className="btn_pagination"
					onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
					disabled={currentPage === totalPages}
				>
					Siguiente
				</button>
				<button
					className="btn_pagination"
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
				>
					&gt;&gt;
				</button>
			</div>
		</div>
	);
};

export default Paginacion;
