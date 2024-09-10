import { FC, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { v4 as uuidV4 } from "uuid";
import { useAppSelector } from "../../../../../redux/store/store";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { CategoryInputRow } from "./components/categoryInputRow/categoryInputRow.tsx";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { CategoryInputAddBtn } from "./components/categoryInputAddBtn/categoryInputAddBtn";
import { CompletedCategoryRow } from "./components/completedCategoryRow/completedCategoryRow";
import { SaveBtn } from "./components/saveBtn/saveBtn";
import { Heading } from "./components/heading/heading";

interface BudgetTableManagerProps {
  dateRange: string;
  setIsAlertActive: (value: AlertComponentProps | null) => void;
}

export const BudgetTableManager: FC<BudgetTableManagerProps> = ({ dateRange, setIsAlertActive }) => {
  const [isCategoryInputRow, setIsCategoryInputRow] = useState<boolean>(false);
  const [completedCategories, setCompletedCategories] = useState<Array<{ name: string; sum: string }>>([]);
  const { storageData } = useAppSelector((state: RootState) => state.storage);

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <Heading />
        <TableBody>
          {completedCategories.length > 0 && completedCategories.map(data => (
            <CompletedCategoryRow key={uuidV4()} data={data} />
          ))}
          {isCategoryInputRow && storageData && (
            <CategoryInputRow
              setIsAlertActive={setIsAlertActive}
              setCompletedCategories={setCompletedCategories}
              setIsCategoryInputRow={setIsCategoryInputRow}
              storageData={storageData}
              completedCategories={completedCategories} />)}
          <CategoryInputAddBtn setIsCategoryInputRow={setIsCategoryInputRow} />
          <SaveBtn setIsAlertActive={setIsAlertActive} dateRange={dateRange} completedCategories={completedCategories} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}