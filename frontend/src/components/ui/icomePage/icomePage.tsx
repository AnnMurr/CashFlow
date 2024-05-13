import { FC } from "react";
import { Container, Wrapper } from "./styledIcomePage";
import { SubBar } from "../../shared/subBar/subBar";
import { FinancialManagementPanel } from "../../shared/financialManagementPanel/financialManagementPanel";
import { ICONS_INCOME_COLLECTION } from "../../../consts/images";
import { Heading } from "./components/heading/heading";

export const IcomePage: FC = () => {
    return (
        <section>
            <Container>
                <Wrapper>
                    <SubBar />
                    <Heading />
                    <FinancialManagementPanel iconsCollection={ICONS_INCOME_COLLECTION} type={"income"} dataKey={"categoriesIncome"} />
                </Wrapper>
            </Container>
        </section>
    )
}