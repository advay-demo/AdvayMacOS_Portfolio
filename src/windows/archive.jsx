import React, { useState, useEffect } from "react";
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import WindowControls from "@components/WindowControls.jsx";
import useWindowStore from "@store/window.js";
import { AlertTriangle, RefreshCw } from "lucide-react";

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i) => {
        if (calculateWinner(board) || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = xIsNext ? "X" : "O";
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every((square) => square !== null);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-inner h-full w-full">
            <h3 className="text-lg font-bold mb-4 font-mono text-gray-800">
                {winner ? `Winner: ${winner}` : isDraw ? "Draw!" : `Next Player: ${xIsNext ? "X" : "O"}`}
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {board.map((square, i) => (
                    <button
                        key={i}
                        className="w-16 h-16 bg-white border-2 border-gray-300 rounded-md text-3xl font-bold flex items-center justify-center hover:bg-gray-50 focus:outline-none transition-colors"
                        onClick={() => handleClick(i)}
                    >
                        <span className={square === 'X' ? 'text-blue-500' : 'text-red-500'}>{square}</span>
                    </button>
                ))}
            </div>
            <button 
                onClick={resetGame}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium text-sm"
            >
                <RefreshCw size={16} /> Restart
            </button>
        </div>
    );
};

const RetroTerminal = () => {
    const [text, setText] = useState("");
    const fullText = "> Hello World!\n> I am Advay.\n> Initializing portfolio...\n> SUCCESS\n> EOF";
    
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-black text-green-500 font-mono p-4 rounded-lg h-full w-full shadow-inner flex flex-col items-start justify-start whitespace-pre-wrap">
            {text}
            <span className="animate-pulse">_</span>
        </div>
    );
};

const CorruptedFile = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-gray-50 border-2 border-dashed border-red-300 rounded-lg text-red-500 p-6 text-center">
            <AlertTriangle size={48} className="mb-4" />
            <h3 className="font-bold text-lg mb-2">FILE CORRUPTED</h3>
            <p className="text-sm text-gray-600">The file "scrapped_ui_v1.png" cannot be opened. The data appears to have been lost in a catastrophic coffee spill circa 2021.</p>
        </div>
    );
};

const Archive = () => {
    const { windows } = useWindowStore();
    const [activeEasterEgg, setActiveEasterEgg] = useState(null);

    if (!windows.trash.isOpen) return null;

    const files = [
        { id: "terminal", name: "hello_world.exe", icon: "terminal.png" },
        { id: "corrupted", name: "scrapped_ui_v1.png", icon: "photos.svg" },
        { id: "tictactoe", name: "tic_tac_toe.sh", icon: "notes.png" }
    ];

    return (
        <>
            <div id="window-header" className="bg-gray-100 flex items-center px-4 py-2 border-b border-gray-300 shrink-0">
                <WindowControls target="trash" />
                <h2 className="text-sm font-bold text-center flex-1 pr-12">Archive</h2>
            </div>

            <div className="flex-1 flex flex-col h-[calc(100%-40px)]">
                {/* File Grid */}
                <div className={`p-6 flex gap-6 ${activeEasterEgg ? 'h-40 border-b border-gray-200 bg-gray-50' : 'flex-1'} transition-all duration-300 overflow-y-auto`}>
                    {files.map(file => (
                        <div 
                            key={file.id} 
                            className={`flex flex-col items-center justify-start gap-2 w-24 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors ${activeEasterEgg === file.id ? 'bg-gray-200 ring-2 ring-blue-400' : ''}`}
                            onClick={() => setActiveEasterEgg(activeEasterEgg === file.id ? null : file.id)}
                        >
                            <img src={`/images/${file.icon}`} alt={file.name} className="w-12 h-12 object-contain drop-shadow-sm pointer-events-none" />
                            <span className="text-xs text-center break-words w-full text-gray-800 leading-tight">{file.name}</span>
                        </div>
                    ))}
                </div>

                {/* Easter Egg Content Area */}
                {activeEasterEgg && (
                    <div className="flex-1 p-6 bg-white overflow-hidden flex items-center justify-center min-h-[300px]">
                        {activeEasterEgg === "terminal" && <RetroTerminal />}
                        {activeEasterEgg === "corrupted" && <CorruptedFile />}
                        {activeEasterEgg === "tictactoe" && <TicTacToe />}
                    </div>
                )}

                {/* Status bar when nothing is active */}
                {!activeEasterEgg && (
                    <div className="bg-gray-100 border-t border-gray-300 px-4 py-1 flex justify-between items-center text-xs text-gray-500 shrink-0">
                        <span>3 items</span>
                        <span>0 bytes</span>
                    </div>
                )}
            </div>
        </>
    );
};

const ArchiveWindow = WindowWrapper(Archive, "trash");
export default ArchiveWindow;
