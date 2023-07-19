import React,{useState, useEffect} from "react";
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";
import {isDraw, isWinner, getComputerMove} from "./helper";
// estilos CSS
import '../Game.css';
//constantes
import { NO_PLAYER, PLAYER_1, PLAYER_2, GAME_STATE_PLAYING, GAME_STATE_WIN, GAME_STATE_DRAW } from "../Constants";


const GameBoard = () =>{
    // con este state sabremos que posicion tiene que ID de jugador, para pintarlo de un color determinado
    const [gameBoard,setGameBoard]=useState(Array(16).fill(NO_PLAYER));
    //con el siguiente State vamos a alternar entre los <do></do>s jugadores
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    // creamos un State del progreso del juego
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    //establecemos State de ganador para evitar problemas con Async
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);
    
    useEffect(() => {
        initGame();
    }, []);
    // usaremos esto apra inicializar el juego con el boton NUEVO JUEGO
    const initGame=()=>{
        setGameBoard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
        console.log("inicializando el juego")
    }
    // con este metodo vamos a iniciar nuestra aplicacion
    const initBoard = ()=>{
        let circles = [];
        for (let i = 0; i < gameBoard.length; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }
    // desarrolamos el metodo para jugar con PC
    const suggestMove = ()=>{
        // esto funciona como si le hicieramos clic simple, por ello solo vamos a usar el circleClick()
        let move = getComputerMove(gameBoard);
        circleClick(move);        

    }
    const circleClick= (id)=>{
    // const board = [...gameBoard];board[id] = currentPlayer;setGameBoard(board);
        if(gameBoard[id]!==NO_PLAYER) return;
        if(gameState !== GAME_STATE_PLAYING) return;
        if(isWinner(gameBoard,id,currentPlayer)){
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
            console.log("hay un ganador....")
        }
        if(isDraw(gameBoard,id,currentPlayer)){
            setGameState(GAME_STATE_DRAW)
        }
        setGameBoard(prev=>{
            return prev.map((circlePlayer, index)=>{
                if (index=== id) return currentPlayer;
                // console.log(circlePlayer + " circleFillPlayer");
                return circlePlayer;
            })
        })
        setCurrentPlayer(currentPlayer ===PLAYER_1? PLAYER_2:PLAYER_1);
    }
    const renderCircle = id =>{
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClick}/>
    }
    return(
        <>
            <Header gameState={gameState} player={currentPlayer} winPlayer={winPlayer}></Header>
            <div className="gameBoard">
                {initBoard()}
            </div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState}></Footer>
        </>
    )
}

export default GameBoard;