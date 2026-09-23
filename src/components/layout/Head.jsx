import { Link } from 'react-router-dom';
import Login from '../Auth/Login';
import tortugaImg from '../../assets/Tortuga.png';
import { useTheme } from '../../context/ThemeContext';
import {
    Sun,
    Moon,
    ShoppingCart,
    User,
    LogOut
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Head() {

    const { tema, cambiarTema } = useTheme();
    const { totalItems } = useCart();

    const [usuario, setUsuario] = useState(
        localStorage.getItem('usuarioSesion')
    );

    const [mostrarPerfil, setMostrarPerfil] = useState(false);


    // Detectar cambios de sesión
    useEffect(() => {

        const actualizarSesion = () => {
            setUsuario(
                localStorage.getItem('usuarioSesion')
            );
        };

        window.addEventListener(
            'sesion-cambiada',
            actualizarSesion
        );

        return () => {
            window.removeEventListener(
                'sesion-cambiada',
                actualizarSesion
            );
        };

    }, []);


    // Cerrar sesión
    const cerrarSesion = () => {

        Swal.fire({
            title: '¿Cerrar sesión?',
            text: 'Se cerrará tu sesión actual.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#E52521',
            cancelButtonColor: '#43B047'
        }).then((result) => {

            if (result.isConfirmed) {

                localStorage.removeItem('usuarioSesion');

                setUsuario(null);
                setMostrarPerfil(false);

                window.dispatchEvent(
                    new Event('sesion-cambiada')
                );

                Swal.fire({
                    title: '¡Hasta luego!',
                    text: 'Has cerrado sesión correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#43B047'
                });
            }

        });

    };


    return (
        <header
            className="
                bg-[#032e15]
                border-4
                border-black
                rounded-[10px]
                flex
                items-center
                justify-between
                py-[5px]
                px-[15px]
                shadow-[0_6px_0_#000000]
                fixed
                z-[1000]
                w-full
            "
        >

            {/* LOGO */}

            <div className="flex items-center">

                <img
                    src={tortugaImg}
                    alt="Tortuga Koopa"
                    className="
                        w-[50px]
                        h-[50px]
                        object-contain
                        mr-[10px]
                        drop-shadow-[2px_2px_0_#000000]
                    "
                />

                <Link
                    to="/"
                    className="no-underline"
                >
                    <h1
                        className="
                            text-[28px]
                            text-[#FBD000]
                            [text-shadow:2px_2px_0px_#000000]
                            m-0
                            ml-[20px]
                            hover:text-[#FF0000]
                        "
                    >
                        TORTUGA KOOPA
                    </h1>
                </Link>

            </div>


            {/* NAV */}

            <Nav />


            {/* ACCIONES */}

            <div className="flex items-center">

                {/* CARRITO */}

                <Link
                    to="/carrito"
                    title="Ver carrito"
                    aria-label="Ver carrito"
                    className="
                        relative
                        flex
                        items-center
                        justify-center

                        text-white
                        bg-[#E52521]

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

                    <ShoppingCart size={22} />

                    {totalItems > 0 && (
                        <span
                            className="
                                absolute
                                -top-2
                                -right-2

                                bg-[#FBD000]
                                text-black

                                w-6
                                h-6

                                flex
                                items-center
                                justify-center

                                rounded-full

                                border-2
                                border-black

                                text-xs
                                font-bold
                            "
                        >
                            {totalItems}
                        </span>
                    )}

                </Link>


                {/* LOGIN */}

                {!usuario ? (

                    <Login
                        onLogin={(nombre) => {
                            setUsuario(nombre);
                        }}
                    />

                ) : (

                    /* PERFIL */

                    <div className="relative">

                        {/* BOTÓN USUARIO */}

                        <button
                            type="button"
                            onClick={() =>
                                setMostrarPerfil(!mostrarPerfil)
                            }
                            title="Mi perfil"
                            className="
                                text-white
                                bg-[#E52521]

                                border-[3px]
                                border-black
                                rounded-[8px]

                                cursor-pointer

                                w-[52px]
                                h-[48px]

                                flex
                                items-center
                                justify-center

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
                            <User
                                size={28}
                                strokeWidth={2.5}
                            />
                        </button>


                        {/* VENTANA PERFIL */}

                        {mostrarPerfil && (

                            <div
                                className="
                                    absolute
                                    right-0
                                    top-[60px]

                                    w-[260px]

                                    bg-white

                                    border-4
                                    border-black

                                    rounded-[10px]

                                    shadow-[0_6px_0_#000000]

                                    overflow-hidden

                                    z-[1100]
                                "
                            >

                                {/* PARTE SUPERIOR */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3

                                        bg-[#FBD000]

                                        p-4

                                        border-b-4
                                        border-black
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-center

                                            w-[50px]
                                            h-[50px]

                                            shrink-0

                                            bg-[#43B047]

                                            border-3
                                            border-black

                                            rounded-full
                                        "
                                    >
                                        <User
                                            size={27}
                                            color="white"
                                        />
                                    </div>

                                    <div className="flex flex-col">

                                        <span
                                            className="
                                                text-sm
                                                text-gray-600
                                            "
                                        >
                                            Usuario
                                        </span>

                                        <strong
                                            className="
                                                text-lg
                                                text-black
                                                font-bold
                                            "
                                        >
                                            {usuario}
                                        </strong>

                                    </div>

                                </div>


                                {/* CERRAR SESIÓN */}

                                <div className="p-4">

                                    <button
                                        type="button"
                                        onClick={cerrarSesion}
                                        className="
                                            w-full

                                            flex
                                            items-center
                                            justify-center
                                            gap-2

                                            text-white
                                            bg-[#E52521]

                                            border-[3px]
                                            border-black
                                            rounded-[8px]

                                            cursor-pointer

                                            py-[8px]
                                            px-[16px]

                                            font-[inherit]

                                            select-none

                                            shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.5),0_4px_0_#000000]

                                            transition-[transform,filter]
                                            duration-[50ms]
                                            ease-in-out

                                            hover:brightness-[1.15]

                                            active:translate-y-[3px]
                                        "
                                    >
                                        <LogOut size={19} />

                                        Cerrar sesión

                                    </button>

                                </div>

                            </div>

                        )}

                    </div>

                )}


                {/* TEMA */}

                <button
                    type="button"
                    onClick={cambiarTema}
                    title={
                        tema === 'claro'
                            ? 'Cambiar a modo oscuro'
                            : 'Cambiar a modo claro'
                    }
                    className="
                        text-white
                        bg-[#E52521]

                        border-[3px]
                        border-black
                        rounded-[8px]

                        cursor-pointer

                        w-[48px]
                        h-[48px]

                        flex
                        items-center
                        justify-center

                        font-[inherit]

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

                    {tema === 'claro'
                        ? <Moon size={23} />
                        : <Sun size={23} />
                    }

                </button>

            </div>

        </header>
    );
}

export default Head;