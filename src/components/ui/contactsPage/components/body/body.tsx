import { FC } from "react";
import { Title } from "./components/title/title";
import { Container, Heading, Link, Wrapper } from "./styledBody";

export const Body: FC = () => {
    return (
        <section>
            <Container>
                <Wrapper>
                    <Heading>
                        <h2>
                            Contacts
                        </h2>
                    </Heading>
                    <Title text={"Get in Touch"} />
                    <p>
                        If you have any questions, suggestions, or feedback, feel free to reach out to us. We are always ready to assist and respond to your inquiries.
                    </p>
                    <div>
                        <b>Email: </b><Link href="mailto:cashFlow@gmail.com">cashFlow@gmail.com</Link>
                    </div>
                    <div>
                        <b>Phone: </b><Link href="tel:+3701110101">+3701110101</Link>
                    </div>
                    <Title text={"Working Hours"} />
                    <p>We are available Monday through Friday from 9:00 AM to 6:00 PM local time.</p>
                    <Title text={"Partnership"} />
                    <p>If you have proposals for partnership or collaboration, please get in touch with us. We are interested in developing mutually beneficial partnerships.</p>
                    <Title text={"Feedback Form"} />
                    <p>You can also use the feedback form below to send us a message. We will endeavor to respond to you as soon as possible.</p>
                </Wrapper>
            </Container>
        </section>
    )
}