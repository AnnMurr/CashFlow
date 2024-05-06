import { FC } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BtnCloseProps {
    func?: () => void;
}

export const BtnClose: FC<BtnCloseProps> = ({ func }) => {
    return (
        <button onClick={func}>
            <FontAwesomeIcon size="lg" icon={faXmark} />
        </button>
    )
}