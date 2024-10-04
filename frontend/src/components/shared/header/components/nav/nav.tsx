import { FC } from "react";
import { List, Link, NavContainer } from "./styledNav";

interface NavType {
    isActiveHeader: boolean;
}

export const Nav: FC<NavType> = ({ isActiveHeader }) => {
    return (
        <NavContainer>
            <List>
                <li>
                    <Link active_prop={isActiveHeader.toString()} to="section_features" smooth={true} duration={500} spy={true} offset={-70}>
                        Features
                    </Link>
                </li>
                <li>
                    <Link active_prop={isActiveHeader.toString()} to="section_app" smooth={true} duration={500} spy={true} offset={-70}>
                        Application
                    </Link>
                </li>
                <li>
                    <Link active_prop={isActiveHeader.toString()} to="section_help-center" smooth={true} duration={500} spy={true} offset={-70}>
                        Help Center
                    </Link>
                </li>
            </List>
        </NavContainer>
    )
}