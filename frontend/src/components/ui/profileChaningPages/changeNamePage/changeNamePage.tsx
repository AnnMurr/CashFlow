import { FC, useState } from "react";
import { AlertComponentProps } from "../../../shared/alert/alert";
import { Content, DarkBackground, EditUserDataModal, SettingsChangingHeader, SettingsPageContainer, AlertComponent } from ".";

export const ChangeNamePage: FC = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [userName, setUserName] = useState<string | null | undefined>(null);

    return (
        <SettingsPageContainer>
            <SettingsChangingHeader category={"Name"} />
            <Content
                setUserName={setUserName}
                userName={userName}
                setIsModalActive={setIsModalActive} />
            {isModalActive ?
                <>
                    <EditUserDataModal
                        userData={userName}
                        changeUserData={setUserName}
                        setIsModalActive={setIsModalActive}
                        setIsAlertActive={setIsAlertActive} />
                    <DarkBackground
                        setIsModalActive={setIsModalActive}
                        isModalActive={isModalActive} />
                </> : null}
            {isAlertActive ?
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                : null}
        </SettingsPageContainer>
    )
}