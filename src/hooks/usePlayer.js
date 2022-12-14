import { useState } from "react";
import { randomTetrominos } from "../tetrominos";

//create custom hook
export const usePlayer = () => {

    //create an init the state for the player 
    //and put the props for the position, shape of tetrominos, collipse
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: randomTetrominos().shape,
        collided: false,
    })


    return [player];
}

