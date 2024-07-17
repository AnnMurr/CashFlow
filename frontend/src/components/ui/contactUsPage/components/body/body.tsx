import { FC, useState } from "react";
import { Form } from "./components/form/form";
import { ModalWindow } from "./components/modalWindow/modalWindow";
import { DarkBackground } from "../../../../shared/darkBackground/darkBackground";
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