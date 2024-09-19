import { FC } from "react";
import { Heading } from "./components/heading/heading";
import { RightBlock } from "./components/rightBlock/rightBlock";
import { Container, Wrapper } from "./styledHelpCenterSection";

export const HelpCenterPage: FC = () => {
    return (
        <section id="section_help-center" >
            <Container>
                <Wrapper>
                    <Heading />
                    <div style={{ display: "flex" }}>
                        <div>
                            <RightBlock />
                        </div>
                    </div>
                </Wrapper>
            </Container>
        </section>
    )
}