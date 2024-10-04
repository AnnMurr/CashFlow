import { FC } from "react";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthBtn } from "../authBtn/authBtn";
import { Link, List, Wrapper, Container } from "./styledSideBar";

interface SideBarProps {
    backgroundColor: string;
    LinkColor: string;
    isUserAuth: boolean;
    closeSideBar: () => void;
}

export const SideBar: FC<SideBarProps> = ({ backgroundColor, LinkColor, isUserAuth, closeSideBar }) => {
    return (
        <Container background={backgroundColor}>
            <Wrapper>
                <nav>
                    <List>
                        <li>
                            <Link color={LinkColor} onClick={closeSideBar} to="section_features" smooth={true} duration={500} spy={true} offset={-70}>
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link color={LinkColor} onClick={closeSideBar} to="section_app" smooth={true} duration={500} spy={true} offset={-70}>
                                Application
                            </Link>
                        </li>
                        <li>
                            <Link color={LinkColor} onClick={closeSideBar} to="section_help-center" smooth={true} duration={500} spy={true} offset={-70}>
                                Help Center
                            </Link>
                        </li>
                        <li>
                            <AuthBtn
                                icon={isUserAuth ? faUser : faUserPlus}
                                color={LinkColor}
                                isUserAuth={isUserAuth} />
                        </li>
                    </List>
                </nav>
            </Wrapper>
        </Container>
    )
}