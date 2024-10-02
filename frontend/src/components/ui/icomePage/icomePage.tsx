import { FC } from "react";
import { ICONS_INCOME_COLLECTION } from "../../../consts/images";
import { Body, FinancialManagementPanel, Heading, SubBar } from ".";
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