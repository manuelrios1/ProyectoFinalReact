import React, { useState, useEffect } from "react";
import Tortuga from "../../components/Escenario/Tortuga";
import BotonDerecho from "../../components/Escenario/BotonDerecho";
import BotonIzquierdo from "../../components/Escenario/BotonIzquierdo";
import BotonReinicio from "../../components/Escenario/BotonReincio";
import fondoImg from "../../assets/Fondo.jpg";

function Escenario() {

    const POS_MINIMA = 0;
    const POS_MAXIMA = 90;
    const PASO = 2;

    const [posicion, setPosicion] = useState(45);
    const [mirandoIzquierda, setMirandoIzquierda] = useState(false);


    // =========================
    // MOVER DERECHA
    // =========================

    function moverDerecha() {
        setPosicion((prev) =>
            Math.min(prev + PASO, POS_MAXIMA)
        );

        setMirandoIzquierda(false);
    }


    // =========================
    // MOVER IZQUIERDA
    // =========================

    function moverIzquierda() {
        setPosicion((prev) =>
            Math.max(prev - PASO, POS_MINIMA)
        );

        setMirandoIzquierda(true);
    }


    // =========================
    // REINICIAR
    // =========================

    function reiniciar() {
        setPosicion(45);
        setMirandoIzquierda(false);
    }


    // =========================
    // TECLADO
    // =========================

    useEffect(() => {

        function manejarTeclado(e) {

            if (e.key === "a" || e.key === "A") {
                moverIzquierda();

            } else if (e.key === "d" || e.key === "D") {
                moverDerecha();

            } else if (e.key === "Enter") {
                reiniciar();
            }
        }

        window.addEventListener(
            "keydown",
            manejarTeclado
        );

        return () => {
            window.removeEventListener(
                "keydown",
                manejarTeclado
            );
        };

    }, []);


    return (

        <div
            className="
                flex
                flex-col
                items-center
                w-full
                p-[20px]

                [&_.escenario-pantalla]:relative
                [&_.escenario-pantalla]:w-[90%]
                [&_.escenario-pantalla]:max-w-[600px]
                [&_.escenario-pantalla]:aspect-[16/10]
                [&_.escenario-pantalla]:bg-cover
                [&_.escenario-pantalla]:bg-center
                [&_.escenario-pantalla]:border-[6px]
                [&_.escenario-pantalla]:border-black
                [&_.escenario-pantalla]:rounded-[10px]
                [&_.escenario-pantalla]:shadow-[0_0_0_4px_#43B047,0_12px_24px_rgba(0,0,0,0.7)]

                [&_.escenario-controles]:flex
                [&_.escenario-controles]:gap-[16px]
                [&_.escenario-controles]:mt-[20px]
                [&_.escenario-controles]:py-[16px]
                [&_.escenario-controles]:px-[24px]
                [&_.escenario-controles]:bg-[#032e15]
                [&_.escenario-controles]:border-[4px]
                [&_.escenario-controles]:border-black
                [&_.escenario-controles]:rounded-[12px]
                [&_.escenario-controles]:shadow-[inset_0_4px_0_rgba(255,255,255,0.2),0_6px_0_#000000]
                [&_.escenario-controles]:transition-transform
                [&_.escenario-controles]:duration-[100ms]
                [&_.escenario-controles:hover]:scale-[1.02]
                [&_.escenario-controles:hover]:shadow-[inset_0_4px_0_rgba(255,255,255,0.2),0_8px_16px_rgba(0,0,0,0.7)]

                [&_.escenario-controles_button]:font-['Press_Start_2P']
                [&_.escenario-controles_button]:text-[14px]
                [&_.escenario-controles_button]:py-[12px]
                [&_.escenario-controles_button]:px-[20px]
                [&_.escenario-controles_button]:text-[#a63c06]
                [&_.escenario-controles_button]:bg-[#FBD000]
                [&_.escenario-controles_button]:border-[3px]
                [&_.escenario-controles_button]:border-black
                [&_.escenario-controles_button]:rounded-[8px]
                [&_.escenario-controles_button]:cursor-pointer
                [&_.escenario-controles_button]:select-none
                [&_.escenario-controles_button]:shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.4),inset_3px_3px_0_rgba(255,255,255,0.6),0_4px_0_#000000]
                [&_.escenario-controles_button]:transition-[transform,box-shadow]
                [&_.escenario-controles_button]:duration-[60ms]
                [&_.escenario-controles_button:hover]:bg-[#ffe048]
                [&_.escenario-controles_button:active]:translate-y-[4px]
                [&_.escenario-controles_button:active]:shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.6),0_0_0_#000000]

                [&_.avatar-tortuga]:absolute
                [&_.avatar-tortuga]:bottom-[40%]
                [&_.avatar-tortuga]:transition-[left]
                [&_.avatar-tortuga]:duration-[100ms]
                [&_.avatar-tortuga]:ease-linear
                [&_.avatar-tortuga]:z-[10]

                [&_.imagen-tortuga]:w-[10%]
                [&_.imagen-tortuga]:min-w-[60px]
                [&_.imagen-tortuga]:h-auto
                [&_.imagen-tortuga]:block

                [&_.imagen-tortuga.volteada]:scale-x-[-1]
                [&_.imagen-tortuga.volteada]:transition-transform
                [&_.imagen-tortuga.volteada]:duration-[60ms]
                [&_.imagen-tortuga.volteada]:ease-linear
            "
        >

            {/* =========================
                PANTALLA
            ========================= */}

            <div
                className="escenario-pantalla"
                style={{
                    backgroundImage: `url(${fondoImg})`
                }}
            >

                <Tortuga
                    posicion={posicion}
                    mirandoIzquierda={mirandoIzquierda}
                />

            </div>


            {/* =========================
                CONTROLES
            ========================= */}

            <div className="escenario-controles">

                <BotonIzquierdo
                    mover={moverIzquierda}
                />

                <BotonReinicio
                    mover={reiniciar}
                />

                <BotonDerecho
                    mover={moverDerecha}
                />

            </div>

        </div>
    );
}

export default Escenario;