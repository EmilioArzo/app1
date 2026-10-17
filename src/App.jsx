import { Fragment } from "react";
import PlanetTable from "./components/PlanetTable";
import usePlanetas from "./hooks/usePlanetas";
import "./style/style.css";

function App() {
  const { personajes, cargando, error } = usePlanetas();

  return (
    <Fragment>
      <header className="header">
        <h1>Personajes rick and morty</h1>
      </header>

      <main className="main">
        {cargando && <p className="status">Cargando planetas…</p>}
        {error && <p className="status status--error">{error}</p>}

        {!cargando && !error && <PlanetTable personajes={personajes} />}
      </main>
    </Fragment>
  );
}

export default App;