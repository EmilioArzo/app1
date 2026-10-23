import PropTypes from "prop-types";

const CLAVE = "ultimaBusqueda";

/**
 *
 * @param {object}   props
 * @param {string}   props.busqueda   - Texto actual del buscador.
 * @param {Function} props.onBuscar   - Callback que recibe el nuevo texto.
 * @param {Function} props.onLimpiar  - Callback para borrar la búsqueda.
 */
function PlanetFilter({ busqueda, onBuscar, onLimpiar }) {
const manejarCambio = (e) => {
    const texto = e.target.value;

    if (texto.trim() !== "") {
    try {
        localStorage.setItem(CLAVE, texto);
    } catch {
        
    }
    }

    onBuscar(texto);
};

return (
    <div className="filter" role="search">
    <label htmlFor="planet-search" className="filter__label">
        Nombre del planeta
    </label>

    {/* value + onChange = input controlado: cada letra dispara onBuscar */}
    <input
        id="planet-search"
        className="filter__input"
        type="search"
        value={busqueda}
        onChange={manejarCambio}
        placeholder="Escribe para filtrar…"
    />

    <button type="button" className="filter__reset" onClick={onLimpiar}>
        Limpiar
    </button>
    </div>
);
}

PlanetFilter.propTypes = {
busqueda: PropTypes.string.isRequired,
onBuscar: PropTypes.func.isRequired,
onLimpiar: PropTypes.func.isRequired,
};

export default PlanetFilter;