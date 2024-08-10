import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Container, ExitBtnInner, Wrapper } from "./styledHeader";
interface HeaderProps {
    setIsLogOutConfirmationModal: (value: boolean) => void;
}

export const Header: FC<HeaderProps> = ({ setIsLogOutConfirmationModal }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <ExitBtnInner>
                    <button type="button" onClick={() => setIsLogOutConfirmationModal(true)}>
                        <FontAwesomeIcon
                            color={themeContext.themeStyles.color}
                            size="lg"
                            icon={faArrowRightFromBracket} />
                    </button>
                </ExitBtnInner>
            </Wrapper>
        </Container>
    )
}