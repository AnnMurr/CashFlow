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
                    <Link active_prop={isActiveHeader.toString()} to={"/"}>Home</Link>
                </li>
                <li>
                    <Link active_prop={isActiveHeader.toString()} to={"/"}>Home</Link>
                </li>
                <li>
                    <Link active_prop={isActiveHeader.toString()} to={"/"}>Home</Link>
                </li>
            </List>
        </nav>
    )
}