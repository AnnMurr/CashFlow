import { FC } from "react";
import { FAQs } from "./components/FAQs/FAQs";
import { Instraction } from "./components/instraction/instraction";
import { GoToRequest } from "./components/goToRequest/goToRequest";

export const HelpCenterPage: FC = () => {
    return (
        <>
            <Instraction />
            <FAQs />
            <GoToRequest />
        </>
    )
}