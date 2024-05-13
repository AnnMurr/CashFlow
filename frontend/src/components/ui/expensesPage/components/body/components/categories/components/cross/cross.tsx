import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export const Cross: FC = () => {
    return (
        <button
            className="item-btn"
            style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                cursor: 'pointer',
            }} >
            <FontAwesomeIcon
                style={{ pointerEvents: "none" }}
                color="#000"
                icon={faCircleXmark} />
        </button>
    )
}