import React, { useState } from "react";

//styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

//Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

export const Tetris = () => {
//create state : the speed is modified according to the level
    const [dropTime, setDropTime] = useState(null);

//create state : the game is over or not?(true or false)
    const [gameOver, setGameOver] = useState(false);

    const [player] = usePlayer();
    const [stage, setStage] = useStage(player);

    return(
        <StyledTetrisWrapper>
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
                    <StartButton />
                </aside>
                </StyledTetris>
        </StyledTetrisWrapper>
    )
}
