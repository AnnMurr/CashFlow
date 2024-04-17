import { FC } from "react";
import { Container } from "./styledTitle";

interface TitleProps {
    text: string;
}

export const Title: FC<TitleProps> = ({ text }) => {
    return (
        <Container>
            <h3>
                {text}
            </h3>
        </Container>
    )
}