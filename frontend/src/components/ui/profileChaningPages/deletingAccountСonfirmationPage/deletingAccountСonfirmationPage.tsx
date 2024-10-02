import { FC } from "react";
import { Content, SettingsChangingHeader } from ".";
import { SettingsPageContainer } from "../../../shared/settingsPageContainer/settingsPageContainer";

export const DeletingAccountConfirmationPage: FC = () => {
    return (
        <SettingsPageContainer>
            <SettingsChangingHeader category={"Deliting account"} />
            <Content />
        </SettingsPageContainer>
    )
}