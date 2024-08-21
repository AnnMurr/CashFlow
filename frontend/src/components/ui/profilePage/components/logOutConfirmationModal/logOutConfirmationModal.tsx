import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { AuthorizedContext, AuthorizedContextType } from "../../../../../contexts/authorizedContext/authorizedContext";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../shared/button/button";
import { removeDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { BtnInner, Container, Title, Wrapper } from "./styledLogOutModal";

interface LogOutConfirmationModalProps {
    setIsModalActive: (value: boolean) => void;
}

export const LogOutConfirmationModal: FC<LogOutConfirmationModalProps> = ({ setIsModalActive }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const authorizedContext = useContext<AuthorizedContextType>(AuthorizedContext);
    const navigate = useNavigate();

    const getLogOut = () => {
        authorizedContext.logOut();
        removeDataFromLocalStorage("token");
        navigate("/");
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{
                        marginLeft: "auto",
                        paddingBottom: "15px",
                    }}
                    closeBlock={setIsModalActive}
                    size="lg" />
                <Title themestyles={themeContext.themeStyles}>
                    <h5>
                        Are you sure you want to log out and end your session?
                    </h5>
                </Title>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#a71616"
                        BackgroundColorHover="#820e0e"
                        text="Log out"
                        color="#fff"
                        type="button"
                        func={getLogOut} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}