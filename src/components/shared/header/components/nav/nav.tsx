import { FC } from "react";
import { List, Link } from "./styledNav";

interface NavType {
    isActiveHeader: boolean;
}

export const Nav: FC<NavType> = ({ isActiveHeader }) => {
    return (
        <nav>
            <List>
                <li>
                    <Link isActiveHeader={isActiveHeader}  to={"/"}>Home</Link>
                </li>
                <li>
                    <Link isActiveHeader={isActiveHeader}   to={"/"}>Home</Link>
                </li>
                <li>
                    <Link isActiveHeader={isActiveHeader}  to={"/"}>Home</Link>
                </li>
            </List>
        </nav>
    )
}