import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();
const CLAVE_CARRITO = "carrito";


// Lee lo que haya guardado en localStorage al iniciar la app
function leerCarritoDesdeStorage() {
    try {
        const data = localStorage.getItem(CLAVE_CARRITO);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState(leerCarritoDesdeStorage);

    // Cada vez que "carrito" cambia, lo guardamos en localStorage
    useEffect(() => {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = useCallback((personaje) => {
        setCarrito((prev) => {
            const yaExiste = prev.find((item) => item.id === personaje.id);

            if (yaExiste) {
                return prev.map((item) =>
                    item.id === personaje.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: personaje.id,
                    name: personaje.name,
                    image: personaje.image,
                    precio: personaje.precio,
                    serie: personaje.gameSeries,
                    cantidad: 1,
                },
            ];
        });
    }, []);


    // Eliminar el carrito
    const eliminarDelCarrito = useCallback((id) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id));
    }, []);

    // Aumentar cantidad
    const aumentarCantidad = useCallback((id) => {
        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
            )
        );
    }, []);


    // Disminuirla
    const disminuirCantidad = useCallback((id) => {
        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            ).filter((item) => item.cantidad > 0)
        );
    }, []);

    // Dejarlo vacio
    const vaciarCarrito = useCallback(() => {
        setCarrito([]);
    }, []);

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <CartContext.Provider value={{ 
            carrito, 
            agregarAlCarrito, 
            totalItems,
            aumentarCantidad,
            disminuirCantidad,
            eliminarDelCarrito,
            vaciarCarrito
            }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}