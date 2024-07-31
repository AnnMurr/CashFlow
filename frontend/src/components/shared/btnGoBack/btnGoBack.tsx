import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { Container, Button } from "./styledBtnGoBack";

interface BtnGoBackProps {
    goBack?: () => void;
}

export const BtnGoBack: FC<BtnGoBackProps> = ({ goBack }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const navigate = useNavigate();

    return (
        <Container>
            <Button onClick={goBack ? goBack : () => navigate(-1)}>
                <FontAwesomeIcon size="xl" color={themeContext.themeStyles.color} icon={faCircleLeft} />
            </Button>
        </Container>
    )
}