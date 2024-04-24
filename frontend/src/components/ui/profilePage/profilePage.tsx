import { FC, useEffect } from "react";
import { SubBar } from "./components/subBar/subBar";
import { blockPreviousPage } from "../../../utils/blockPreviousPage";

export const ProfilePage: FC = () => {
    useEffect(() => {
        blockPreviousPage()
    }, []);

    return (
        <>
            <SubBar />
        </>
    )
}