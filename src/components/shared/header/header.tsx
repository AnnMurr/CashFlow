import { FC, useState } from "react";
import { LOGO } from "../../../consts/images";
import { Nav } from "./components/nav/nav";
import { Container, Section, Wrapper, Logo } from "./styledHeader";

export const Header: FC = () => {
    const [isActiveHeader, setIsActiveHeader] = useState<boolean>(false)

    document.addEventListener("scroll", () => {
        window.scrollY === 0 ?
            setIsActiveHeader(false) :
            setIsActiveHeader(true)
    })

    return (
        <Section isActiveHeader={isActiveHeader} >
            <Container>
                <Wrapper>
                    <Logo>
                        <img src={LOGO.default} alt="logo" />
                    </Logo>
                    <Nav isActiveHeader={isActiveHeader} />
                </Wrapper>
            </Container>
        </Section>
    )
}