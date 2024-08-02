import { FC } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { FinancialManagementPanel } from "../../shared/financialManagementPanel/financialManagementPanel";
import { ICONS_INCOME_COLLECTION } from "../../../consts/images";
import { Heading } from "./components/heading/heading";
import { Body } from "../../shared/body/body";
import { Container, Wrapper } from "./styledIcomePage";

export const IcomePage: FC = () => {
    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <Heading />
                        <FinancialManagementPanel iconsCollection={ICONS_INCOME_COLLECTION} type={"income"} dataKey={"categoriesIncome"} />
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}