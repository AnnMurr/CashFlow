import { FC } from "react";
import { Container } from "./styledIcon";

interface IconProps {
    icon: string;
    name: string;
}

export const Icon: FC<IconProps> = ({ icon, name }) => {
    return (
        <Container>
            <img src={icon} alt={name} />
        </Container>
    )
}