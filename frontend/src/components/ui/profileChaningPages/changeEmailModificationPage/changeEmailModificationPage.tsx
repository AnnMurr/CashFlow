import { FC } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Content } from "./components/content/content";
import { SettingsPageContainer } from "../../../shared/settingsPageContainer/settingsPageContainer";

export const ChangeEmailModificationPage: FC = () => {
    return (
        <SettingsPageContainer>
            <SettingsChangingHeader category={"Email"} />
            <Content />
        </SettingsPageContainer>
    )
}