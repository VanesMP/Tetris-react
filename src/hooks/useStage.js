import { useState } from "react";
import { createStage } from "../gameHelpers";

//create custom hook : useStage

export const useStage = () => {
    const [stage, setStage] = useState(createStage);

    return [stage, setStage];
}