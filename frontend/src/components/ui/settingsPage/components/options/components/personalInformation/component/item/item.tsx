import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Category, Container, Value, Wrapper } from "./styledItem";

interface ItemProps {
    value?: string;
    category: string;
    link: string;
}

export const Item: FC<ItemProps> = ({ value, category, link }) => {    
    return (
        <Container>
            <Wrapper  to={link} state={value}>
                <div>
                    <Category>
                        {category}
                    </Category>
                </div>
                <div>
                    <Value>
                        {value && value}
                    </Value>
                </div>
                <div>
                    <FontAwesomeIcon color="#000" icon={faArrowRight} />
                </div>
            </Wrapper>
        </Container>
    )
}