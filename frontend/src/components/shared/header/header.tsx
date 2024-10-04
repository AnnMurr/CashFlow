import { FC, useEffect, useState } from "react";
import { LOGO_BLACK, LOGO_WHITE } from "../../../consts/images";
import { Nav } from "./components/nav/nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getUserAuth } from "../../../utils/checkUserAuth";
import { Container, Section, Wrapper, Logo, BtnAuth } from "./styledHeader";

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
                        <img src={isActiveHeader ? LOGO_BLACK.default : LOGO_WHITE.default} alt="logo" />
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