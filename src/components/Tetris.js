import React, { useState } from "react";

//need it for cleaning the stage when restart the game
import { createStage, checkCollision } from "../gameHelpers";

//styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

//Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = () => {
//create state : the speed is modified according to the level
    const [dropTime, setDropTime] = useState(null);

//create state : the game is over or not?(true or false)
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');

    const movePlayer = dir => {
        if(!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 })
        }
    }
//Reset everything
    const startGame = () => {
        setStage(createStage()); //reset the game
        resetPlayer(); //reset the player
        setGameOver(false)
    }

    const drop = () => {
        if(!checkCollision(player, stage, { x: 0, y: 1 })) {
        updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
        //Game Over
        if (player.pos.y < 1) {
            console.log("GameOver!!!");
            setGameOver(true);
            setDropTime(null);
        }
        updatePlayerPos({ x: 0, y: 0, collided: true })
    }}

    const dropPlayer = () => {
        drop();
    }

//movement with the keybord (keycode 37 = arrowLeft & keycode 39 = arrowRight on the x-axis) (keycode 40 = arrow down  y-axis(dropdown/dropPlayer))
//if the game is not over so move with the arrow is possible on the stage
    const move = ({ keyCode }) => {
        if(!gameOver){
            if(keyCode === 37) {
                movePlayer(-1); //move to the left behind the x-axis
            } else if (keyCode === 39) {
                movePlayer(1); //move to the right behind the x-axis
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                //just one implementaion to rotate the tetromino to th right
                playerRotate(stage, 1);
            }
        }
    }

    return(
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                  {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" />
                                ) : ( 
                                    <div>
                                        <Display text="Score" />
                                        <Display text="Rows" />
                                        <Display text="Level" />
                                    </div>
                                    )
                  } 
                    <StartButton callback={startGame} />
                </aside>
                </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;