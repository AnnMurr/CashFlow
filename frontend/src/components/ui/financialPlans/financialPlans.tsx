import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Body } from "../../shared/body/body";
import { SubBar } from "../../shared/subBar/subBar";
import { FinancialPlansTable } from "./components/table/table";
import { Container, Tables, Wrapper } from "./styledFinancialPlans";
import { BudgetPlanning, RootState } from "../../../redux/reducers/userStorageReduser/types";
import { useAppSelector } from "../../../redux/store/store";

export const FinancialPlans: FC = () => {
    const [budgetPlans, setBudgetPlans] = useState<Array<BudgetPlanning> | null>(null);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        storageData && storageData?.data.planning.length &&
            setBudgetPlans(storageData?.data.planning)
    }, [storageData]);

    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <Tables>
                            {budgetPlans &&
                                budgetPlans.map(data => (
                                    <FinancialPlansTable key={uuidV4()} data={data} />
                                ))}
                        </Tables>
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}