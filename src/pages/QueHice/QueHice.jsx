import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Swal from "sweetalert2";
import VideoPagina from "../../assets/Pagina.mp4"


export default function QueHice() {

    const [calificacion, setCalificacion] = useState(0);
    const [enviado, setEnviado] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const enviarCalificacion = () => {

        if (calificacion === 0) {
            Swal.fire({
                icon: "warning",
                title: "Selecciona una calificación",
                text: "Debes elegir entre 1 y 5 estrellas.",
                confirmButtonColor: "#e52521",
            });

            return;
        }

        setEnviado(true);

        Swal.fire({
            icon: "success",
            title: "¡Muchas gracias!",
            text: "Gracias por calificar mi aplicación.",
            confirmButtonColor: "#e52521",
        });
    };

    return (
        <div className="min-h-scree px-4 py-8">

            <div className="mx-auto max-w-4xl">

                {/* TITULO */}
                <h1 className="mb-8 text-center text-4xl font-bold text-yellow-700 dark:text-yellow-400">
                    Lo que aprendí
                </h1>

                {/* APRENDIZAJE */}
                <div className="mb-8 rounded-xl bg-green-100 dark:bg-green-700 p-6 shadow-lg">

                    <h2 className="mb-4 text-2xl font-bold text-red-800 dark:text-red-600">
                        ¿Qué aprendí?
                    </h2>

                    <div className="space-y-3 text-gray-800 dark:text-white">

                        <p>
                            Durante este proyecto aprendí a utilizar React
                            para crear una aplicación web mediante componentes.
                        </p>

                        <p>
                            Aprendí a utilizar React Router para navegar entre
                            las diferentes páginas de la aplicación.
                        </p>

                        <p>
                            También utilicé useState para manejar los estados
                            y useEffect para ejecutar acciones cuando cambia
                            o se carga un componente.
                        </p>

                        <p>
                            Aprendí a trabajar con componentes reutilizables
                            y a organizar mejor el código de mi proyecto.
                        </p>

                        <p>
                            También aprendí a utilizar Tailwinds para integrar los estilos de la pagina.
                        </p>

                        <p>
                            Utilicé diferentes librerías como SweetAlert2
                            e iconos para mejorar la interacción con el usuario.
                        </p>

                    </div>
                </div>

                {/* VIDEO */}
                <div className="mb-8 rounded-xl bg-yellow-200 dark:bg-yellow-500 p-6 shadow-lg">

                    <h2 className="mb-4 text-2xl font-bold text-red-700 dark:text-red-600">
                        Video
                    </h2>

                    <video
                        controls
                        className="w-full rounded-lg"
                    >
                        <source
                            src={VideoPagina}
                            type="video/mp4"
                        />

                        Tu navegador no soporta este video.
                    </video>

                </div>

                {/* CALIFICACIÓN */}
                <div className="rounded-xl bg-emerald-200 dark:bg-emerald-700 p-6 text-center shadow-lg">

                    <h2 className="text-2xl font-bold text-red-700 dark:text-red-500">
                        Califica mi aplicación
                    </h2>

                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        1 estrella es la mínima y 5 estrellas es la máxima.
                    </p>

                    {/* ESTRELLAS */}
                    <div className="mt-6 flex justify-center gap-2">

                        {[1, 2, 3, 4, 5].map((estrella) => (

                            <button
                                key={estrella}
                                onClick={() => setCalificacion(estrella)}
                                className="transition hover:scale-110 cursor-pointer"
                            >
                                <Star
                                    size={45}
                                    fill={
                                        estrella <= calificacion
                                            ? "#FFD700"
                                            : "none"
                                    }
                                    className={
                                        estrella <= calificacion
                                            ? "text-yellow-400"
                                            : "text-gray-400"
                                    }
                                />
                            </button>

                        ))}

                    </div>

                    {/* TEXTO DE CALIFICACIÓN */}
                    {calificacion > 0 && (
                        <p className="mt-4 font-bold text-gray-700">
                            Has seleccionado {calificacion}{" "}
                            {calificacion === 1
                                ? "estrella"
                                : "estrellas"}
                        </p>
                    )}

                    {/* BOTÓN */}
                    <button
                        onClick={enviarCalificacion}
                        className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-bold text-white dark:text-black cursor-pointer hover:scale-110"
                    >
                        Enviar calificación
                    </button>

                    {/* AGRADECIMIENTO */}
                    {enviado && (
                        <div className="mt-6 rounded-lg bg-green-100 p-4">

                            <p className="font-bold text-green-700">
                                ⭐ ¡Muchas gracias por calificar mi aplicación!
                            </p>

                            <p className="mt-1 text-green-600">
                                Tu opinión es muy importante para mí.
                            </p>

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}
