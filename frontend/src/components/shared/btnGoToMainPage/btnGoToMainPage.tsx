import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Container, StyledLink, Text } from "./styledBtnGoToMainPage";

export const BtnGoToMainPage: FC = () => {
    return (
        <Container>
            <StyledLink to={"/"}>
                <FontAwesomeIcon size="xl" color="black" icon={faCircleLeft} />
            </StyledLink>
            <Text>
                <span>Go home</span>
            </Text>  
        </Container>
    )
}