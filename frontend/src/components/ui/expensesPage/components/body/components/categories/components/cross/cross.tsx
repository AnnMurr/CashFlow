import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Button } from "./styledCross";

export const Cross: FC = () => {
    return (
        <Button className="item-btn">
            <FontAwesomeIcon
                style={{ pointerEvents: "none" }}
                color="#000"
                icon={faCircleXmark} />
        </Button>
    )
}