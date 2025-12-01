import Navbar from "./components/navbar.jsx";
import Welcome from "./components/welcome.jsx";
import Dock from "./components/dock.jsx";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";
gsap.registerPlugin(Draggable);
import {Terminal} from "@windows";

const App=() =>{
    return (
        <main>
            <Navbar/>
            <Welcome/>
            <Dock/>

            <Terminal/>
        </main>
    );
};
export default App;