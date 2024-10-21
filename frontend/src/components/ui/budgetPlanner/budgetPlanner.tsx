import { FC, useEffect, useState } from "react";
import { MONTH } from "../../../consts";
import { getMonth } from "../../../utils/dateUtils";
import { CategoriesType, CategoryPlanning } from "../../../redux/reducers/userStorageReduser/types";
import { AlertComponentProps } from "../../shared/alert/alert";
import {
    Body,
    BudgetTableManager,
    DarkBackground,
    DateSelector,
    DateSelectorModal,
    DeleteCategoryModal,
    EditModal,
    SubBar,
    AlertComponent
} from ".";
import { Container, Wrapper } from "./styledBudgetPlanner";

export const BudgetPlanner: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [dateRange, setDateRange] = useState<string>("");
    const [isDateSelectorModal, setIsDateSelectorModal] = useState<boolean>(false);
    const [isEditModalActive, setIsEditModalActive] = useState<boolean>(false);
    const [isDeleteCategoryModal, setIsDeleteCategoryModal] = useState<boolean>(false);
    const [completedCategories, setCompletedCategories] = useState<Array<CategoryPlanning>>([]);
    const [choosenEditCategory, setChoosenEditCategory] = useState<CategoryPlanning | null>(null);
    const [availableCategories, setAvailableCategories] = useState<Array<CategoriesType>>([]);

    const currentSetIsModal = isDateSelectorModal
        ? setIsDateSelectorModal
        : isEditModalActive
            ? setIsEditModalActive
            : setIsDeleteCategoryModal;

    const currentIsModal = isDateSelectorModal || isEditModalActive || isDeleteCategoryModal;

    useEffect(() => {
        setDateRange(MONTH[getMonth()]);
    }, []);

    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <DateSelector setIsDateRangeModal={setIsDateSelectorModal} dateRange={dateRange} />
                        <BudgetTableManager
                            setChoosenEditCategory={setChoosenEditCategory}
                            setIsEditModalActive={setIsEditModalActive}
                            setIsDeleteCategoryModal={setIsDeleteCategoryModal}
                            dateRange={dateRange}
                            setIsAlertActive={setIsAlertActive}
                            completedCategories={completedCategories}
                            setCompletedCategories={setCompletedCategories}
                            availableCategories={availableCategories}
                            setAvailableCategories={setAvailableCategories} />
                        {isDateSelectorModal &&
                            <DateSelectorModal
                                setDateRange={setDateRange}
                                setIsDateSelectorModal={setIsDateSelectorModal}
                                setIsAlertActive={setIsAlertActive} />}
                        {isEditModalActive &&
                            <EditModal
                                choosenEditCategory={choosenEditCategory}
                                setIsEditModalActive={setIsEditModalActive}
                                setIsAlertActive={setIsAlertActive}
                                completedCategories={completedCategories}
                                setCompletedCategories={setCompletedCategories}
                                availableCategories={availableCategories} />}
                        {isDeleteCategoryModal &&
                            <DeleteCategoryModal
                                closeModal={setIsDeleteCategoryModal}
                                choosenEditCategory={choosenEditCategory}
                                completedCategories={completedCategories}
                                setCompletedCategories={setCompletedCategories} />}
                        {currentIsModal &&
                            <DarkBackground
                                setIsModalActive={currentSetIsModal}
                                isModalActive={currentIsModal} />}
                        {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}