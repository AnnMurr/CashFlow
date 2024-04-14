import { FC } from "react";
import { BACKGROUND_SPACE } from "../../../../../../../consts/images";
import { Wrapper } from "./styledBackground";

interface BackgroundType {
    windowHeight: number;
}

export const Background: FC<BackgroundType> = ({ windowHeight }) => {
    return (
        <Wrapper>
            <img
                style={{ height: `${windowHeight - 90}px ` }}
                src={BACKGROUND_SPACE}
                alt="space" />
        </Wrapper>
    )
}