import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Button } from "./styledBtnGoBack";

export const BtnGoBack: FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Button onClick={() => navigate(-1)}>
                <FontAwesomeIcon size="xl" color="black" icon={faCircleLeft} />
            </Button>
        </Container>
    )
}