import { FC, useEffect } from "react";
import { SubBar } from "../../shared/subBar/subBar";
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