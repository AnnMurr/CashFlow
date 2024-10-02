import { FC } from "react";
import { SettingsChangingHeader, SettingsPageContainer, Content } from ".";

export const ChangeEmailPage: FC = () => {
    return (
        <SettingsPageContainer>
            <SettingsChangingHeader category={"Email"} />
            <Content />
        </SettingsPageContainer>
    )
}