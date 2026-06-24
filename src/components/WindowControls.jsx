import React from 'react'
import useWindowStore from "@store/window.js";

const WindowControls = ({target}) => {
    const {closeWindow, toggleMaximize, toggleMinimize} = useWindowStore();
    return (
        <div id={"window-controls"}>
           <div className="close" onClick={() =>closeWindow(target)}/>
            <div className="minimize" onClick={() =>toggleMinimize(target)}/>
            <div className="maximize" onClick={() =>toggleMaximize(target)}/>
        </div>
    )
}
export default WindowControls;
