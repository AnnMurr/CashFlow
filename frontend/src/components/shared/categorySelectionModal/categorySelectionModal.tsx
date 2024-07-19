import { FC, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { ButtonComponent } from "../../shared/button/button";
import { getDataFromLocalStorage } from "../../../storage/localStorage/localStorage";
import { AlertComponentProps } from "../../shared/alert/alert";
import { BtnClose } from "../../shared/btnClose/btnClose";
import { changeUserData, getDataFromUserStore } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { CategoriesType, StorageDataKeys, UserStorageDataType } from "../../../redux/reducers/userStorageReduser/types";
import { useAppDispatch } from "../../../redux/store/store";
import { getAlert } from "../../../utils/getAlert";
import { ONLY_SPACES_REGEX } from "../../../consts";
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
                        getAlert({ type: "success", text: "Category added successfully" }, setIsAlertActive, 3000);
                        getUserDataFromStorage();
                        togleModal(false);
                    }
                } catch (error) {
                    getAlert({ type: "warning", text: "Please try again later." }, setIsAlertActive, 3000);
                    console.error(error);
                }
            } else {
                getAlert({ type: "error", text: "Enter category and choose an icon" }, setIsAlertActive, 3000);
            }
        } else {
            getAlert({ type: "error", text: "This category already exists" }, setIsAlertActive, 3000);
        }
    }

    return (
        <Container>
            <Wrapper>
                    <BtnClose
                        btnInnerstyles={{
                            marginLeft: "auto",
                            marginBottom: "10px"
                        }}
                        closeBlock={togleModal}
                        size="lg" color="#000" />
                <InputInner>
                    <Label>Category name</Label>
                    <Input
                        value={category}
                        maxLength={20}
                        onChange={(event) => setCategory(event.target.value.trimStart())} type="text" />
                </InputInner>
                <List>
                    {iconsCollection.slice(0, 9).map((icon, index) => (
                        <Item selected={selectedItem === index ? true : false} key={uuidV4()}>
                            <button onClick={() => selectCategoryIcon(index)} type="button">
                                <img src={icon} alt="" />
                            </button>
                        </Item>
                    ))}
                </List>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Add"
                        color="#fff"
                        type="button"
                        func={addCategory} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}