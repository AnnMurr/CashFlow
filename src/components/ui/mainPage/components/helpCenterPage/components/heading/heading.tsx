import { FC } from "react";
import { SubTitle, Title, Container } from "./styledHeading";

export const Heading: FC = () => {
    return (
        <Container>
            <Title>
                <h2>
                    Help Center
                </h2>
            </Title>
            <SubTitle>
                <h3>
                    Need to ask us how to use? Simply get in touch with us.
                </h3>
            </SubTitle>
        </Container>
    )
}