import { FC, useEffect, useState } from "react";
import { GREEN_LOGO, WHITE_LOGO } from "../../../consts/images";
import { Nav } from "./components/nav/nav";
import { Container, Section, Wrapper, Logo, BtnAuth } from "./styledHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getUserAuth } from "../../../utils/checkUserAuth";

export const Header: FC = () => {
    const [isActiveHeader, setIsActiveHeader] = useState<boolean>(false);
    const [isUserAuth, setIsUserAuth] = useState<boolean>(false);

    useEffect(() => {
        setIsUserAuth(getUserAuth());
    }, []);

    document.addEventListener("scroll", () => {
        window.scrollY === 0 ?
            setIsActiveHeader(false) :
            setIsActiveHeader(true);
    });

    return (
        <Section active_prop={isActiveHeader.toString()} >
            <Container>
                <Wrapper>
                    <Logo to={"/"}>
                        <img src={isActiveHeader ? WHITE_LOGO.default : GREEN_LOGO.default} alt="logo" />
                    </Logo>
                    <Nav isActiveHeader={isActiveHeader} />
                    <BtnAuth to={isUserAuth ? "/profile" : "/sign-up"} >
                        <FontAwesomeIcon 
                        icon={isUserAuth ? faUser : faUserPlus} 
                        color={isActiveHeader ? "#000" : "#fff"} 
                        size="lg" />
                    </BtnAuth>
                </Wrapper>
            </Container>
        </Section>
    )
}