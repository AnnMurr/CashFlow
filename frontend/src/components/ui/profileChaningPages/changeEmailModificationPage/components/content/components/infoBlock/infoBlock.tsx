import { FC } from "react";
import { Container } from "./styledInfoBlock";

export const InfoBlock: FC = () => {
    return (
        <Container>
            <span>
                You're about to update your email address.
                Please ensure that you have access to the new email account,
                as it will be used for future communications.
            </span>
        </Container>
    )
}