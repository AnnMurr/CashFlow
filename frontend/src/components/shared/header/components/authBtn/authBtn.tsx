import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Button } from "./styledAuthBtn";

interface AuthBtnProps {
    icon: IconDefinition;
    color: string;
    isUserAuth: boolean;
}

export const AuthBtn: FC<AuthBtnProps> = ({ icon, color, isUserAuth }) => {
    return (
        <div>
            <Button to={isUserAuth ? "/profile" : "/sign-up"} >
                <FontAwesomeIcon
                    icon={icon}
                    color={color}
                    size="lg" />
            </Button>
        </div>
    )
}