import { FC } from "react";
import { Container, InfoText, InfoTitle } from "./styledInfoBlock";

export const InfoBlock: FC = () => {
    return (
        <Container>
            <InfoTitle>
                <h5>
                    Who can see your name
                </h5>
            </InfoTitle>
            <InfoText>
                <span>
                    Your name will only be visible to you, and no one else
                    will be able to see it,
                    including other users or service administrators.
                </span>
            </InfoText>
        </Container>
    )
}