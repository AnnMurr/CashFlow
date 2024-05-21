import { FC } from "react";
import { Container } from "./styledItemDay";

interface ItemDayProps {
    title: string;
}

export const ItemDay: FC<ItemDayProps> = ({ title }) => {
    return (
        <Container>
            <span>{title}</span>
        </Container>
    )
}