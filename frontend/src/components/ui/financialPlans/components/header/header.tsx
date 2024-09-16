import { FC, MouseEvent } from "react";
import { BudgetPlanning } from "../../../../../redux/reducers/userStorageReduser/types";
import { v4 as uuidV4 } from "uuid";
import { Item, List } from "./styledHeader";

interface HeaderProps {
    budgetPlans: Array<BudgetPlanning> | null;
    currentPlan: BudgetPlanning | null;
    setCurrentTab: (value: number) => void;
}

export const Header: FC<HeaderProps> = ({ budgetPlans, currentPlan, setCurrentTab }) => {
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
                                borderBottom: currentPlan.period === data.period ? "1px solid black" : "none"
                            }}
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