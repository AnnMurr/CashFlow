import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { AlertComponentProps } from "../../../alert/alert";
import { changeUserData, getDataFromUserStore } from "../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { useAppDispatch } from "../../../../../redux/store/store";
import { CategoriesType, CategoryKeys, UserStorageDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { showAlert } from "../../../../../utils/showAlert";
import { CategoryName, Cross, Icon, Spinner } from ".";
import { CrossBtnInner, Item, List } from "./styledCategories";

interface CategoriesProps {
    categoriesList: Array<CategoriesType> | null;
    setChoosedCategory: (value: { category: string, icon: string } | null) => void;
    getUserDataFromStorage: () => void;
    setIsEnteringModalActive: (value: boolean) => void;
    dataKey: CategoryKeys;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
}

export const Categories: FC<CategoriesProps> = ({
    categoriesList,
    setChoosedCategory,
    getUserDataFromStorage,
    setIsEnteringModalActive,
    dataKey,
    setIsAlertActive }) => {
    const [showDeleteIcons, setShowDeleteIcons] = useState<Array<boolean>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const windowWidth = window.innerWidth;
    const dispatch = useAppDispatch();
    let holdTimer: NodeJS.Timeout;

    const handleMouseDown = (event: React.TouchEvent<HTMLLIElement>, index: number) => {
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
        if (!(event.target as HTMLElement).classList.contains("item-btn")) {
            const category = (event.currentTarget as HTMLLIElement).children[1].children[0].textContent;
            const icon = (event.currentTarget as HTMLLIElement).children[0].children[0].getAttribute("src");

            if (category && icon) setChoosedCategory({ category: category, icon: icon });

            setIsEnteringModalActive(true);
        }
    }

    const deleteCategory = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        const target = event.target as HTMLElement;
        const token = getDataFromLocalStorage("token");
        const userDataFromStorage = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;
        let categoryName: undefined | string | null;

        target.parentNode && target.parentNode.previousSibling ?
            categoryName = target.parentNode.previousSibling.childNodes[0]?.textContent :
            showAlert({ type: "success", text: "Somthing was wrong" }, setIsAlertActive, 3000);

        if (categoryName && categoryName !== undefined) {
            const categoriesExpensesUpdating = [...userDataFromStorage.data[dataKey]].filter((item) => item.name !== categoryName);

            try {
                const updatedData = {
                    ...userDataFromStorage,
                    data: {
                        ...userDataFromStorage.data,
                        [dataKey]: categoriesExpensesUpdating
                    }
                };

                await dispatch(changeUserData({ userToken: token, updatedData: updatedData }));
                showAlert({ type: "success", text: "Category deleted successfully" }, setIsAlertActive, 3000);
                getUserDataFromStorage();
                setShowDeleteIcons([]);
            } catch (error) {
                showAlert({ type: "warning", text: "Please try again later." }, setIsAlertActive, 3000);
                console.error(error);
            }

            setIsLoading(false);
        }
    }

    useEffect(() => {
        const hideCrossBtn = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (!target.classList.contains("item-btn") &&
                !target.classList.contains("item-btn-inner")) {
                setShowDeleteIcons([]);
            }
        }

        if (windowWidth <= 1024) {
            showDeleteIcons.length > 0 && window.addEventListener("click", hideCrossBtn);
        }

        return () => {
            window.removeEventListener("click", hideCrossBtn);
        };
    }, [showDeleteIcons]);

    return (
        <>
            {!isLoading ?
                <List>
                    {categoriesList ? categoriesList.map((category, index) => (
                        <Item
                            onContextMenu={(event) => event.preventDefault()}
                            key={uuidV4()}
                            onTouchStart={windowWidth <= 1024 ? (event) => handleMouseDown(event, index) : undefined}
                            onTouchEnd={windowWidth <= 1024 ? handleMouseUp : undefined}
                            onClick={openEnteringExpensesModal}>
                            <Icon name={category.name} icon={category.icon} />
                            <CategoryName name={category.name} />
                            {showDeleteIcons[index] && windowWidth <= 1024 ? (
                                <div className="item-btn-inner">
                                    <Cross deleteCategory={deleteCategory} />
                                </div>
                            ) :
                                <CrossBtnInner className="item-btn-inner">
                                    <Cross deleteCategory={deleteCategory} />
                                </CrossBtnInner>}
                        </Item>
                    ))
                        : <Spinner size={40} height={3} />}
                </List>
                : <Spinner size={40} height={3} />}
        </>
    )
}