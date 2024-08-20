import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { ExitBtnInner } from "./styledLogOutBtn";

interface LogOutBtnProps {
    setIsLogOutConfirmationModal: (value: boolean) => void;
}

export const LogOutBtn: FC<LogOutBtnProps> = ({setIsLogOutConfirmationModal}) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    
    return (
        <ExitBtnInner>
            <button type="button" onClick={() => setIsLogOutConfirmationModal(true)}>
                <FontAwesomeIcon
                    color={themeContext.themeStyles.color}
                    size="lg"
                    icon={faArrowRightFromBracket} />
            </button>
        </ExitBtnInner>
    )
}