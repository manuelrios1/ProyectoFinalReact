import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext"; //Importamos el Context

const tipoColores = {
  Figure: "bg-green-500/15 text-green-500 ring-green-500/30",
  Band: "bg-yellow-500/15 text-yellow-500 ring-yellow-500/30",
  Yarn: "bg-red-500/15 text-red-500 ring-red-500/30",
  unknown: "bg-gray-500/15 text-gray-500 ring-gray-500/30",
};

const bordersTipo = {
  Figure: "border-green-700 dark:border-green-400",
  Band: "border-yellow-700 dark:border-yellow-400",
  Yarn: "border-red-700 dark:border-red-400",
  unknown: "border-gray-700 dark:border-gray-400", 
};

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",   //para mostrar el numero con moneda
    currency: "COP", // Peso colombiano
    maximumFractionDigits: 0,    // este es para decir que sin decimales
  });
}

export default function CharacterCard({ personaje }) {

  const { agregarAlCarrito } = useCart();


  const colorTipo = tipoColores[personaje.type] || tipoColores.unknown;

  const borderTipo = bordersTipo[personaje.type] || bordersTipo.unknown;

  return (
    <article className={`flex flex-col h-full group rounded-2xl hover:shadow-2xl ring-1 ring-slate-200 overflow-hidden hover:-translate-y-1 transition-all duration-300 border-2 ${borderTipo}`}>
      <div className="relative">
        <img src={personaje.image} alt={personaje.name} className="h-48 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 m-auto"/>
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ${colorTipo}`}>
          {personaje.type}
        </span>
      </div>


      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-red-800 dark:text-red-500 text-lg leading-tight">{personaje.name}</h3>
          <span className="text-xs text-red-400 shrink-0">#{personaje.id.slice(0, 6)}</span>
        </div>


        <ul className="my-auto mt-3 space-y-1 text-sm text-yellow-500">
          <li><span className="text-yellow-400">Personaje:</span> {personaje.character}</li>
          <li><span className="text-yellow-400">Serie:</span> {personaje.gameSeries}</li>
          <li><span className="text-yellow-400">Lanzamiento: </span>
                {personaje.primeraAparicion}</li>
        </ul>


        <div className="mt-4 flex items-center justify-between">
          <span className="text-emerald-600 font-bold text-lg">{formatearPrecio(personaje.precio)}</span>

          <button
            type="button"
            onClick={() => agregarAlCarrito(personaje)}
            className="p-2 rounded-full bg-green-900 text-emerald-400 hover:bg-emerald-500 hover:text-green-900 transition-colors cursor-pointer"
            title="Agregar al carrito"
          >
            <ShoppingCart size={18} /> {/* El tamaño que se le da al icono del carrito */}
          </button>
        </div>
      </div>
    </article>
  );
}
