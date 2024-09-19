import { FC } from "react";
import { Content, SettingsChangingHeader, SettingsPageContainer } from ".";

export const ChangePasswordModificationPage: FC = () => {
    return (
        <SettingsPageContainer>
            <SettingsChangingHeader category={"Password"} />
            <Content />
        </SettingsPageContainer>
    )
}