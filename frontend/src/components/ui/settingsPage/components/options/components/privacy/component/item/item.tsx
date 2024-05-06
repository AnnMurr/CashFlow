import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Container, SubTitle, Title, Wrapper } from "./styledItem";

interface ItemProps {
    title: string;
    subTitle: string;
    icon: any;
    link: string;
}

export const Item: FC<ItemProps> = ({ link, icon, title, subTitle }) => {
    return (
        <Container>
            <Wrapper to={link}>
                <div>
                    <FontAwesomeIcon icon={icon} color="#000" />
                </div>
                <Title>
                    <h4>
                        {title}
                    </h4>
                </Title>
                <SubTitle>
                    <h5>
                        {subTitle}
                    </h5>
                </SubTitle>
                <div>
                    <FontAwesomeIcon color="#000" icon={faArrowRight} />
                </div>
            </Wrapper>
        </Container>
    )
}