import { FC } from "react";
import { Inner, ItemLink } from "./styledItem";

interface ItemType {
    text: string;
}

export const Item: FC<ItemType> = ({ text }) => {
    return (
        <Inner>
            <ItemLink to={""}>
                {text}
            </ItemLink>
        </Inner>
    )
}