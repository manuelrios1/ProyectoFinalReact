import { tubo } from "../../../assets/tubo.jpg"
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function FormFile({ label, name, required = false, error = "", accept= {"application/pdf": [".pdf"]},
    maxSizeMB = 2, MaxFiles = 1, value = [], onFilesChange = () => {},}) {

    // Estado para guardar el mensaje de error de validación (tipo/tamaño)
    const [errorMsg, setErrorMsg] = useState("");

    const [archivos, setArchivos] = useState([]);

    // 1. Cada vez que la lista cambia, avisamos hacia afuera
    useEffect(() => {
        onFilesChange(archivos.map((a) => a.file));
    }, [archivos]);
    
    // 
    const prevValueLength = useRef(0)

    // 2. Limpiar estado si la propiedad `value` de React Hook Form se vacía (después del reset del formulario)
    useEffect(() => {
        if (value && value.length === 0 && prevValueLength.current > 0) {
            archivos.forEach((a) => a.preview && URL.revokeObjectURL(a.preview));
            setArchivos([]);
            setErrorMsg("");
        }
        prevValueLength.current = value?.length || 0;
    }, [value]);


    // id combinando nombre + fecha de modificación + tamaño
    const generarId = (file) => `${file.name}-${file.lastModified}-${file.size}`;

    const espacioDisponible = MaxFiles - archivos.length;
    const limiteAlcanzado = espacioDisponible <= 0;

    const [mensajeEliminado, setMensajeEliminado] = useState("");

    useEffect(() => {
        if (!mensajeEliminado) return;
        const timer = setTimeout(() => setMensajeEliminado(""), 3000);
        return () => clearTimeout(timer)
    }, [mensajeEliminado]);

    const eliminarArchivo = (id) => {
        const archivoAEliminar = archivos.find((item) => item.id === id);

        if (archivoAEliminar?.preview) {
            URL.revokeObjectURL(archivoAEliminar.preview);
        }

        setArchivos((anteriores) => anteriores.filter((item) => item.id !== id));
        setMensajeEliminado("Archivo eliminado correctamente");
        setErrorMsg("");
    };

    // Se ejecuta cuando el usuario selecciona o arrastra un archivo
    const onDrop = (acceptedFiles, rejectedFiles) => {
        setErrorMsg("");

        if (espacioDisponible <= 0) {
            setErrorMsg(`Ya alcanzaste el maximo de ${MaxFiles} archivos`);
            return;
        }

        if (acceptedFiles.length > 0) {

            const aceptadosValidos = acceptedFiles.slice(0, espacioDisponible);

            const nuevosArchivos = aceptadosValidos.map((file) => ({
                id: generarId(file),
                file: file,
                preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
            }))

            setArchivos((anteriores) => [...anteriores, ...nuevosArchivos]);

            console.log(acceptedFiles);
        }

        // Definimos el manejo de nuestros errores
        if (rejectedFiles.length > 0) {
            const primerError = rejectedFiles[0].errors[0];

            if (primerError.code === "file-too-large") {
                setErrorMsg(`El archivo supera el tamaño máximo de ${maxSizeMB}MB`);
            } else if (primerError.code === "file-invalid-type") {
                setErrorMsg("Tipo de archivo no permitido");
            } else {
                setErrorMsg(primerError.message);
            }
        }
        
        console.log({ acceptedFiles, rejectedFiles });
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop,
        multiple: true,
        maxSize: maxSizeMB * 1024 * 1024, // dropzone trabaja en bytes
        maxFiles: MaxFiles,
        disabled: limiteAlcanzado,
        accept
    });

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="font-semibold text-green-700 dark:text-green-500"
            >
                {label} {required && "*"}
            </label>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed border-green-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-400 transition ${errorMsg ? "border-red-400" : "border-slate-300 hover:border-green-400"}`}
            >
                <input  {...getInputProps({
                    id: name,
                    name: name,
                    required: required
                })}
                />
                <div className="text-4xl mb-3">
                    <img className="h-30 m-auto" src={tubo} alt="tubo de mario" />
                </div>
                {

                    limiteAlcanzado ? (
                        <p className="mt-3 text-red-500 font-bold">
                            Límite máximo de {MaxFiles} archivos alcanzado.
                        </p>
                    ) :

                        isDragActive ? (
                            <p className="font-medium text-green-600">
                                Suelta el archivo aquí...
                            </p>
                        ) : (
                            <>
                                <p className="font-medium text-green-700 dark:text-green-500">
                                    Arrastra tu archivo aquí
                                </p>
                                <p className="mt-3 text-red-500 font-bold">
                                    Archivos subidos: {archivos.length} / {MaxFiles}
                                </p>

                                <p className="text-sm text-gray-700 dark:text-gray-500 mt-1">
                                    o haz clic para seleccionarlo
                                </p>
                            </>
                        )
                }
            </div>
            {/* Información del archivo */}
            {
                archivos.length > 0 && (
                    <div className="mt-3 flex flex-col gap-3">
                        {archivos.map(({ id, file, preview }) => (
                            <div key={id} className="rounded-lg border-2 border-yellow-700 bg-slate-100 p-4 flex items-center justify-between gap-4">

                                <div className="text-left text-sm flex-1">
                                    <p className="font-semibold text-yellow-600">
                                        Archivo seleccionado
                                    </p>
                                    <p><strong className="text-yellow-700">Nombre:</strong> {file.name}</p>
                                    <p><strong className="text-yellow-700">Tipo:</strong> {file.type}</p>
                                    <p><strong className="text-yellow-700">Tamaño:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                                </div>

                                {/* Vista previa si es imagen */}
                                {preview && (
                                    <img
                                        src={preview}
                                        alt={`Vista previa de ${file.name}`}
                                        className="w-20 h-20 object-cover rounded-md border border-yellow-300"
                                    />
                                )}

                                {/* Botón de eliminar */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita que se abra la ventana de archivos
                                        eliminarArchivo(id);
                                    }}
                                    className="p-2 text-2xl cursor-pointer"
                                    title="Eliminar archivo"
                                >
                                    ❌ 
                                </button>

                            </div>
                        ))}
                    </div>
                )
            }

            {/* Mensaje cuando se elimina un archivo */}
            {mensajeEliminado && (
                <div className="p-2 bg-amber-100 text-amber-800 rounded-lg text-sm text-center font-medium mt-2">
                    {mensajeEliminado}
                </div>
            )}
            {/* Errores: primero el de validación del dropzone, luego el externo (formulario) */}
            {(errorMsg || error) && (
                <span className="text-sm text-red-500">
                    {errorMsg || error}
                </span>
            )}
        </div>
    );
}

export default FormFile;