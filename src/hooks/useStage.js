import { useState } from "react";
import { createStage } from "../gameHelpers";

//create custom hook : useStage
//droping in the stage

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage);

    return [stage, setStage];
}