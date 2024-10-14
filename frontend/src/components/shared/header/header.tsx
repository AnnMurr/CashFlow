import { FC, useEffect, useState } from "react";
import { LOGO_BLACK, LOGO_WHITE } from "../../../consts/images";
import { Nav } from "./components/nav/nav";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getUserAuth } from "../../../utils/checkUserAuth";
import { BurgerMenuBtn } from "./components/burgerMenuBtn/burgerMenuBtn";
import { SideBar } from "./components/sideBar/sideBar";
import { AuthBtn } from "./components/authBtn/authBtn";
import { Container, Section, Wrapper, Logo } from "./styledHeader";

export const Header: FC = () => {
    const [isActiveHeader, setIsActiveHeader] = useState<boolean>(false);
    const [isUserAuth, setIsUserAuth] = useState<boolean>(false);
    const [isBurderMenuActive, setIsBurderMenuActive] = useState<boolean>(false);
    const [isSideBarActive, setIsSideBarActive] = useState<boolean>(false);
    const windowWidth = window.innerWidth;

    useEffect(() => {
        setIsUserAuth(getUserAuth());
    }, []);

    useEffect(() => {
        setIsBurderMenuActive(windowWidth <= 600 ? true : false)
    }, [windowWidth]);

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
                    {isBurderMenuActive ? <BurgerMenuBtn setIsSideBarActive={setIsSideBarActive} color={isActiveHeader ? "#000" : "#fff"} /> : null}
                    <Nav isActiveHeader={isActiveHeader} />
                    {!isBurderMenuActive ?
                        <AuthBtn
                            icon={isUserAuth ? faUser : faUserPlus}
                            color={isActiveHeader ? "#000" : "#fff"}
                            isUserAuth={isUserAuth} /> : null}
                </Wrapper>
                {isSideBarActive ?
                    <SideBar
                        backgroundColor={isActiveHeader ? "#fff" : "#000"}
                        LinkColor={isActiveHeader ? "#000" : "#fff"}
                        closeSideBar={() => setIsSideBarActive(false)}
                        isUserAuth={isUserAuth} /> : null}
            </Container>
        </Section>
    )
}