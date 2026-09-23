import { useCart } from "../../context/cartContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });
}


export default function Carrito() {
    const { 
        carrito, 
        eliminarDelCarrito, 
        aumentarCantidad, 
        disminuirCantidad, 
        vaciarCarrito 
    } = useCart();

const procederAlPago = () => {
    Swal.fire({
        title: "¿Confirmar compra?",
        text: `Vas a pagar ${formatearPrecio(totalPagar)}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, pagar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#dc2626",
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();

            Swal.fire({
                title: "¡Compra realizada!",
                text: "Tu pedido fue procesado correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#16a34a",
            });
        }
    });
};

    const totalPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const iva = totalPagar * 0.19;
    const subtotal = totalPagar - iva;

    if (carrito.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4">
                    Tu carrito está vacío
                </h2>
                <p className="text-yellow-500 mb-8">Parece que aún no has agregado ningún personaje.</p>
                <button className="px-6 py-3 bg-red-600 text-white dark:text-black rounded-lg hover:bg-red-700 transition-colors font-semibold">
                    <Link to="/catalogo">Volver a la tienda</Link> 
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-8 border-b pb-4">
                Resumen de tu Pedido
            </h1>

            <div className="bg-white dark:bg-emerald-800 rounded-2xl shadow-xl overflow-hidden ring-1 ring-slate-200 dark:ring-emerald-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-emerald-900 border-b border-slate-200 dark:border-emerald-700">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600 dark:text-emerald-300">Personaje</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-emerald-300">Serie</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-emerald-300 text-center">Cantidad</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-emerald-300 text-right">Precio Unitario</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-emerald-300 text-right">Precio</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-emerald-300 text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-emerald-700">
                            {carrito.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-emerald-800/50 transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-100 dark:bg-emerald-700 rounded-lg p-2 flex shrink-0 items-center justify-center">
                                            <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                                        </div>
                                        <span className="font-bold text-slate-800 dark:text-white">{item.name}</span>
                                    </td>
                                    
                                    <td className="p-4 text-slate-600 dark:text-slate-400">
                                        {item.serie}
                                    </td>
                                    
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                onClick={() => disminuirCantidad(item.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-red-200 dark:hover:bg-red-400 text-slate-800 dark:text-slate-100 font-bold transition-colors cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="font-semibold w-6 text-center text-slate-800 dark:text-slate-200">
                                                {item.cantidad}
                                            </span>
                                            <button 
                                                onClick={() => aumentarCantidad(item.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-green-200 dark:hover:bg-green-400 text-slate-800 dark:text-slate-100 font-bold transition-colors cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    
                                    <td className="p-4 text-right text-slate-600 dark:text-slate-400">
                                        {formatearPrecio(item.precio)}
                                    </td>
                                    
                                    <td className="p-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                                        {formatearPrecio(item.precio * item.cantidad)}
                                    </td>
                                    
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => eliminarDelCarrito(item.id)}
                                            className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg font-semibold transition-colors cursor-pointer"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-slate-50 dark:bg-emerald-900 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-slate-200 dark:border-slate-700">
                    <button 
                        onClick={vaciarCarrito}
                        className="text-red-600 dark:text-red-300 font-medium hover:underline flex items-center gap-2 cursor-pointer"
                    >
                        Vaciar todo el carrito
                    </button>

                    <div className="w-full md:w-80 space-y-3">
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Subtotal:</span>
                            <span className="font-medium">{formatearPrecio(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>IVA (19%):</span>
                            <span className="font-medium">{formatearPrecio(iva)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-slate-800 dark:text-slate-100 pt-3 border-t border-slate-200 dark:border-slate-700">
                            <span>Total a pagar:</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{formatearPrecio(totalPagar)}</span>
                        </div>

                        <button
                            onClick={procederAlPago}
                            className="w-full mt-6 py-3 px-4 bg-green-600 hover:bg-green-700 text-white                         rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer">                       
                            Proceder al Pago
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}