import { Fragment, useState } from "react";
import PropTypes from "prop-types";

const formatoNumero = (n) => new Intl.NumberFormat("es-MX").format(n);

/**
 *
 * @param {object}   props
 * @param {object[]} props.planetas
 */
function PlanetTable({ planetas }) {
const [abierto, setAbierto] = useState(null);

const alternar = (index) =>
    setAbierto((actual) => (actual === index ? null : index));

if (planetas.length === 0) {
    return <p className="empty">Ningún planeta coincide con tu búsqueda.</p>;
}

return (
    <div className="table-wrap">
    <table className="table">
        <thead>
        <tr>
            <th>Planeta</th>
            <th>Sector</th>
            <th>Bioma</th>
            <th>Controlado por</th>
            <th className="num">Jugadores</th>
            <th className="num">Salud</th>
        </tr>
        </thead>

        <tbody>
        {planetas.map((p) => {
            const estaAbierto = abierto === p.index;
            const salud = p.maxHealth
            ? Math.round((p.health / p.maxHealth) * 100)
            : 0;

            return (
            <Fragment key={p.index}>
                <tr
                className={`row ${estaAbierto ? "row--open" : ""}`}
                onClick={() => alternar(p.index)}
                >
                <td>
                    <button
                    type="button"
                    className="row__toggle"
                    aria-expanded={estaAbierto}
                    >
                    {p.name}
                    </button>
                </td>
                <td>{p.sector}</td>
                <td>{p.biome?.name ?? "—"}</td>
                <td>
                    <span
                    className={`owner owner--${p.currentOwner.toLowerCase()}`}
                    >
                    {p.currentOwner}
                    </span>
                </td>
                <td className="num">
                    {formatoNumero(p.statistics.playerCount)}
                </td>
                <td className="num">{salud}%</td>
                </tr>

                {estaAbierto && (
                <tr className="detail">
                    <td colSpan={6}>
                    <p>{p.biome?.description}</p>
                    <p>
                        Salud: {formatoNumero(p.health)} /{" "}
                        {formatoNumero(p.maxHealth)} · Regeneración:{" "}
                        {p.regenPerSecond.toFixed(2)}/s · Dueño original:{" "}
                        {p.initialOwner}
                    </p>
                    </td>
                </tr>
                )}
            </Fragment>
            );
        })}
        </tbody>
    </table>
    </div>
);
}


PlanetTable.propTypes = {
planetas: PropTypes.arrayOf(
    PropTypes.shape({
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sector: PropTypes.string,
    biome: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
    }),
    currentOwner: PropTypes.string.isRequired,
    initialOwner: PropTypes.string,
    health: PropTypes.number.isRequired,
    maxHealth: PropTypes.number.isRequired,
    regenPerSecond: PropTypes.number,
    statistics: PropTypes.shape({
        playerCount: PropTypes.number,
    }).isRequired,
    })
).isRequired,
};

export default PlanetTable;