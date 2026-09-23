import Swal from 'sweetalert2';

function Login({ onLogin }) {

    const abrirLogin = async () => {

        const { value: formulario } = await Swal.fire({
            title: 'Iniciar sesión',

            html: `
                <input
                    id="swal-usuario"
                    type="text"
                    placeholder="Usuario"
                    class="swal2-input"
                >

                <input
                    id="swal-password"
                    type="password"
                    placeholder="Contraseña"
                    class="swal2-input"
                >
            `,

            focusConfirm: false,

            showCancelButton: true,

            confirmButtonText: 'Ingresar',
            cancelButtonText: 'Cancelar',

            confirmButtonColor: '#E52521',
            cancelButtonColor: '#43B047',

            preConfirm: () => {

                const usuario = document
                    .getElementById('swal-usuario')
                    .value
                    .trim();

                const password = document
                    .getElementById('swal-password')
                    .value;

                if (!usuario || !password) {

                    Swal.showValidationMessage(
                        'Debes completar todos los campos'
                    );

                    return false;
                }

                return {
                    usuario,
                    password
                };
            }
        });

        // Si el usuario presionó "Ingresar"
        if (formulario) {

            // Guardar usuario en el navegador
            localStorage.setItem(
                'usuarioSesion',
                formulario.usuario
            );

            // Avisar que cambió la sesión
            window.dispatchEvent(
                new Event('sesion-cambiada')
            );

            // Actualizar el Head
            if (onLogin) {
                onLogin(formulario.usuario);
            }

            // Mensaje de bienvenida
            Swal.fire({
                title: '¡Bienvenido!',
                text: `Hola ${formulario.usuario}`,
                icon: 'success',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#43B047'
            });
        }
    };

    return (
        <button
            type="button"
            onClick={abrirLogin}
            className="
                text-white
                bg-[#E52521]
                text-[16px]
                font-[inherit]
                border-[3px]
                border-black
                rounded-[8px]
                cursor-pointer
                py-[8px]
                px-[16px]
                select-none
                ml-[25px]
                shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.5),0_4px_0_#000000]
                transition-[transform,filter]
                duration-[50ms]
                ease-in-out
                hover:brightness-[1.15]
                active:translate-y-[3px]
            "
        >
            Login
        </button>
    );
}

export default Login;