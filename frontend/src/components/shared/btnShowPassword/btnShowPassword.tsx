import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface BtnShowPasswordProps {
    func: () => void;
    isTypePassword: boolean;
}

export const BtnShowPassword: FC<BtnShowPasswordProps> = ({ func, isTypePassword }) => {
    return (
        <button type="button" onClick={func}>
            <FontAwesomeIcon
                style={{ color: "rgb(112 112 112)" }}
                icon={isTypePassword ? faEye : faEyeSlash} />
        </button>
    )
}