import { FC, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/store/store";
import { setDayAmount } from "../../../../../utils/setDayAmount";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Container, Sum, Title } from "./styledHeading";

export const Heading: FC = () => {
    const [dayIncome, setDayIncome] = useState<string | null>(null);
    const { storageData, currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    useEffect(() => {
        if (storageData && currency) {
            setDayAmount(storageData, 'income', setDayIncome, currency.code);
        }
    }, [storageData]);

    return (
        <Container>
            <Title themestyles={themeContext.themeStyles}>
                <h2>Day Income</h2>
            </Title>
            <Sum themestyles={themeContext.themeStyles}>
                <span>{dayIncome ? dayIncome : "0"}</span>
            </Sum>
        </Container>
    )
}