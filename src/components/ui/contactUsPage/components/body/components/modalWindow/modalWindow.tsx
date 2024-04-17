import { FC } from "react";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Wrapper, Title } from "./styledModalWindow";

export const ModalWindow: FC = () => {
    return (
        <Container>
            <Wrapper>
                <Title>
                    <h2>
                        Thank you for your request!
                    </h2>
                </Title>
                <div>
                    <FontAwesomeIcon color="#21b835" size="6x" icon={faCircleCheck} />
                </div>
            </Wrapper>
        </Container>
    )
}