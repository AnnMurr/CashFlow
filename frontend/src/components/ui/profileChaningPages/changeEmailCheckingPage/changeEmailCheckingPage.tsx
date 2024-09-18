import { FC, useState } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Content } from "./components/content/content";
import { AlertComponent, AlertComponentProps } from "../../../shared/alert/alert";
import { SettingsPageContainer } from "../../../shared/settingsPageContainer/settingsPageContainer";

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