import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { EditUserDataModal } from "../../../../../shared/editUserDataModal/editUserDataModal";
import { DarkBackground } from "../../../../../shared/darkBackground/darkBackground";
import { Container, Wrapper, UserName } from "./styledItem";

export const Item: FC = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const location = useLocation();
    const [userName, setUserName] = useState<string>(location.state);

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
                        <span>{userName}</span>
                    </UserName>
                </div>
                <button onClick={() => setIsModalActive(true)} type="button">
                    <FontAwesomeIcon icon={faPen} />
                </button>
                {isModalActive ?
                    <>
                        <EditUserDataModal
                            userData={userName}
                            changeUserData={setUserName}
                            setIsModalActive={setIsModalActive} />
                        <DarkBackground />
                    </> : null}
            </Wrapper>
        </Container>
    )
}