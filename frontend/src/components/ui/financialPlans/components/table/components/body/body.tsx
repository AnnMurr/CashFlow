import { FC } from "react";
import { v4 as uuidV4 } from "uuid";
import { TableBody } from "@mui/material";
import { BudgetPlanning, CategoryPlanning } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { CategoryRow } from "./components/сategoryRow/сategoryRow";

interface BodyComponentProps {
    data: BudgetPlanning;
    handleOpenDeleteCategoryModal: (value: CategoryPlanning) => void;
    handleOpenEditCategoryModal: (value: CategoryPlanning) => void;
}

export const BodyComponent: FC<BodyComponentProps> = ({
    data, handleOpenDeleteCategoryModal, handleOpenEditCategoryModal }) => {

    return (
        <TableBody>
            {data && data.categories.map(item => (
                <CategoryRow
                    key={uuidV4()}
                    data={item}
                    handleOpenEditCategoryModal={handleOpenEditCategoryModal}
                    handleOpenDeleteCategoryModal={handleOpenDeleteCategoryModal} />
            ))}
        </TableBody>
    )
}