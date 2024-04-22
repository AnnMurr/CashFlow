import { FC } from "react";
import { BtnGoToMainPage } from "../../../../shared/btnGoToMainPage/btnGoToMainPage";
import { Container, Title, Wrapper } from "./styledInstraction";

export const Instraction: FC = () => {
    return (
        <section>
            <Container>
                <BtnGoToMainPage />
                <Wrapper>
                    <Title>
                        <h2>
                            Take Control of Your Finances with Cash Flow
                        </h2>
                    </Title>
                    <div>
                        <p>
                            Welcome to our financial management platform! Our website provides you with a convenient tool to take control of your finances, helping you track your expenses, plan budgets, and achieve your financial goals with ease. Our mission is to empower users to make informed financial decisions and attain financial stability.

                            With our platform, you can effortlessly manage your daily expenses and income, create personalized budgets, analyze your financial data using various analytical tools, and receive recommendations to optimize your spending and increase savings.

                            Featuring a user-friendly and intuitive interface, our website caters to both beginners in financial management and experienced users looking to enhance their financial skills. Whether you're saving for the future, paying off debts, or simply aiming to better manage your finances, our platform serves as your reliable partner in achieving your financial objectives.
                        </p>
                    </div>
                </Wrapper>
            </Container>
        </section>
    )
}