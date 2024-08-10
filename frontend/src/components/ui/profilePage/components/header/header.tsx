import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Container, ExitBtnInner, Wrapper } from "./styledHeader";

interface HeaderProps {
    setIsLogOutConfirmationModal: (value: boolean) => void;
}

export const Header: FC<HeaderProps> = ({ setIsLogOutConfirmationModal }) => {
    return (
        <Container>
            <Wrapper>
                <ExitBtnInner>
                    <button type="button" onClick={() => setIsLogOutConfirmationModal(true)}>
                        <FontAwesomeIcon size="lg" icon={faArrowRightFromBracket} />
                    </button>
                </ExitBtnInner>
            </Wrapper>
        </Container>
    )
}