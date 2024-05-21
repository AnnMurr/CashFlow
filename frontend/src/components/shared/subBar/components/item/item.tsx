import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "./styledItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface ItemProps {
    isAtiveBar: boolean;
    icon: any;
    linkTo: string;
    text: string;
}

export const Item: FC<ItemProps> = ({ icon, isAtiveBar, linkTo, text }) => {
    return (
        <Container>
            <NavLink
                className={({ isActive }) => (isActive ? 'nav__link_active' : 'nav__link')}
                to={linkTo}>
                <FontAwesomeIcon size="lg" color="#fff" icon={icon} />
                {isAtiveBar ?
                    <span>
                        {text}
                    </span>
                    : null}
            </NavLink>
        </Container>
    )
}