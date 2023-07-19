import React from 'react';
import {GAME_STATE_PLAYING, GAME_STATE_WIN, GAME_STATE_DRAW} from "../Constants";

const Footer = ({onNewGameClick, onSuggestClick, gameState}) => {
    const renderBtns = ()=>{
        if(gameState === GAME_STATE_PLAYING) return <button onClick={onSuggestClick}>Suggest</button>
        return <button onClick={onNewGameClick}>New game</button>
    }
    return (
        <div className='footer'>
            {renderBtns()}
        </div>
    )
}

export default Footer