import { FC } from "react";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { Container, IconInner } from "./styledItemDay";
interface ItemDayProps {
    title: string;
}

export const ItemDay: FC<ItemDayProps> = ({ title }) => {
    const { chosenCategoryStatistic } = useAppSelector((state: RootState) => state.storage);

    return (
        <Container>
            {chosenCategoryStatistic ?
                <IconInner>
                    <img src={chosenCategoryStatistic[0].icon} alt="" />
                </IconInner> 
                : <span>{title}</span>}
        </Container>
    )
}