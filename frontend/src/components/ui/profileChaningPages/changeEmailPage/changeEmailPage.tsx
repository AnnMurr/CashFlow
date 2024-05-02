import { FC } from "react";
import { Item } from "./components/item/item";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Wrapper, Block } from "./styledChangeEmailPage";

export const ChangeEmailPage: FC = () => {
    return (
        <section>
            <Wrapper>
                <SettingsChangingHeader category={"Email"} />
                <Block>
                    <Item />
                </Block>
            </Wrapper>
        </section>
    )
}