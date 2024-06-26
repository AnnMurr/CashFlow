import { FC, useEffect, useState } from "react";
import { OutlinedInput } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/store/store";
import { RootState, Transaction, UserStorageDataType } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { BtnClose } from "../../../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { MultipleSelectPlaceholder } from "./components/select/select";
import { INVALID_CHARS_REGEXP } from "../../../../../../../consts/index";
import { getDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { changeUserData } from "../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
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
            if (transactions) {
                const currentCategory = transactions.find(item => item.uid === choosedCategoryId);
                
                if (currentCategory) {
                    setCategoryData(currentCategory);
                    currentCategory && setCategoryName(currentCategory?.category);
                    currentCategory && setCategorySum(currentCategory?.sum.toString());
                }
            }
        }

        getCategoryData();
    }, []);

    const saveChanges = async () => {
        if (!INVALID_CHARS_REGEXP.test(categorySum) || categorySum === "0") {
            setIsAlertActive({ type: "error", text: "Invalid input" });
            setTimeout(() => setIsAlertActive(null), 2000);
            setCategoryNameError(true);
        } else {
            try {
                const token = getDataFromLocalStorage("token");
                const storageDataCopy: UserStorageDataType = JSON.parse(JSON.stringify(storageData))
                let newData = null

                if (storageDataCopy && categoryData) {
                    const icon = typesOfCategories && typesOfCategories[categoryData?.type].find(item => item.name === categoryName)?.icon;

                    storageDataCopy.data[categoryData?.type].forEach(element => {
                        if (element.uid === categoryData?.uid) {
                            newData = {
                                ...element,
                                icon: icon,
                                sum: +categorySum,
                                category: categoryName
                            }
                        }
                    });

                    storageDataCopy.data[categoryData?.type] = storageDataCopy.data[categoryData?.type].filter(element => element.uid !== categoryData?.uid)
                    newData && storageDataCopy.data[categoryData?.type].push(newData);

                    const changeUserDataResponse = (await dispatch(changeUserData({ userToken: token, updatedData: storageDataCopy }))).payload

                    if (changeUserDataResponse) {
                        setIsAlertActive({ type: "success", text: "Data updated successfully" });
                        setTimeout(() => setIsAlertActive(null), 2000);
                        closeEditCategoryModal(false);
                        getDataDataForStatistic();
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    console.log(typesOfCategories)
    console.log(categoryData)

    return (
        <Container>
            <Wrapper>
                <BtnCloseInner>
                    <BtnClose func={() => closeEditCategoryModal(false)} />
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
                    <Label>Value</Label>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            marginTop: "10px",
                            width: "100%",
                            fontSize: "14px"
                        }}
                        error={categoryNameError}
                        maxRows={20}
                        value={categorySum}
                        onChange={(event) => setCategorySum(event.target.value.trimStart())}
                        size="small"
                        placeholder="Name" />
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