import { FC, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/store/store";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { getDayAmount } from "../../../../../utils/getDayAmount";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Container, Sum, Title } from "./styledHeading";

export const Heading: FC = () => {
    const [dayExpenses, setDayExpenses] = useState<string | null>(null);
    const { storageData, currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    useEffect(() => {
        if (storageData && currency) {
            getDayAmount(storageData, 'expenses', setDayExpenses, currency.code);
        }
    }, [storageData]);

    return (
        <Container>
            <Title themestyles={themeContext.themeStyles}>
                <h2>Day expenses</h2>
            </Title>
            <Sum themestyles={themeContext.themeStyles}>
                <span>{dayExpenses ? dayExpenses : "0"}</span>
            </Sum>
        </Container>
    )
}