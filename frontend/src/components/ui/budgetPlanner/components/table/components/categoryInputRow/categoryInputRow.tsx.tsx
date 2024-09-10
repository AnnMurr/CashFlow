import { FC, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { OutlinedInputComponent } from "../../../../../../shared/outlinedInput/outlinedInput";
import { MultipleSelectPlaceholder } from "../../../../../../shared/select/select";
import { showAlert } from "../../../../../../../utils/showAlert";
import { VALID_SUM_REGEX } from "../../../../../../../consts";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { UserStorageDataType } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface CategoryInputRowProps {
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setCompletedCategories: (value: Array<{ name: string; sum: string }>) => void;
    setIsCategoryInputRow: (value: boolean) => void;
    storageData: UserStorageDataType;
    completedCategories: Array<{ name: string; sum: string }>;
}

export const CategoryInputRow: FC<CategoryInputRowProps> = ({
    setIsAlertActive, setCompletedCategories, setIsCategoryInputRow, storageData, completedCategories }) => {
    const [error, setError] = useState<boolean>(false);
    const [category, setCategory] = useState<string | null>(null);
    const [sum, setSum] = useState<string>("");

    const handleSaveCategory = () => {
        const sum2 = sum.toString().replace(',', '.');

        if (sum && category) {
            if (!VALID_SUM_REGEX.test(sum2)) {
                setError(true);
                showAlert({ type: "error", text: "Invalid sum" }, setIsAlertActive, 3000);
            } else if (completedCategories.find(item => item.name === category)) {
                showAlert({ type: "error", text: "This category already exists" }, setIsAlertActive, 3000);
            } else {
                setCompletedCategories([...completedCategories, { name: category, sum: parseFloat(sum).toString() }]);
                setIsCategoryInputRow(false);
                setError(false);
                setSum("");
                setCategory(null);
            }
        } else {
            showAlert({ type: "warning", text: "Enter category and sum" }, setIsAlertActive, 3000);
        }
    }

    return (
        <TableRow>
            <TableCell align="left" colSpan={1} sx={{ width: '25rem' }}>
                <MultipleSelectPlaceholder
                    setCategoryName={setCategory}
                    categoryName={category}
                    names={storageData?.data.categoriesExpenses}
                />
            </TableCell>
            <TableCell align="left" colSpan={1} sx={{ width: '30%' }} >
                <OutlinedInputComponent
                    isError={error}
                    value={sum}
                    placeholderValue={"Sum"}
                    type={"text"}
                    maxLengthNumber={30}
                    handleChange={(event) => setSum(event.target.value.trimStart())}
                />
            </TableCell>
            <TableCell colSpan={1} >
                <ButtonComponent
                    disabledValue={false}
                    text="Save"
                    color="#fff"
                    type="button"
                    func={handleSaveCategory}
                />
            </TableCell>
            <TableCell colSpan={1}  >
                <button onClick={() => setIsCategoryInputRow(false)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </TableCell>
        </TableRow>
    )
}