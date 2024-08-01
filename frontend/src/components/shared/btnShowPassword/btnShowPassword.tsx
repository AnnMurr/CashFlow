import { FC, useContext } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { ThemeContextType } from "../../../contexts/themeContext/types";

interface BtnShowPasswordProps {
    func: () => void;
    isTypePassword: boolean;
}

export const BtnShowPassword: FC<BtnShowPasswordProps> = ({ func, isTypePassword }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    
    return (
        <button type="button" onClick={func}>
            <FontAwesomeIcon
                style={{ color: themeContext.themeStyles.showPasswordIconColor }}
                icon={isTypePassword ? faEye : faEyeSlash} />
        </button>
    )
}