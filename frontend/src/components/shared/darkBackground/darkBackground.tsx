import { FC, RefObject } from "react";
import { Container } from "./styledDarkBackground";

interface DarkBackgroundProps {
    darkBackgroundRef?: RefObject<HTMLDivElement>;
    type?: string;
}

export const DarkBackground: FC<DarkBackgroundProps> = ({ darkBackgroundRef, type }) => {
    return (
        <Container type={type} ref={darkBackgroundRef}></Container>
    )
}