import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { changeUserData, getDataFromUserStore } from "../../../../../api/userDataApi/userDataApi";
import { CategoriesExpensesType } from "../../../../../api/userDataApi/styledUserDataApi";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { Cross } from "./components/cross/cross";
import { CategoryName } from "./components/categoryName/categoryName";
import { Icon } from "./components/icon/icon";
import { Item, List } from "./styledCategories";

interface CategoriesProps {
    categoriesList: Array<CategoriesExpensesType> | null;
    setChoosedCategory: (value: string) => void;
    getUserDataFromStorage: () => void;
    setIsEnteringModalActive: (value: boolean) => void;
    getAlert: (value: AlertComponentProps) => void;
    dataKey: string;
}

export const Categories: FC<CategoriesProps> = ({
    categoriesList,
    setChoosedCategory,
    getUserDataFromStorage,
    setIsEnteringModalActive,
    dataKey,
    getAlert }) => {
    const [showDeleteIcons, setShowDeleteIcons] = useState<Array<boolean>>([]);
    let holdTimer: NodeJS.Timeout;

    const handleMouseDown = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        if ((event.target as HTMLElement).classList.contains("item-btn")) return;
        event.currentTarget.classList.add("shake-horizontal");

        holdTimer = setTimeout(() => {
            setShowDeleteIcons([]);
            setShowDeleteIcons(prevState => {
                const newShowDeleteIcons = [...prevState];
                newShowDeleteIcons[index] = true;
                return newShowDeleteIcons;
            });
        }, 1000);
    };

    const handleMouseUp = () => clearTimeout(holdTimer);

    const openEnteringExpensesModal = (event: React.MouseEvent<HTMLLIElement>) => {
        if(!(event.target as HTMLElement).classList.contains("item-btn")) {
            const category = (event.currentTarget as HTMLLIElement).children[1].children[0].textContent;
            category && setChoosedCategory(category);
            setIsEnteringModalActive(true);
        }
    }

    useEffect(() => {
        const deleteCategory = async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
    
            if (target.classList.contains("item-btn")) {
                const token = getDataFromLocalStorage("token");
                const userDataFromStorage = await getDataFromUserStore(token);
                const categoryName = target.previousElementSibling?.children[0].textContent;
                const categoriesExpenses: Array<any> = userDataFromStorage.data[dataKey];
                const updatedUserData = categoriesExpenses.filter((item) => item.name !== categoryName);
    
                try {
                    userDataFromStorage.data[dataKey] = [...updatedUserData];
                    await changeUserData(token, userDataFromStorage);
                    getAlert({ type: "success", text: "Category deleted successfully" });
                    getUserDataFromStorage();
                    setShowDeleteIcons([]);
                } catch (error) {
                    getAlert({ type: "warning", text: "Please try again later." });
                    console.error(error);
                }
            } else {
                setShowDeleteIcons([]);
            }
        }

        showDeleteIcons.length > 0 &&
            window.addEventListener("click", deleteCategory);

        return () => {
            window.removeEventListener("click", deleteCategory);
        };
    }, [showDeleteIcons]);

    return (
        <List>
            {categoriesList && categoriesList.map((category: any, index: number) => (
                <Item
                    key={uuidV4()}
                    onMouseDown={(event) => handleMouseDown(event, index)}
                    onMouseUp={handleMouseUp}
                    onClick={openEnteringExpensesModal}>
                    <Icon name={category.name} icon={category.icon} />
                    <CategoryName name={category.name} />
                    {showDeleteIcons[index] && (<Cross />)}
                </Item>
            ))}
        </List>
    )
}