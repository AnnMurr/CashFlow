import { FC, useState } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { SettingsPageContainer } from "../../../shared/settingsPageContainer/settingsPageContainer";
import { AlertComponent, AlertComponentProps } from "../../../shared/alert/alert";
import { Content } from "./components/content/content";

export const ChangePasswordPage: FC = () => {
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);

    return (
        <SettingsPageContainer>
            <SettingsChangingHeader category={"Password"} />
            <Content setAlertActive={setAlertActive} />
            {isAlertActive ?
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                : null}
        </SettingsPageContainer>
    )
}