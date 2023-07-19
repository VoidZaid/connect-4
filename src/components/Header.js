import React from "react";
import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN } from "../Constants";

 const Header = ({gameState,player, winPlayer})=>{
    const renderLabel = ()=>{
        switch(gameState){
            case GAME_STATE_PLAYING:
                return `Player ${player} turn`;
            case GAME_STATE_WIN:
                return `Player ${winPlayer} wins`;
            case GAME_STATE_DRAW:
                return `Game is a Draw!`;
        }
    }

    return(
        <div className="panel header">
            <h1 className="header-text">
                {renderLabel()}
                <div className={`header-circle ${gameState === GAME_STATE_PLAYING?'player_'+player:'player_wins'}`}></div>
            </h1>
        </div>
    )
 };

 export default Header;