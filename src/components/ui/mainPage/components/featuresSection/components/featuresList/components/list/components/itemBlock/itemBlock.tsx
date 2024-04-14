import { FC } from "react";
import { IconInner, Item, SubTitle, Title } from "./styledItemBlock";

interface ItemBlockType {
    type: string;
    link: string;
    titleText: string;
    SubTitleText: string
}

export const ItemBlock: FC<ItemBlockType> = ({ type, link, titleText, SubTitleText }) => {
    return (
        <Item type={type}>
            <div>
                <div>
                    <Title>
                        {titleText}
                    </Title>
                </div>
                <div>
                    <SubTitle>
                        {SubTitleText}
                    </SubTitle>
                </div>
            </div>
            <IconInner>
                <img src={link} alt="calendar" />
            </IconInner>
        </Item>
    )
}