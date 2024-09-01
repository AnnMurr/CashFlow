import { FC, MouseEvent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Button } from "./styledCross";

interface CrossProps {
    deleteCategory: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Cross: FC<CrossProps> = ({ deleteCategory }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Button onClick={deleteCategory} className="item-btn">
            <FontAwesomeIcon
                style={{ pointerEvents: "none" }}
                color={themeContext.themeStyles.color}
                icon={faCircleXmark} />
        </Button>
    )
}