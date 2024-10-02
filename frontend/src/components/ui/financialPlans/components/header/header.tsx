import { FC, MouseEvent, useContext } from "react";
import { BudgetPlanning } from "../../../../../redux/reducers/userStorageReduser/types";
import { v4 as uuidV4 } from "uuid";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Item, List } from "./styledHeader";

interface HeaderProps {
    budgetPlans: Array<BudgetPlanning> | null;
    currentPlan: BudgetPlanning | null;
    setCurrentTab: (value: number) => void;
}

export const Header: FC<HeaderProps> = ({ budgetPlans, currentPlan, setCurrentTab }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const handlePlanClick = (event: MouseEvent<HTMLButtonElement>) => {
        const planPeriod = event.currentTarget.dataset.name;

        budgetPlans?.forEach((item, index) => {
            item.period === planPeriod && setCurrentTab(index);
        });
    }

    return (
        <List>
            {budgetPlans && currentPlan &&
                budgetPlans.map(data => (
                    <li
                        style={{ padding: "0 5px" }}
                        key={uuidV4()}>
                        <Item
                            style={{
                                backgroundColor: currentPlan.period === data.period ?
                                themeContext.themeStyles.settingsTabBtnSelected
                                    : "none"
                            }}
                            themestyles={themeContext.themeStyles}
                            type="button"
                            data-name={data.period}
                            onClick={handlePlanClick}>
                            {data.period}
                        </Item>
                    </li>
                ))}
        </List>
    )
}