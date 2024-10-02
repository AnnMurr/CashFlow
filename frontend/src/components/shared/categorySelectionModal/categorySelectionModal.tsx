import { FC, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { ButtonComponent } from "../../shared/button/button";
import { AlertComponentProps } from "../../shared/alert/alert";
import { BtnClose } from "../../shared/btnClose/btnClose";
import { getDataFromLocalStorage } from "../../../storage/localStorage/localStorage";
import { changeUserData, getDataFromUserStore } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { CategoriesType, StorageDataKeys, UserStorageDataType } from "../../../redux/reducers/userStorageReduser/types";
import { useAppDispatch } from "../../../redux/store/store";
import { showAlert } from "../../../utils/showAlert";
import { ONLY_SPACES_REGEX } from "../../../consts";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { BtnInner, Container, Input, InputInner, Item, Label, List, Wrapper } from "./styledCategorySelectionModal";

interface CategorySelectionModalProps {
    togleModal: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    getUserDataFromStorage: () => void;
    iconsCollection: Array<string>;
    dataKey: StorageDataKeys;
}

export const CategorySelectionModal: FC<CategorySelectionModalProps> = ({
    togleModal, setIsAlertActive, getUserDataFromStorage, iconsCollection, dataKey
}) => {
    const [selectedIcon, setSelectedIcon] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [category, setCategory] = useState<string>("");
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const dispatch = useAppDispatch();

    const selectCategoryIcon = (index: number) => {
        setSelectedIcon(iconsCollection[index]);
        setSelectedItem(index);
    }

    const addCategory = async () => {
        const token = getDataFromLocalStorage("token");
        const userDataFromStorage: UserStorageDataType = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;
        const categories = [...userDataFromStorage.data[dataKey]] as Array<CategoriesType>;
        const checkExistCategory = categories.find((item) =>
            item.name.toLowerCase().trim() === category.toLowerCase().trim());

        if (checkExistCategory === undefined) {
            if (category.length > 0 && selectedIcon && !ONLY_SPACES_REGEX.test(category)) {
                categories.push({ name: category.trim(), icon: selectedIcon });

                try {
                    const updatedData = {
                        ...userDataFromStorage,
                        data: {
                            ...userDataFromStorage.data,
                            [dataKey]: categories
                        }
                    }

                    const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

                    if (userDataAfterUpdate) {
                        showAlert({ type: "success", text: "Category added successfully" }, setIsAlertActive, 3000);
                        getUserDataFromStorage();
                        togleModal(false);
                    }
                } catch (error) {
                    showAlert({ type: "warning", text: "Please try again later." }, setIsAlertActive, 3000);
                    console.error(error);
                }
            } else {
                showAlert({ type: "error", text: "Enter category and choose an icon" }, setIsAlertActive, 3000);
            }
        } else {
            showAlert({ type: "error", text: "This category already exists" }, setIsAlertActive, 3000);
        }
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{
                        marginLeft: "auto",
                        marginBottom: "10px"
                    }}
                    closeBlock={togleModal}
                    size="lg" />
                <InputInner>
                    <Label themestyles={themeContext.themeStyles}>Category name</Label>
                    <Input
                        themestyles={themeContext.themeStyles}
                        value={category}
                        maxLength={20}
                        onChange={(event) => setCategory(event.target.value.trimStart())} type="text" />
                </InputInner>
                <List>
                    {iconsCollection.map((icon, index) => (
                        <Item selected={selectedItem === index ? true : false} key={uuidV4()}>
                            <button onClick={() => selectCategoryIcon(index)} type="button">
                                <img src={icon} alt="" />
                            </button>
                        </Item>
                    ))}
                </List>
                <BtnInner>
                    <ButtonComponent
                        text="Add"
                        color="#fff"
                        type="button"
                        func={addCategory} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}