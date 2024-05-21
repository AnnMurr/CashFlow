import { FC } from "react";
import { getCurrentDate } from "../../../../../../../utils/getCurrentDate";
import { ItemType } from "../../types";
import { Container, IconInner } from "./styledItem";

interface ItemProps {
    dataItem: ItemType;
}

export const Item: FC<ItemProps> = ({ dataItem }) => {
    const date = getCurrentDate(dataItem.date);

    return (
        <Container>
            <IconInner>
                <img src={dataItem.icon} alt={dataItem.category} />
            </IconInner>
            <div>
                <span>{dataItem.category}</span>
            </div>
            <div>
                <span>{dataItem.sum}$</span>
            </div>
            <div style={{ textAlign: "end" }}>
                <span>{date.split(" ")[1]}</span>
            </div>
        </Container>
    )
}