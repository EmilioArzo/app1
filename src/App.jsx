import { Fragment, useMemo, useState } from "react";
import PlanetFilter from "./components/planetFilter";
import PlanetTable from "./components/PlanetTable";
import usePlanetas from "./hooks/usePlanetas";
import "./style/style.css";

function App() {
  const { personajes, cargando, error } = usePlanetas();
  const [busqueda, setBusqueda] = useState(""); // siempre empieza vacío
  
  const personajesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return personajes;
    return personajes.filter((p) => p.name.toLowerCase().includes(texto));
  }, [personajes, busqueda]);

  return (
    <Fragment>
      <header className="header">
        <h1>Personajes rick and morty</h1>
      </header>

      <main className="main">
        {cargando && <p className="status">Cargando planetas…</p>}
        {error && <p className="status status--error">{error}</p>}

        {!cargando && !error && (
          <>
            <PlanetFilter
              busqueda={busqueda}
              onBuscar={setBusqueda}
              onLimpiar={() => setBusqueda("")}
            />

            {personajesFiltrados.length > 0 ? (
              <PlanetTable personajes={personajesFiltrados} />
            ) : (
              <p className="status">No se encontraron resultados.</p>
            )}
          </>
        )}
      </main>
    </Fragment>
  );
}

export default App;