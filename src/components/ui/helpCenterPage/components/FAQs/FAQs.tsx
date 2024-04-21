import { FC, useState } from "react";
import { Container, Title, Wrapper } from "./styledFAQs";
import { AccordionIcon } from "./components/accordionIcon/accordionIcon";

export const FAQs: FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <section>
            <Container>
                <Wrapper>
                    <Title>
                        <h2>FAQs</h2>
                    </Title>
                    <div>
                        <AccordionIcon
                            panelNumber={1}
                            expanded={expanded}
                            onChange={handleChange}
                            title={"How do I get started using your website for financial tracking?"}
                            text={"To get started, you need to sign up on our website. Once registered, you can create your profile and begin adding your financial data such as expenses, income, etc."}
                        />
                        <AccordionIcon
                            panelNumber={2}
                            expanded={expanded}
                            onChange={handleChange}
                            title={"Can I import data from other apps or services?"}
                            text={"Currently, our website doesn't offer data import functionality from other apps. However, we're working on this feature and plan to add it in future updates."}
                        />
                        <AccordionIcon
                            panelNumber={3}
                            expanded={expanded}
                            onChange={handleChange}
                            title={"How can I analyze my financial data on your website?"}
                            text={"We provide various data analysis tools including graphs, charts, and reports. You can analyze your expenses, income, trends, and more on the \"Analytics\" page."}
                        />
                        <AccordionIcon
                            panelNumber={4}
                            expanded={expanded}
                            onChange={handleChange}
                            title={"Can I use your website on mobile devices?"}
                            text={"Yes, our website is mobile-friendly and can be accessed and used on both computers and mobile devices. You can access your account and manage your finances anytime, anywhere."}
                        />
                        <AccordionIcon
                            panelNumber={5}
                            expanded={expanded}
                            onChange={handleChange}
                            title={"What should I do if I encounter issues or have questions not covered here?"}
                            text={"If you encounter issues or have questions not covered in the Help Center, please contact our support team. You can send us a message through the feedback form on the website or email us at cashFlow@gmail.com."}
                        />
                    </div>
                </Wrapper>
            </Container>
        </section>
    )
}