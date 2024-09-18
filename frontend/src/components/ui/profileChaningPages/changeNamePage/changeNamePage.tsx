import { FC, useState } from "react";
import { Content } from "./components/content/content";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { DarkBackground } from "../../../shared/darkBackground/darkBackground";
import { AlertComponent, AlertComponentProps } from "../../../shared/alert/alert";
import { EditUserDataModal } from "./components/editUserDataModal/editUserDataModal";
import { SettingsPageContainer } from "../../../shared/settingsPageContainer/settingsPageContainer";

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