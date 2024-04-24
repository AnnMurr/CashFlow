import { FC } from "react";
import { StyledLink, Container } from "./styledItem";

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
            <StyledLink to={linkTo}>
                <img src={image} alt={altText} />
                {isAtiveBar ?
                    <span>
                        {text}
                    </span>
                    : null}
            </StyledLink>
        </Container>
    )
}