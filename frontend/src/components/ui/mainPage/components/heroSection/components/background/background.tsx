import { FC } from "react";
import { BACKGROUND_SPACE } from "../../../../../../../consts/images";
import { Wrapper, Image } from "./styledBackground";

interface BackgroundType {
    windowHeight: number;
}

export const Background: FC<BackgroundType> = ({ windowHeight }) => {
    return (
        <Wrapper>
            <Image
                windowheight={windowHeight}
                src={BACKGROUND_SPACE}
                alt="space" />
        </Wrapper>
    )
}