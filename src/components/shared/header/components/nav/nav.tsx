import { FC } from "react";
import { List, Link } from "./styledNav";

export const Nav: FC = () => {
    return (
        <nav>
            <List>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
            </List>
        </nav>
    )
}