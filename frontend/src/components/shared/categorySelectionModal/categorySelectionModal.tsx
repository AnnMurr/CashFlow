import { FC, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { ButtonComponent } from "../../shared/button/button";
import { getDataFromLocalStorage } from "../../../storage/localStorage/localStorage";
import { changeUserData, getDataFromUserStore } from "../../../api/userDataApi/userDataApi";
import { AlertComponentProps } from "../../shared/alert/alert";
import { BtnClose } from "../../shared/btnClose/btnClose";
import { BtnInner, CloseBtnInner, Container, Input, InputInner, Item, Label, List, Wrapper } from "./styledCategorySelectionModal";

interface CategorySelectionModalProps {
    togleModal: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    getUserDataFromStorage: () => void;
    iconsCollection: Array<string>;
    dataKey: string;
}

export const CategorySelectionModal: FC<CategorySelectionModalProps> = ({
    togleModal, setIsAlertActive, getUserDataFromStorage, iconsCollection, dataKey
}) => {
    const [selectedIcon, setSelectedIcon] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [category, setCategory] = useState<string>("");

    const selectCategoryIcon = (index: number) => {
        setSelectedIcon(iconsCollection[index]);
        setSelectedItem(index);
    }

    const addCategory = async () => {
        const token: string = getDataFromLocalStorage("token");
        const userDataFromStorage = await getDataFromUserStore(token);
        const categories = userDataFromStorage.data[dataKey];
        const checkExistCategory = categories.find((item: any) => 
        item.name.toLowerCase().trim() === category.toLowerCase().trim());
        const onlySpacesRegex = /^\s+$/;

        if (checkExistCategory === undefined) {
            if (category.length > 0 && selectedIcon && !onlySpacesRegex.test(category)) {
                categories.push({ name: category.trim(), icon: selectedIcon });

                try {
                    const userDataAfterUpdate = await changeUserData(token, userDataFromStorage);

                    if (userDataAfterUpdate) {
                        getAlert({ type: "success", text: "Category added successfully" })
                        getUserDataFromStorage();
                        togleModal(false);
                    }
                } catch (error) {
                    getAlert({ type: "warning", text: "Please try again later." })
                    console.error(error);
                }
            } else {
                getAlert({ type: "error", text: "Enter category and choose an icon" })
            }
        } else {
            getAlert({ type: "error", text: "This category has already existed" });
        }
    }

    const getAlert = (data: AlertComponentProps) => {
        setIsAlertActive({ type: data.type, text: data.text });
        setTimeout(() => setIsAlertActive(null), 3000);
    }

    const closeModal = () => togleModal(false);

    return (
        <Container>
            <Wrapper>
                <CloseBtnInner>
                    <BtnClose func={closeModal} />
                </CloseBtnInner>
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