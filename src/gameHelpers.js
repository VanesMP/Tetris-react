export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

//creating a array ==== tetris grid

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )


//create collision detection with for loop
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for(let y = 0; y < player.tetromino.lenght; y += 1) {
        for(let x = 0; x < player.tetromino[y].lenght; x += 1) {

            //1.Check that we're on an actal Tetromino cell
            if(player.tetromino[y][x] !== 0) {
                //2.Check that our move is inside the game areas height (y)
                //We shouldn't go through the bottom of the play areas

                //3.Check that our move is inside the game areas height (x)

                //4.Check that the cellwer'e moving to isn't set the clear 
                
            }

        }
    }
}
