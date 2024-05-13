import { FC } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { FinancialManagementPanel } from "../../shared/financialManagementPanel/financialManagementPanel";
import { ICONS_EXPENSES_COLLECTION } from "../../../consts/images";
import { Heading } from "./components/heading/heading";
import { Container, Wrapper } from "./styledExpensesPage";

export const ExpensesPage: FC = () => {
    return (
        <section>
            <Container>
                <Wrapper>
                    <SubBar />
                    <Heading />
                    <FinancialManagementPanel iconsCollection={ICONS_EXPENSES_COLLECTION} type={"expenses"} dataKey={"categoriesExpenses"} />
                </Wrapper>
            </Container>
        </section>
    )
}