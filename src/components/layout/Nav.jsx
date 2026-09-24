import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div
            className="
                border-none
                my-[15px]
                mx-auto
                w-fit
            "
        >
            <ul
                className="
                    list-none
                    flex
                    p-0
                    m-0

                    bg-[#FBD000]

                    border-[4px]
                    border-black

                    rounded-[12px]

                    shadow-[0_5px_0_#000000]

                    overflow-hidden
                "
            >

                {/* JUGAR */}

                <li
                    className="
                        border-r-[3px]
                        border-black

                        transition-colors
                        duration-[100ms]
                        ease-in-out

                        last:border-r-0

                        hover:bg-[#032e15]

                        group
                    "
                >
                    <Link
                        to="/Escenario"
                        className="
                            block

                            py-[10px]
                            px-[20px]

                            text-black

                            no-underline

                            font-[inherit]
                            text-[16px]
                            font-bold

                            [text-shadow:1px_1px_0px_rgba(255,255,255,0.6)]

                            group-hover:text-white

                            group-hover:[text-shadow:1.5px_1.5px_0px_#000000]
                        "
                    >
                        Jugar
                    </Link>
                </li>


                {/* CATALOGO */}

                <li
                    className="
                        border-r-[3px]
                        border-black

                        transition-colors
                        duration-[100ms]
                        ease-in-out

                        last:border-r-0

                        hover:bg-[#032e15]

                        group
                    "
                >
                    <Link
                        to="/Catalogo"
                        className="
                            block

                            py-[10px]
                            px-[20px]

                            text-black

                            no-underline

                            font-[inherit]
                            text-[16px]
                            font-bold

                            [text-shadow:1px_1px_0px_rgba(255,255,255,0.6)]

                            group-hover:text-white

                            group-hover:[text-shadow:1.5px_1.5px_0px_#000000]
                        "
                    >
                        Catalogo
                    </Link>
                </li>


                {/* CONTACTAME */}

                <li
                    className="
                        border-r-[3px]
                        border-black

                        transition-colors
                        duration-[100ms]
                        ease-in-out

                        last:border-r-0

                        hover:bg-[#032e15]

                        group
                    "
                >
                    <Link
                        to="/Contacto"
                        className="
                            block

                            py-[10px]
                            px-[20px]

                            text-black

                            no-underline

                            font-[inherit]
                            text-[16px]
                            font-bold

                            [text-shadow:1px_1px_0px_rgba(255,255,255,0.6)]

                            group-hover:text-white

                            group-hover:[text-shadow:1.5px_1.5px_0px_#000000]
                        "
                    >
                        Contactame
                    </Link>
                </li>

                {/* CONTACTAME */}

                <li
                    className="
                        border-r-[3px]
                        border-black

                        transition-colors
                        duration-[100ms]
                        ease-in-out

                        last:border-r-0

                        hover:bg-[#032e15]

                        group
                    "
                >
                    <Link
                        to="/quehice"
                        className="
                            block

                            py-[10px]
                            px-[20px]

                            text-black

                            no-underline

                            font-[inherit]
                            text-[16px]
                            font-bold

                            [text-shadow:1px_1px_0px_rgba(255,255,255,0.6)]

                            group-hover:text-white

                            group-hover:[text-shadow:1.5px_1.5px_0px_#000000]
                        "
                    >
                        Que Hice
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Nav;