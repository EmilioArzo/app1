import { useEffect, useState } from "react";

const API_URL = "https://rickandmortyapi.com/api/character";

/**
 * 
 * @returns {{ personajes: object[], cargando: boolean, error: string|null }}
 */
function usePlanetas() {
const [personajes, setPlanetas] = useState([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
    .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status} al consultar la API`);
        return res.json();
    })
    .then((data) => setPlanetas(data.results))
    .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
    })
    .finally(() => {
        if (!controller.signal.aborted) setCargando(false);
    });

    return () => controller.abort();
}, []);

return { personajes, cargando, error };
}

export default usePlanetas;