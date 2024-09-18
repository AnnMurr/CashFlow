import { FC } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { SettingsPageContainer } from "../../../shared/settingsPageContainer/settingsPageContainer";
import { Content } from "./components/content/content";

export const ChangePasswordModificationPage: FC = () => {
    return (
        <SettingsPageContainer>
            <SettingsChangingHeader category={"Password"} />
            <Content />
        </SettingsPageContainer>
    )
}