import { FC } from "react";
import { LOGO } from "../../../consts/images";
import { Nav } from "./components/nav/nav";
import { Container, Section, Wrapper, Logo } from "./styledHeader";

export const Header: FC = () => {
    return (
        <Section>
            <Container>
                <Wrapper>
                    <Logo>
                        <img src={LOGO.default} alt="logo" />
                    </Logo>
                    <Nav />
                </Wrapper>
            </Container>
        </Section>
    )
}