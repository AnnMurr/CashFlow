import { FC, useContext } from "react";
import { Table, TableContainer } from "@mui/material";
import Paper from '@mui/material/Paper';
import { BudgetPlanning, CategoryPlanning } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { BodyComponent, Footer, Head, Spinner } from ".";
import { SpinnerContainer } from "./styledFinancialPlansTable";

interface FinancialPlansTableProps {
    data: BudgetPlanning;
    setIsDeleteCategoryModal: (value: boolean) => void;
    setIsDeletePlanModal: (value: boolean) => void;
    setChoosenEditCategory: (value: CategoryPlanning | null) => void;
    setIsEditModalActive: (value: boolean) => void;
}

export const FinancialPlansTable: FC<FinancialPlansTableProps> = ({
    data, setIsDeleteCategoryModal, setChoosenEditCategory, setIsDeletePlanModal, setIsEditModalActive }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const handleOpenDeleteCategoryModal = (item: CategoryPlanning) => {
        setChoosenEditCategory({ name: item.name, sum: item.sum });
        setIsDeleteCategoryModal(true);
    }

    const handleOpenEditCategoryModal = (item: CategoryPlanning) => {
        setChoosenEditCategory({ name: item.name, sum: item.sum });
        setIsEditModalActive(true);
    }

    const tableContainerStyles = {
        backgroundColor: themeContext.themeStyles.budgetPlannerBackground,
    };

    return (
        <TableContainer sx={tableContainerStyles} component={Paper}>
            <Table>
                {data ?
                    (
                        <>
                            <Head setIsDeletePlanModal={setIsDeletePlanModal} data={data} />
                            <BodyComponent
                                handleOpenDeleteCategoryModal={handleOpenDeleteCategoryModal}
                                handleOpenEditCategoryModal={handleOpenEditCategoryModal}
                                data={data} />
                            <Footer data={data} />
                        </>
                    ) :
                    <SpinnerContainer>
                        <Spinner size={40} height={3} />
                    </SpinnerContainer>}
            </Table>
        </TableContainer>
    )
}