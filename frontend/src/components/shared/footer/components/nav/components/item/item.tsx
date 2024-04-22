import { FC } from "react";
import { Inner, ItemLink } from "./styledItem";

interface ItemType {
    text: string;
    link: string;
}

export const Item: FC<ItemType> = ({ text, link }) => {
    return (
        <Inner>
            <ItemLink to={link}>
                {text}
            </ItemLink>
        </Inner>
    )
}