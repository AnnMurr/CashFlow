import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Category, Container, Value } from "./styledItem";

interface ItemProps {
    value?: string;
    category: string;
}

export const Item: FC<ItemProps> = ({ value, category }) => {
    return (
        <Container>
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
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </Container>
    )
}