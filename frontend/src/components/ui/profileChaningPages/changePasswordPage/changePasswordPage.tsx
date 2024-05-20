import { FC } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Content } from "./components/content/content";
import { Block, Wrapper } from "./styledChangePasswordPage";
import { useLocation } from "react-router-dom";

export const ChangePasswordPage: FC = () => {
    const location = useLocation();

    console.log(location);
    return (
        <section>
            <Wrapper>
                <SettingsChangingHeader category={"Password"} />
                <Block>
                    <Content />
                </Block>
            </Wrapper>
        </section>
    )
}