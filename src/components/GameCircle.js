import React from 'react';

const GameCircle = ({id, className, onCircleClicked}) => {
    return(
        <div className={`gameCircle ${className}`} 
        onClick={(e)=>onCircleClicked(id)}>
        </div>
    )
}

export default GameCircle;