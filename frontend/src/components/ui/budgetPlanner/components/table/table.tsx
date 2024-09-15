import { FC, useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { v4 as uuidV4 } from "uuid";
import { useAppSelector } from "../../../../../redux/store/store";
import { CategoriesType, CategoryPlanning, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { CategoryInputRow } from "./components/categoryInputRow/categoryInputRow.tsx";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { CategoryInputAddBtn } from "./components/categoryInputAddBtn/categoryInputAddBtn";
import { CompletedCategoryRow } from "./components/completedCategoryRow/completedCategoryRow";
import { SaveBtn } from "./components/saveBtn/saveBtn";
import { Heading } from "./components/heading/heading";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";

interface BudgetTableManagerProps {
  dateRange: string;
  setIsAlertActive: (value: AlertComponentProps | null) => void;
  setIsEditModalActive: (value: boolean) => void;
  setIsDeleteCategoryModal: (value: boolean) => void;
  setChoosenEditCategory: (value: CategoryPlanning | null) => void;
  completedCategories: Array<CategoryPlanning>;
  setCompletedCategories: (value: Array<CategoryPlanning>) => void;
  availableCategories: Array<CategoriesType>;
  setAvailableCategories: (value: Array<CategoriesType>) => void;
}

export const BudgetTableManager: FC<BudgetTableManagerProps> = ({
  dateRange,
  setIsAlertActive,
  setIsEditModalActive,
  setIsDeleteCategoryModal,
  setChoosenEditCategory,
  completedCategories,
  setCompletedCategories,
  availableCategories,
  setAvailableCategories
}) => {
  const [isCategoryInputRow, setIsCategoryInputRow] = useState<boolean>(false);
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState<boolean>(false);
  const { storageData } = useAppSelector((state: RootState) => state.storage);
  const themeContext = useContext<ThemeContextType>(ThemeContext);

  const tableContainerStyles = {
    backgroundColor: themeContext.themeStyles.budgetPlannerBackground,
    padding: "30px 40px 40px 40px"
  }

  useEffect(() => {
    if (storageData) {
      const filteredAvailableCategories = storageData?.data.categoriesExpenses.filter(item =>
        !completedCategories.find(c => c.name === item.name));
 
      setAvailableCategories(filteredAvailableCategories || []);
    }

  }, [completedCategories, storageData]);

  useEffect(() => {
    setIsAddBtnDisabled(!availableCategories.length);
  }, [availableCategories]);

  return (
    <TableContainer sx={tableContainerStyles} component={Paper}>
      <Table aria-label="simple table">
        <Heading />
        <TableBody>
          {completedCategories.length > 0 && completedCategories.map(data => (
            <CompletedCategoryRow
              setChoosenEditCategory={setChoosenEditCategory}
              setIsEditModalActive={setIsEditModalActive}
              setIsDeleteCategoryModal={setIsDeleteCategoryModal}
              key={uuidV4()}
              data={data} />
          ))}
          {isCategoryInputRow && storageData && (
            <CategoryInputRow
              setIsAlertActive={setIsAlertActive}
              setCompletedCategories={setCompletedCategories}
              setIsCategoryInputRow={setIsCategoryInputRow}
              completedCategories={completedCategories}
              availableCategories={availableCategories} />)}
          <CategoryInputAddBtn
            isDisabled={isAddBtnDisabled}
            setIsCategoryInputRow={setIsCategoryInputRow} />
          <SaveBtn
            setCompletedCategories={setCompletedCategories}
            setIsAlertActive={setIsAlertActive}
            dateRange={dateRange}
            completedCategories={completedCategories} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}