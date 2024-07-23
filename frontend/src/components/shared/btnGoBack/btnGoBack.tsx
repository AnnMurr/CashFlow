import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Button } from "./styledBtnGoBack";

interface BtnGoBackProps {
    goBack?: () => void;
}

export const BtnGoBack: FC<BtnGoBackProps> = ({ goBack }) => {
    const navigate = useNavigate();

    return (
        <Container>
            <Button onClick={goBack ? goBack : () => navigate(-1)}>
                <FontAwesomeIcon size="xl" color="black" icon={faCircleLeft} />
            </Button>
        </Container>
    )
}