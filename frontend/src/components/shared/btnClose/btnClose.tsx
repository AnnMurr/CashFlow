import { FC } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BtnCloseProps {
    func?: () => void;
    color?: string;
}

export const BtnClose: FC<BtnCloseProps> = ({ func, color }) => {
    return (
        <button onClick={func}>
            <FontAwesomeIcon color={color} size="lg" icon={faXmark} />
        </button>
    )
}