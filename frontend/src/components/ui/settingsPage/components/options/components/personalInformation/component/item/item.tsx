import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Arrow, Category, Container, Value, Wrapper } from "./styledItem";

interface ItemProps {
    value?: string;
    category: string;
    link: string;
}

export const Item: FC<ItemProps> = ({ value, category, link }) => {
    return (
        <Container>
            <Wrapper to={link} >
                <div>
                    <Category>
                        {category}
                    </Category>
                </div>
                <div>
                    <Value>
                        {value && category === "Password" ? value.replaceAll(/\S/gi, "*") : value}
                    </Value>
                </div>
                <Arrow>
                    <FontAwesomeIcon color="#000" icon={faArrowRight} />
                </Arrow>
            </Wrapper>
        </Container>
    )
}