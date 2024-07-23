import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/store/store";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { getDayAmount } from "../../../../../utils/getDayAmount";
import { Container, Sum, Title } from "./styledHeading";

export const Heading: FC = () => {
    const [dayExpenses, setDayExpenses] = useState<string | null>(null);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        if (storageData) {
            getDayAmount(storageData, 'expenses', setDayExpenses)
        }
    }, [storageData]);

    return (
        <Container>
            <Title>
                <h2>Day expenses</h2>
            </Title>
            <Sum>
                <span>{dayExpenses ? dayExpenses : "0"}$</span>
            </Sum>
        </Container>
    )
}