    import FormInput from "./componentes/FormInput";
    import FormSelect from "./componentes/FormSelect";
    import FormTextArea from "./componentes/FormTextArea";
    import FormFile from "./componentes/FormFile";
    import {useForm, Controller} from "react-hook-form"
    import Swal from 'sweetalert2'
    import { useState } from "react";


    function ContactoForm() {

    const [enviando, setEnviando] = useState(false);

    const {
        register, control, handleSubmit, reset,
        formState: {errors}
    } = useForm ({
        mode: "onBlur",
            defaultValues: {
                primerNombre: "", segundoNombre: "",
                primerApellido: "", segundoApellido: "",
                genero: "", pais: "", ciudad: "",
                correo: "", telefono: "", mensaje: "",
                archivo: []
            }
    })

    const onSubmit = (data) => {
      Swal.fire({
        title: "¿Deseas enviar el mensaje?",
        text: "Verifica que la información sea correcta.",
        icon: "question",
        iconColor: "#ffb703",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Enviar",
        confirmButtonColor: "#22c55e",
        denyButtonText: "No enviar",
        denyButtonColor: "#ef4444",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#ffb703",
      }).then(async (result) => { // 👈 1. Agregamos async aquí
        if (result.isConfirmed) {
          setEnviando(true); // Activa el estado "Enviando..." en el botón
        
          // 2. Armamos el objeto FormData con los datos
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if (key === "archivo" && Array.isArray(value)) {
              value.forEach((file) => formData.append("archivo", file));
            } else {
              formData.append(key, value);
            }
          });
      
          try {
            // 3. Enviamos los datos a la API de Formspree
            const response = await fetch("https://formspree.io/f/mbgjnkra",   { // 👈 Pon tu ID de Formspree
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json",
              },
            });
        
            if (response.ok) {
              // 4. Si el envío fue exitoso
              Swal.fire({
                title: "¡Enviado!",
                text: "Tu mensaje fue enviado correctamente.",
                icon: "success",
                confirmButtonColor: "#22c55e",
              });
              reset(); // Limpia los campos del formulario
            } else {
              throw new Error("Error en el servidor al enviar");
            }
          } catch (error) {
            // 5. Si ocurre un error de red o de Formspree
            Swal.fire({
              title: "Error",
              text: "Ocurrió un problema al enviar el mensaje. Inténtalo de     nuevo.",
              icon: "error",
              confirmButtonColor: "#ef4444",
            });
          } finally {
            setEnviando(false); // Desactiva el estado de carga y reactiva el   botón
          }
      
        } else if (result.isDenied) {
          Swal.fire({
            title: "Envío cancelado",
            text: "Los cambios no fueron guardados.",
            icon: "info",
            iconColor: "#ef4444",
            confirmButtonText: "Bueno",
            confirmButtonColor: "#ef4444",
          });
        }
      });
    };

    return (
        <form className="p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-5xl mx-auto" 
        onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* Datos personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
                label="Primer Nombre"
                placeholder="Escribe tu primer nombre"
                required
                error={errors.primerNombre?.message}
                {...register("primerNombre", { required: "El primer nombre es obligatorio" })}
            />
            <FormInput
                label="Segundo Nombre"
                //name="segundoNombre"
                placeholder="Escribe tu segundo nombre"
                error={errors.segundoNombre?.message}
                {...register("segundoNombre")} //El segundnombre no es obligatorio
            />
            <FormInput
                label="Primer Apellido"
                required
                placeholder="Escribe tu primer Apellido"
                error={errors.primerApellido?.message}
                {...register("primerApellido", { required: "Eprimer Apellido es obligatorio" })}
            />
            <FormInput
                label="Segundo Apellido"
                //name="segundoApellido"
                placeholder="Escribe tu segundo Apellido"
                error={errors.segundoApellido?.message}
                {...register("segundoApellido")} //El segundapellido no es obligatorio
            />

            <FormInput
                label="Correo"
                //name="correo"
                type="email"
                placeholder="ejemplo@correo.com"
                required
                error={errors.correo?.message}
                {...register("correo", {
                                required: "El correo eobligatorio",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Ingresa un correválido",
                                },
                })} 
            />

            <FormInput
                label="Teléfono"
                //name="telefono"
                type="tel"
                placeholder="300 000 0000"
                required
                error={errors.telefono?.message}
                {...register("telefono", {
                                required: "El teléfono eobligatorio",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Ingresa un teléfonválido (10 dígitos)",
                                },
                })}
            />

            <FormSelect
                label="Género"
                //name="genero"
                options={[
                    "Femenino",
                    "Masculino",
                    "Otro"
                ]}
                required
                error={errors.genero?.message}
                {...register("genero", {
                    required: "El género es obligatorio",
                })}
            />
            <FormSelect
                label="País"
                //name="pais"
                options={[
                    "Colombia",
                    "Estados Unidos",
                    "Otro"
                ]}
                required
                error={errors.pais?.message}
                {...register("pais", {
                    required: "El país es obligatorio",
                })}
            />
            <FormSelect
                label="Ciudad"
                //name="ciudad"
                options={[
                    "Medellin",
                    "New York",
                    "Bogota",
                    "Otro"
                ]}
                required
                error={errors.ciudad?.message}
                {...register("ciudad", {
                    required: "La ciudad es obligatoria",
                })}
            />

        </div>

        {/* Mensaje */}
        <div className="mt-6">
            <FormTextArea
                label="Mensaje"
                //name="mensaje"
                placeholder="Mensaje"
                required
                error={errors.mensaje?.message}
                {...register("mensaje", {
                    required: "El mensaje es obligatorio",
                })}
            ></FormTextArea>

        </div>

        {/* Archivo */}
        <div className="mt-6">
            <Controller
                name="archivo"
                control={control} // 👈 viene de useForm(), es e"cerebro" que conecta todo
                render={({ field }) => ( // 👈 aquí renderizas Tcomponente, y "field" trae lo necesario parconectarlo
                    <FormFile
                        label="Adjuntar archivo..."
                        name="archivo"
                        accept={{
                            "application/pdf": [".pdf"],
                            "image/png": [".png"],
                            "image/jpeg": [".jpg", ".jpeg"],
                            "video/*": [],
                        }}
                        maxSizeMB={5}
                        MaxFiles = {3}
                        value={field.value}
                        onFilesChange={field.onChange}
                        error={errors.archivo?.message}
                    />
                )}
            />
        </div>

        {/* Botón */}
        <div className="mt-8 flex justify-center">
            <button
                type="submit"
                disabled={enviando}
                className={`text-white font-semibold px-8 py-3 rounded-lg transition cursor-pointer ${
                enviando ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 dark:text-green-500 dark:bg-olive-950 dark:hover:text-olive-950"
                }`}
            >
                {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
        </div>
        </form>
    )
    }

    export default ContactoForm;