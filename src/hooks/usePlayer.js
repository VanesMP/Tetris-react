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

    //matrix == tetrominos
    const rotate = (matrix, dir) => {
        //Make the rows to become a cols (transpose)
        const rotateTetro = matrix.map((_, index) =>
            matrix.map((col) => col[index])
            );
        //Reverse each row to get a rotate matrix
        if(dir > 0) return rotateTetro.map(row=> row.reverse());
        return rotateTetro.reverse();
    }

    // different to rotate() because we need to detection collision when the player rotate the tetromino
    const playerRotate = (stage, dir) => {
        //create a complete clone player because we dont work with the plaer in the state and we dont want to mute the state.
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        //Get the tetrominos of the player
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        setPlayer(clonedPlayer);

    }

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

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}

