import { useCharacters } from "../../hooks/useCharacters";
import CharacterCard from "../../components/Catalogo/CharacterCard";
import { useState, useCallback } from "react";


function Productos() {
  const { personajesTodos, cargando, error } = useCharacters(60);

//   Estado para controlar en que pagina estamos
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 12;

    const totalPaginas = Math.ceil(personajesTodos.length / elementosPorPagina);

    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;

    const personajesPagina = personajesTodos.slice(indiceInicio, indiceFin);

    const irSiguiente = useCallback(() => {
        setPaginaActual((prevPagina) => {
        // Verificamos antes de incrementar para no salirnos del límite
            if (prevPagina < totalPaginas) return prevPagina + 1;
            return prevPagina;
        });
    }, [totalPaginas]);

    const irAnterior = useCallback(() => {
        setPaginaActual((prevPagina) => {
        // Verificamos que no podamos ir a la página 0 o números negativos
        if (prevPagina > 1) return prevPagina - 1;
        return prevPagina;
        });
    }, []);

  return (
    <section className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-red-900 dark:text-red-500">Catálogo</h2>
        <p className="text-red-500 mt-2">
          Colección de personajes y figuras disponibles en la tienda
        </p>


        {cargando && <p className="mt-10 text-center text-yellow-400">Cargando personajes...</p>}
        {error && <p className="mt-10 text-center text-rose-500">{error}</p>}


        {!cargando && !error && personajesTodos.length > 0 && (
          <>
            {/* Grid de productos dinámico */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Cambiamos 'personajes' por 'personajesPagina' */}
              {personajesPagina.map((personaje) => (
                <CharacterCard key={personaje.id} personaje={personaje} />
              ))}
            </div>

            {/* Zona de controles de Paginación */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-14 mb-8">
              <button
                onClick={irAnterior}
                disabled={paginaActual === 1}
                className={`px-6 py-2.5 rounded-lg font-bold transition-all duration-300 transform
                  ${paginaActual === 1 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600" 
                    : "bg-green-600 text-white dark:text-black hover:bg-green-700 active:scale-95"}`}
              >
                Anterior
              </button>

              <span className="font-semibold text-lg text-gray-700 dark:text-gray-300 min-w-[120px] text-center">
                Página {paginaActual} de {totalPaginas}
              </span>

              <button
                onClick={irSiguiente}
                disabled={paginaActual === totalPaginas}
                className={`px-6 py-2.5 rounded-lg font-bold transition-all duration-300 transform
                  ${paginaActual === totalPaginas 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600" 
                    : "bg-yellow-600 text-white dark:text-black hover:bg-yellow-700 active:scale-95"}`}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
      
    </section>
  );
}


export default Productos;
