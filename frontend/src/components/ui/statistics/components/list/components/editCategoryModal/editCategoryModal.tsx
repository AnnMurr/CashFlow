import { ChangeEvent, FC, useEffect, useState } from "react";
import { OutlinedInput } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/store/store";
import { RootState, Transaction, UserStorageDataType } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { BtnClose } from "../../../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { MultipleSelectPlaceholder } from "../../../../../../shared/select/select";
import { VALID_SUM_REGEX } from "../../../../../../../consts/index";
import { getDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { changeUserData } from "../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { getAlert } from "../../../../../../../utils/getAlert";
import { addScroll } from "../../../../../../../utils/toggleScroll";
import { BtnCloseInner, BtnInner, Container, Label, Wrapper } from "./styledEditCategoryModal";
interface EditCategoryModalProps {
    choosedCategoryId: string | null;
    closeEditCategoryModal: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    getDataDataForStatistic: () => void;
}

export const EditCategoryModal: FC<EditCategoryModalProps> = ({
    choosedCategoryId, closeEditCategoryModal, setIsAlertActive, getDataDataForStatistic }) => {
    const [categoryData, setCategoryData] = useState<null | Transaction>(null);
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryNameError, setCategoryNameError] = useState<boolean>(false);
    const [categorySum, setCategorySum] = useState<string>("");
    const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const { storageData, typesOfCategories, transactions } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        if (+categorySum !== categoryData?.sum || categoryName !== categoryData.category) {
            setIsDisabledBtn(false)
        } else {
            setIsDisabledBtn(true)
        }
    }, [categorySum, categoryName]);

    useEffect(() => {
        const getCategoryData = () => {
            const currentCategory = transactions && transactions.find(item => item.uid === choosedCategoryId);

            if (currentCategory) {
                setCategoryData(currentCategory);
                currentCategory && setCategoryName(currentCategory?.category);
                currentCategory && setCategorySum(currentCategory?.sum.toString());
            }
        }

        getCategoryData();
    }, []);

    const saveChanges = async () => {
        const sum = categorySum.toString().replace(/[^\d.,]/g, '').replace(',', '.');

        if (!VALID_SUM_REGEX.test(sum)) {
            getAlert({ type: "error", text: "Invalid input" }, setIsAlertActive, 3000);
            setCategoryNameError(true);
        } else {
            try {
                const token = getDataFromLocalStorage("token");
                const storageDataCopy: UserStorageDataType = JSON.parse(JSON.stringify(storageData));
                let newData = null;

                if (storageDataCopy && categoryData) {
                    const icon = typesOfCategories && typesOfCategories[categoryData?.type].find(item => item.name === categoryName)?.icon;

                    storageDataCopy.data[categoryData?.type].forEach(element => {
                        if (element.uid === categoryData?.uid) {
                            newData = {
                                ...element,
                                icon: icon ? icon : element.icon,
                                sum: parseFloat(sum),
                                category: categoryName
                            }
                        }
                    });

                    storageDataCopy.data[categoryData?.type] = storageDataCopy.data[categoryData?.type].filter(element => element.uid !== categoryData?.uid)
                    newData && storageDataCopy.data[categoryData?.type].push(newData);

                    const changeUserDataResponse = (await dispatch(changeUserData({ userToken: token, updatedData: storageDataCopy }))).payload

                    if (changeUserDataResponse) {
                        getAlert({ type: "success", text: "Data updated successfully" }, setIsAlertActive, 3000);
                        closeEditCategoryModal(false);
                        addScroll();
                        getDataDataForStatistic();
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleSum = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        setCategorySum(target.value.trimStart());
    }

    return (
        <Container>
            <Wrapper>
                <BtnCloseInner>
                    <BtnClose func={() => {
                        closeEditCategoryModal(false);
                        addScroll();
                    }} />
                </BtnCloseInner>
                <div>
                    <Label>Category</Label>
                    {(typesOfCategories && categoryData) &&
                        <MultipleSelectPlaceholder
                            setCategoryName={setCategoryName}
                            categoryName={categoryName}
                            names={typesOfCategories[categoryData?.type]} />}
                </div>
                <div>
                    <Label>Sum</Label>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            marginTop: "10px",
                            width: "100%",
                            fontSize: "14px"
                        }}
                        inputProps={{ maxLength: 10 }}
                        error={categoryNameError}
                        value={categorySum}
                        onChange={handleSum}
                        size="small"
                        placeholder="Sum" />
                </div>
                <BtnInner>
                    <ButtonComponent
                        disabledValue={isDisabledBtn}
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Save"
                        color="#fff"
                        type="button"
                        func={saveChanges} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}