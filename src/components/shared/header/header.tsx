import { FC, useState } from "react";
import { LOGO } from "../../../consts/images";
import { Nav } from "./components/nav/nav";
import { Container, Section, Wrapper, Logo, BtnAuth } from "./styledHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export const Header: FC = () => {
    const [isActiveHeader, setIsActiveHeader] = useState<boolean>(false);

    document.addEventListener("scroll", () => {
        window.scrollY === 0 ?
            setIsActiveHeader(false) :
            setIsActiveHeader(true)
    });

    return (
        <Section active_prop={isActiveHeader.toString()} >
            <Container>
                <Wrapper>
                    <Logo>
                        <img src={LOGO.default} alt="logo" />
                    </Logo>
                    <Nav isActiveHeader={isActiveHeader} />
                    <BtnAuth to={"/login"} >
                        <FontAwesomeIcon icon={faUserPlus} color="#0f4a34" size="lg" />
                    </BtnAuth>
                </Wrapper>
            </Container>
        </Section>
    )
}