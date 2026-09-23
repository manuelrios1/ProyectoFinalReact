import ContactoForm from "./ContactoForm";
function Contacto() {
  return (
    <section className="min-h-screen py-12 px-4">
      <div className="max-w-auto mx-auto">
            {/* Encabezado */}
            <div className="text-center mb-10" >
                <h1 className="text-4xl font-bold text-green-800 dark:text-green-500 mb-4">
                  Contáctame
                </h1>
                <p className="text-lg text-green-600 dark:text-green-800 mx-w-auto">
                  ¿Tienes alguna pregunta, sugerencia o deseas comunicarte conmigo?
                  Completa el siguiente formulario y recibiré tu mensaje directamente
                  en mi correo electrónico.
                </p>
            </div>

            {/* Formulario */}
            <ContactoForm />
      </div>
    </section>
  );
}
export default Contacto;
