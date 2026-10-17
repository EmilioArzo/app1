import { Fragment, useState } from "react";
import PropTypes from "prop-types";

/**
 *
 * @param {object}   props
 * @param {object[]} props.personajes
 */
function PlanetTable({ personajes }) {
const [abierto, setAbierto] = useState(null);

const alternar = (id) => setAbierto((actual) => (actual === id ? null : id));


return (
    <div className="table-wrap">
    <table className="table">
        <thead>
        <tr>
            <th>Personaje</th>
            <th>Imagen</th>
            <th>nombre</th>
            <th>especie</th>
        </tr>
        </thead>

<tbody>
    {personajes.map((p) => {
        const estaAbierto = abierto === p.id;

        return (
            <Fragment key={p.id}>
                <tr
                    className={`row ${estaAbierto ? "row--open" : ""}`}
                    onClick={() => alternar(p.id)}
                >
                    <td>{p.id}</td>
                    <td>
                        <img
                            src={p.image}
                            alt={p.name}
                            width="60"
                        />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.species}</td>
                </tr>
            </Fragment>
        );
    })}
</tbody>
    </table>
                
    </div>
);
}


PlanetTable.propTypes = {
personajes: PropTypes.arrayOf(
    PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    type: PropTypes.string,
    gender: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    origin: PropTypes.shape({ name: PropTypes.string }).isRequired,
    location: PropTypes.shape({ name: PropTypes.string, }).isRequired,
    episode: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
).isRequired,
};

export default PlanetTable;