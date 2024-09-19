import { FC, useState } from "react";
import { DarkBackground, Form, ModalWindow } from ".";
import { Container, Heading, Wrapper } from "./styledBody";

export const Body: FC = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(false);

    return (
        <section>
            <Container>
                <Wrapper>
                    <Heading>
                        <h2>
                            Submit a request
                        </h2>
                    </Heading>
                    <Form setIsModalActive={setIsModalActive} />
                    {isModalActive ?
                        <>
                            <ModalWindow />
                            <DarkBackground
                                setIsModalActive={setIsModalActive}
                                isModalActive={isModalActive} />
                        </> : null}
                </Wrapper>
            </Container>
        </section>
    )
}