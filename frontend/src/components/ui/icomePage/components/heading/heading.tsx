import { FC } from "react";
import { Container, Sum, Title } from "./styledHeading";

export const Heading: FC = () => {
    return (
        <Container>
            <Title>
                <h2>Day Income</h2>
            </Title>
            <Sum>
                <span>0</span>
            </Sum>
        </Container>
    )
}