import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Button } from "./styledCross";

export const Cross: FC<any> = ({func}) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    
    return (
        <Button onClick={func} className="item-btn">
            <FontAwesomeIcon
                style={{ pointerEvents: "none" }}
                color={themeContext.themeStyles.color}
                icon={faCircleXmark} />
        </Button>
    )
}