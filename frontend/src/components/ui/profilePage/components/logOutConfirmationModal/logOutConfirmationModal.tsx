import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { AuthorizedContext, AuthorizedContextType } from "../../../../../contexts/authorizedContext/authorizedContext";
import { removeDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { ConfirmationModal } from "../../../../shared/confirmationModal/confirmationModal";
import { Container } from "./styledLogOutModal";

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
            <ConfirmationModal
                closeModal={setIsModalActive}
                handleClick={getLogOut}
                text="Are you sure you want to log out and end your session?"
                btnText="Log out" />
        </Container>
    )
}