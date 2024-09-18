import { FC, useContext, useEffect } from "react";
import { Table, TableContainer } from "@mui/material";
import Paper from '@mui/material/Paper';
import { BudgetPlanning, CategoryPlanning } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Head } from "./components/head/head";
import { BodyComponent } from "./components/body/body";
import { Footer } from "./components/footer/footer";
import { Spinner } from "../../../../shared/spinner/spinner";
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

    useEffect(() => {
        console.log("render")
    }, []);

    return (
        <TableContainer sx={{ backgroundColor: themeContext.themeStyles.budgetPlannerBackground }} component={Paper}>
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