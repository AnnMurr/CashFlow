import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { BtnInner } from "./styledButton";

interface BottonProps {
    text: string;
    link: string;
}

export const Button: FC<BottonProps> = ({ text, link }) => {
    const navigate = useNavigate();

    return (
        <BtnInner>
            <ButtonComponent
                backgroundColor="#5B8A72"
                BackgroundColorHover="#0f4a34"
                text={text}
                color="#fff"
                type="button"
                func={() => navigate(link)} />
        </BtnInner>
    )
}