import { FC } from "react";
import { Heading } from "./components/heading/heading";
import { Block } from "./components/block/block";
import { Container, Wrapper } from "./styledHelpCenterSection";

export const HelpCenterPage: FC = () => {
    return (
        <section id="section_help-center" >
            <Container>
                <Wrapper>
                    <Heading />
                    <Block />
                </Wrapper>
            </Container>
        </section>
    )
}