import { useState, useEffect } from "react";

const RANGO_PRECIO = { min: 7000, max: 50000 };

function precioAleatorio() {
  return Math.floor(Math.random() * (RANGO_PRECIO.max - RANGO_PRECIO.min + 1)) + RANGO_PRECIO.min;
}


export function useCharacters(limiteTotal = 12) {
  const [personajesTodos, setPersonajesTodos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
      let activo = true; // evita actualizar el estado si elcomponente ya se desmontó

      async function cargarPersonajes() {
        try {
          setCargando(true);
          const resPersonajes = await fetch("https://www.amiiboapi.org/api/amiibo/?gameseries=Super%20Mario");
          if (!resPersonajes.ok) throw new Error("No se pudo cargar el catálogo");
        
        
          const dataPersonajes = await resPersonajes.json();

          const lista = dataPersonajes.amiibo.slice(0, limiteTotal);

            const listaConDetalles = lista.map((personaje) => {
                return {
                    // Unimos head y tail para crear un 'id' único obligatorio
                    id: `${personaje.head}-${personaje.tail}`, 
                    name: personaje.name,
                    image: personaje.image,
                    type: personaje.type, // "Figure", "Card", etc.
                    character: personaje.character,
                    gameSeries: personaje.gameSeries,
                    primeraAparicion: personaje.release?.na || personaje.release?.jp || "Desconocida",
                    precio: precioAleatorio(),
                };
            });
      
      
          if (activo) setPersonajesTodos(listaConDetalles);
          } catch (err) {
                      if (activo) setError(err.message);
        } finally {
                    if (activo) setCargando(false);
        }
      }


      cargarPersonajes(); //Se ejecuta la función definida
      return () => { activo = false; }; //Esta es una función de cleanup    de limpieza
    }, [limiteTotal]); // aquí estamos diciendo que useEffect se ejecutade        acuerdo al cambio de limiteTotal

    return { personajesTodos, cargando, error };
}