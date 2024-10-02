import { FC, useState } from "react";
import { Content } from "./components/content/content";
import { AlertComponentProps } from "../../../shared/alert/alert";
import { SettingsChangingHeader, SettingsPageContainer, AlertComponent } from ".";

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