import { FC } from "react";
import { Inner } from "./styledName";

interface NameProps {
    text: string;
}

export const Name: FC<NameProps> = ({ text }) => {
    return (
        <Inner>
            <span>
                {text}
            </span>
        </Inner>
    )
}