import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "./styledItem";
interface ItemProps {
    image: string;
    isAtiveBar: boolean;
    altText: string;
    linkTo: string;
    text: string;
}

export const Item: FC<ItemProps> = ({ image, altText, isAtiveBar, linkTo, text }) => {
    return (
        <Container>
            <NavLink
                className={({ isActive }) => (isActive ? 'nav__link_active' : 'nav__link')}
                to={linkTo}>
                <img src={image} alt={altText} />
                {isAtiveBar ?
                    <span>
                        {text}
                    </span>
                    : null}
            </NavLink>
        </Container>
    )
}