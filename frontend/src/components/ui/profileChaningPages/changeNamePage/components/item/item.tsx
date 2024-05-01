import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Container, Wrapper, UserName } from "./styledItem";

export const Item: FC = () => {
    const location = useLocation();
    
    return (
        <Container>
            <Wrapper>
                <div>
                    <div>
                        <h5>
                            Name
                        </h5>
                    </div>
                    <UserName>
                        <span>{location.state}</span>
                    </UserName>
                </div>
                <button type="button">
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </Wrapper>
        </Container>
    )
}