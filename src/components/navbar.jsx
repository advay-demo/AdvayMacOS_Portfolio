import dayjs from "dayjs";
import { navLinks, navIcons } from "@constants/index.js";
import useWindowStore from "@store/window.js"; // ✅ add this

const Navbar = () => {
    const { openWindow, closeWindow, windows } = useWindowStore();

    return (
        <nav>
            <div>
                <img src="../../public/images/logo.svg" alt="logo" />
                <p className="font-bold">Advay's Portfolio</p>

                <ul>
                    {navLinks.map(({ id, name }) => (
                        <li key={id}>
                            <button
                                onClick={() => openWindow(id)}
                                className="hover:opacity-80 transition"
                            >
                                {name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img src={img} className="icon-hover" alt={`icon-${id}`} />
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format("ddd MMM D h:mm A")}</time>
            </div>
        </nav>
    );
};

export default Navbar;