import { FC } from "react";
import { Content } from "./components/content/content";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { SettingsPageContainer } from "../../../shared/settingsPageContainer/settingsPageContainer";

export const ChangeEmailPage: FC = () => {
    return (
        <SettingsPageContainer>
            <SettingsChangingHeader category={"Email"} />
            <Content />
        </SettingsPageContainer>
    )
}