import { FC } from "react";
import { Inner } from "./styledTitle";

export const Title: FC = () => {
    return (
        <Inner>
            <h3>
                You currently have no data.
                Start by adding your financial information to see statistics here.
            </h3>
        </Inner>
    )
}