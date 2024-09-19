import { FC } from "react";
import { ICONS_EXPENSES_COLLECTION } from "../../../consts/images";
import { Body, FinancialManagementPanel, Heading, SubBar } from ".";
import { Container, Wrapper } from "./styledExpensesPage";

export const ExpensesPage: FC = () => {
    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <Heading />
                        <FinancialManagementPanel iconsCollection={ICONS_EXPENSES_COLLECTION} type={"expenses"} dataKey={"categoriesExpenses"} />
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}