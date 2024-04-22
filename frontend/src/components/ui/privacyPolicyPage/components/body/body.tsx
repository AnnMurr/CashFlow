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
                            Privacy Policy
                        </h2>
                    </Heading>
                    <p>
                        Last Updated: 17.04.2024
                    </p>
                    <p>
                        We, Cash Flow, value your trust in us. This Privacy Policy explains how we collect, use, process, and protect your personal information in connection with your use of our website and all related services.
                    </p>
                    <Title text={"Information We Collect"} />
                    <p>
                        We may collect various types of information about you, including, but not limited to:
                    </p>
                    <ul>
                        <li>Information you provide to us directly, such as your name, email address, phone number, and other contact details.</li>
                        <li>Information we automatically collect when you use our services, including data about your device, your IP address, browser, browsing history, and other data about your activity on the site.</li>
                    </ul>
                    <Title text={"Use of Information"} />
                    <p>
                        We use the collected information for the following purposes:
                    </p>
                    <ul>
                        <li>Providing and supporting the services you request.</li>
                        <li>Analyzing the usage of our website and improving its quality and functionality.</li>
                        <li>Providing you with personalized content and advertising.</li>
                        <li>Ensuring the security of our website and protecting the rights and interests of our users and company.</li>
                    </ul>
                    <Title text={"Sharing of Information"} />
                    <p>
                        We do not sell, rent, or disclose your personal information to third parties without your consent, except as required by law or described in this Privacy Policy.
                    </p>
                    <Title text={"Protection of Information"} />
                    <p>
                        We take all reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, we cannot guarantee the absolute security of data transmission over the internet.
                    </p>
                    <Title text={"Your Rights"} />
                    <p>
                        You have the right to request access to your personal information, to correct it, delete it, or restrict its processing. You may also withdraw your consent to the processing of your information or object to its use for marketing purposes at any time.
                    </p>
                    <Title text={"hanges to the Privacy Policy"} />
                    <p>We reserve the right to periodically update or modify this Privacy Policy. Any changes will be posted on this page with the date of the last update. We recommend that you check this page periodically for changes.</p>
                </Wrapper>
            </Container>
        </section>
    )
}