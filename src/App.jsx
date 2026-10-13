import { Fragment, useEffect, useMemo, useState } from "react";
import PlanetFilter from "./components/planetFilter";
import PlanetTable from "./components/PlanetTable";
import "./style/style.css";

const API_URL = "https://api.helldivers2.dev/api/v1/planets";

function App() {
  const [planetas, setPlanetas] = useState([]);
  const [busqueda, setBusqueda] = useState(""); // texto del buscador
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, {
      signal: controller.signal,
      headers: {
        "X-Super-Client": "app1",
        "X-Super-Contact": "---",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status} al consultar la API`);
        return res.json();
      })
      .then(setPlanetas)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setCargando(false));

    return () => controller.abort();
  }, []);


  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return planetas.filter((p) => p.name.toLowerCase().includes(termino));
  }, [planetas, busqueda]);

  return (
    <Fragment>
      <header className="header">
        <h1>Planetas de Helldivers 2</h1>
        <p>
          {filtrados.length} de {planetas.length} planetas
        </p>
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
            <PlanetTable planetas={filtrados} />
          </>
        )}
      </main>
    </Fragment>
  );
}

export default App;