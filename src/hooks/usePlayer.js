import { useCallback, useState } from "react";
import { STAGE_WIDTH } from "../gameHelpers";
import { TETROMINOS, randomTetrominos } from "../tetrominos";

//create custom hook
export const usePlayer = () => {

    //create an init the state for the player 
    //and put the props for the position, shape of tetrominos, collipse
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }))
    };

    //using useCallback() hook to avoid infinity loop
    const resetPlayer = useCallback(() => {
            setPlayer({
                pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
                tetromino: randomTetrominos().shape,
                collided: false,
            })
    }, [])

    return [player, updatePlayerPos, resetPlayer];
}

