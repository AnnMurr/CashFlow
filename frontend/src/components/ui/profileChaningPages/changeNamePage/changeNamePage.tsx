import { FC } from "react";
import { Item } from "./components/item/item";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Wrapper, Block } from "./styledChangeNamePage";

export const ChangeNamePage: FC = () => {
    return (
        <section>
            <Wrapper>
                <SettingsChangingHeader category={"Name"} />
                <Block>
                    <Item />
                </Block>
            </Wrapper>
        </section>
    )
}