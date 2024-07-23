import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/store/store";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { Loading } from "../../../../shared/loading/loading";
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
        dayExpenses ?  
        <Container>
            <Title>
                <h2>Day expenses</h2>
            </Title>
            <Sum>
                <span>{dayExpenses}$</span>
            </Sum>
        </Container> : 
        <Loading size={40} height={3} />
    )
}