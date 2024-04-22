import { FC } from "react";
import { Title } from "./components/title/title";
import { Container, Heading, Wrapper } from "./styledBody";

export const Body: FC = () => {
    return (
        <section>
            <Container>
                <Wrapper>
                    <Heading>
                        <h2>
                            About Us
                        </h2>
                    </Heading>
                    <p>
                        Cash Flow is a financial management and calculation app designed to help people manage their finances.
                    </p>
                    <Title text={"Our Mission"} />
                    <p>
                        We aim to provide our users with a simple, reliable, and convenient way to manage their finances. Our goal is to assist everyone in easily controlling their finances, planning their future, and achieving financial goals.
                    </p>
                    <Title text={"What We Do"} />
                    <p>
                        We develop innovative financial solutions, providing users with tools and features for effective income and expense tracking, budgeting, investment tracking, and much more. Our app empowers users with powerful analysis and reporting tools to help them make informed financial decisions.
                    </p>
                    <Title text={"Our Team"} />
                    <p>
                        We are a team of experienced developers, designers, and financial experts dedicated to continuously improving our product and providing a high level of service to our users. We take pride in creating a product that makes our customers' lives easier and better.
                    </p>
                    <Title text={"Partnership"} />
                    <p>
                        We are interested in establishing partnerships with other companies and organizations in the finance and technology sectors. If you are interested in collaborating with us, please contact us for more information.
                    </p>
                </Wrapper>
            </Container>
        </section>
    )
}