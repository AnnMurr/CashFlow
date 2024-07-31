import { FC, useContext } from "react";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Container, IconInner } from "./styledItemDay";
interface ItemDayProps {
    title: string;
}

export const ItemDay: FC<ItemDayProps> = ({ title }) => {
    const { chosenCategoryStatistic } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    
    return (
        <Container themestyles={themeContext.themeStyles}>
            {chosenCategoryStatistic ?
                <IconInner>
                    <img src={chosenCategoryStatistic[0].icon} alt="" />
                </IconInner> 
                : <span>{title}</span>}
        </Container>
    )
}