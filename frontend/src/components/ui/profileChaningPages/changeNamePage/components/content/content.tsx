import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { EditUserDataModal } from "../../../../../shared/editUserDataModal/editUserDataModal";
import { DarkBackground } from "../../../../../shared/darkBackground/darkBackground";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { Container, Wrapper, UserName } from "./styledContent";

export const Content: FC = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const location = useLocation();
    const [userName, setUserName] = useState<string>(location.state);

    return (
        <Container>
            <Wrapper>
                <div>
                    <div>
                        <h3>
                            Name
                        </h3>
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
                            setIsModalActive={setIsModalActive}
                            setIsAlertActive={setIsAlertActive} />
                        <DarkBackground />
                    </> : null}
                {isAlertActive ?
                    <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                    : null}
            </Wrapper>
        </Container>
    )
}