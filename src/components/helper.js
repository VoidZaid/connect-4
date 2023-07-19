export const isWinner = (gameBoard,currentMove,currentPlayer) =>{
    let arr = [...gameBoard];
    arr[currentMove]=currentPlayer;
    const winLines=[
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [0,5,10,15],
        [3,6,9,12]
    ];
    for (let i = 0; i < winLines.length; i++) {
        const [c1, c2, c3, c4] = winLines[i];
        if(arr[c1] != 0 &&
            arr[c1]===arr[c2] && 
            arr[c2]===arr[c3] && 
            arr[c3]===arr[c4]){
            return true;
        }
    }
    return false
}

export const isDraw =(gameBoard,currentMove,currentPlayer)=>{
    let arr = [...gameBoard];
    arr[currentMove] = currentPlayer;
    // en el ulimo movimiento pueda que se decida un ganador, entonces todos serian diferentes de 0 pero con ganador y nos mostraria el mensaje ISDRAW, por ello valodamos con ISWINNER y solucionamos el problema, si es el ultimo movimiento disponible nos mostrara el ganador correctamente
    if(!arr.includes(0) && isWinner(gameBoard,currentMove,currentPlayer) !== true){
        return true;
    }
    return false;
}



export const getComputerMove= (gameBoard)=>{
    // creamos un array que contenga todos las combinaciones posibles en las que un jugador puede ganar
    let moveChecks = [
        {// vertical
            indexes: [0,4,8,12],
            max: 4,//numero de veces para hcer LOOP
            step: 1
        },
        {//horizontal
            indexes: [0,1,2,3],
            max: 16,//sale del largo de array anterior * STEP
            step: 4
        },
        {//diagonal
            indexes: [0,5,10,15],
            max: 16,
            step: 16 //no necesitamos repetir este a diferencia de los anteriores, podemos 16 ya no se repetira
        },
        {
            indexes: [3,6,9,12],
            max: 16,
            step: 16
        }
    ];
    let position = getPosition(gameBoard, moveChecks);
    if(position > -1) return position;
    else return getRndComputerMove(gameBoard);
}

const getPosition = (gameBoard, moveChecks)=>{
    for (let check = 0; check < moveChecks.length; check++) {
        for (let i = 0; i < moveChecks[check].max; i+= moveChecks[check].step) {
            let combination = gameBoard[i+moveChecks[check].indexes[0]].toString() +
                gameBoard[i+moveChecks[check].indexes[1]].toString() +
                gameBoard[i+moveChecks[check].indexes[2]].toString() +
                gameBoard[i+moveChecks[check].indexes[3]].toString();
            switch (combination) {
                case "1110":
                case "2220":
                    return i+ moveChecks[check].indexes[3];
                case "1101":
                case "2202":
                    return i+ moveChecks[check].indexes[2];
                case "1011":
                case "2022":
                    return i+ moveChecks[check].indexes[1];
                case "0111":
                case "0222":
                    return i+ moveChecks[check].indexes[0];
            }
        }
    }
    return -1;
}
const getRndComputerMove = (gameBoard)=>{
    let validMoves = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if(gameBoard[i] === 0) validMoves.push(i);
    }
    // obtenemos un indice aleotorio
    let rndMove = Math.floor(Math.random()*validMoves.length);
    // del indice aleotorio retornamos un indice GameBoard cuyo valor es 0
    return validMoves[rndMove];
}