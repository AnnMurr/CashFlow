import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Container, Wrapper } from "./styledItem";

export const Item: FC = () => {
    const location = useLocation();

    return (
        <Container>
            <Wrapper>
                <div>
                    <div>
                        <h5>
                            Email
                        </h5>
                    </div>
                    <div>
                        {location.state}
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPen} />
                </div>
            </Wrapper>
        </Container>
    )
}