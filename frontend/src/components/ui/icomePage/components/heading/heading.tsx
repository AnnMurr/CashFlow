import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/store/store";
import { getDayAmount } from "../../../../../utils/getDayAmount";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { Container, Sum, Title } from "./styledHeading";

export const Heading: FC = () => {
    const [dayIncome, setDayIncome] = useState<string | null>(null);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        if (storageData) {
            getDayAmount(storageData, 'income', setDayIncome)
        }
    }, [storageData]);

    return (
        <Container>
            <Title>
                <h2>Day Income</h2>
            </Title>
            <Sum>
                <span>{dayIncome ? dayIncome : "0"}$</span>
            </Sum>
        </Container>
    )
}