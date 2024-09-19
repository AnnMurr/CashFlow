import { FC } from "react";
import { FAQs, GoToRequest, Instraction } from ".";

export const HelpCenterPage: FC = () => {
    return (
        <>
            <Instraction />
            <FAQs />
            <GoToRequest />
        </>
    )
}