import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/store/store";
import { CategoryPlanning, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { MultipleSelectPlaceholder } from "../../../../shared/select/select";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { OutlinedInputComponent } from "../../../../../components/shared/outlinedInput/outlinedInput";
import { showAlert } from "../../../../../utils/showAlert";
import { VALID_SUM_REGEX } from "../../../../../consts";
import { BtnInner, Container, Label, Wrapper } from "./styledEditModal";

interface EditCategoryModalProps {
    setIsEditModalActive: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    choosenEditCategory: CategoryPlanning | null;
    completedCategories: Array<CategoryPlanning>;
    setCompletedCategories: (value: Array<CategoryPlanning>) => void;
}

export const EditModal: FC<EditCategoryModalProps> = ({
    setIsEditModalActive, setIsAlertActive, choosenEditCategory, completedCategories, setCompletedCategories }) => {
    const [categoryName, setCategoryName] = useState<string>("");
    const [categorySum, setCategorySum] = useState<string>("");
    const [categoryNameError, setCategoryNameError] = useState<boolean>(false);
    const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    const handleSum = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        setCategorySum(target.value.trimStart());
        setCategoryNameError(false);
    }

    const saveChanges = () => {
        const isCategoryExist = completedCategories.find(item => item.name === categoryName && choosenEditCategory?.name !== categoryName);
        const sum = categorySum.toString().replace(',', '.');

        if (isCategoryExist) {
            showAlert({ type: "error", text: "This category already exists" }, setIsAlertActive, 3000);
            return;
        }

        if (!VALID_SUM_REGEX.test(sum)) {
            showAlert({ type: "error", text: "Invalid input" }, setIsAlertActive, 3000);
            setCategoryNameError(true);
        } else {
            const updatedCategories = completedCategories.map(item => {
                if (item.name === choosenEditCategory?.name) {
                    return {
                        name: categoryName,
                        sum: +sum
                    }
                } else {
                    return item;
                }
            })
            setCompletedCategories(updatedCategories)
            setIsEditModalActive(false);
        }
    }

    useEffect(() => {
        if (choosenEditCategory) {
            setCategoryName(choosenEditCategory.name);
            setCategorySum(choosenEditCategory.sum.toString());
        }
    }, []);

    useEffect(() => {
        if (+categorySum !== choosenEditCategory?.sum || categoryName !== choosenEditCategory.name) {
            setIsDisabledBtn(false);
        } else {
            setIsDisabledBtn(true);
        }
    }, [categorySum, categoryName]);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{ marginLeft: "auto" }}
                    closeBlock={() => setIsEditModalActive(false)}
                    size="lg" />
                <div>
                    <Label themestyles={themeContext.themeStyles}>Category</Label>
                    {categoryName && storageData &&
                        <MultipleSelectPlaceholder
                            setCategoryName={setCategoryName}
                            categoryName={categoryName}
                            names={storageData.data.categoriesExpenses} />}
                </div>
                <div>
                    <Label themestyles={themeContext.themeStyles}>Sum</Label>
                    <OutlinedInputComponent
                        maxLengthNumber={10}
                        isError={categoryNameError}
                        value={categorySum}
                        handleChange={handleSum}
                        placeholderValue={"Sum"}
                        type="text" />
                </div>
                <BtnInner>
                    <ButtonComponent
                        disabledValue={isDisabledBtn}
                        text="Save"
                        color="#fff"
                        type="button"
                        func={saveChanges} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}