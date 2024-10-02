import { FC, useState } from "react";
import { AlertComponentProps } from "../../../shared/alert/alert";
import { Content, SettingsChangingHeader, SettingsPageContainer, AlertComponent } from ".";


export const ChangeEmailCheckingPage: FC = () => {
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);

    return (
        <SettingsPageContainer>
            <SettingsChangingHeader category={"Email"} />
            <Content setAlertActive={setAlertActive} />
            {isAlertActive && (
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
            )}
        </SettingsPageContainer>
    )
}