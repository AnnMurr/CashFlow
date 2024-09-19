import { FC, useCallback, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { BudgetPlanning, CategoryPlanning, RootState } from "../../../redux/reducers/userStorageReduser/types";
import { useAppSelector } from "../../../redux/store/store";
import { AlertComponentProps } from "../../shared/alert/alert";
import {
    Body,
    DarkBackground,
    DeleteCategoryModal,
    DeletePlanModal,
    EditModal,
    EmptyState,
    FinancialPlansTable,
    Header,
    Spinner,
    SubBar,
    AlertComponent
} from ".";
import { Container, SpinnerContainer, Tables, Wrapper } from "./styledFinancialPlans";

export const FinancialPlans: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [budgetPlans, setBudgetPlans] = useState<Array<BudgetPlanning> | null>(null);
    const [currentPlan, setCurrentPlan] = useState<BudgetPlanning | null>(null);
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [choosenEditCategory, setChoosenEditCategory] = useState<CategoryPlanning | null>(null);
    const [isEditModalActive, setIsEditModalActive] = useState<boolean>(false);
    const [isDeleteCategoryModal, setIsDeleteCategoryModal] = useState<boolean>(false);
    const [isDeletePlanModal, setIsDeletePlanModal] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    const currentSetIsModal = isEditModalActive ?
        setIsEditModalActive : isDeleteCategoryModal ?
            setIsDeleteCategoryModal : setIsDeletePlanModal;

    const currentIsModal = isEditModalActive || isDeleteCategoryModal || isDeletePlanModal;

    const updateBudgetPlans = useCallback(() => {
        if (storageData?.data?.planning) {
            setBudgetPlans(storageData.data.planning);
        }
    }, [storageData]);

    useEffect(() => {

        updateBudgetPlans();
    }, [updateBudgetPlans])

    useEffect(() => {
        budgetPlans && setCurrentPlan(budgetPlans[currentTab]);
        budgetPlans && setIsEmpty(!budgetPlans.length ? true : false);
    }, [budgetPlans, currentTab]);

    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        {budgetPlans?.length ? (
                            <>
                                <Header
                                    budgetPlans={budgetPlans}
                                    currentPlan={currentPlan}
                                    setCurrentTab={setCurrentTab}
                                />
                                <Tables>
                                    {currentPlan && (
                                        <FinancialPlansTable
                                            key={uuidV4()}
                                            data={currentPlan}
                                            setIsDeleteCategoryModal={setIsDeleteCategoryModal}
                                            setChoosenEditCategory={setChoosenEditCategory}
                                            setIsDeletePlanModal={setIsDeletePlanModal}
                                            setIsEditModalActive={setIsEditModalActive}
                                        />
                                    )}
                                </Tables>
                            </>) : null}
                        {isEmpty && <EmptyState />}
                        {isEditModalActive && (
                            <EditModal
                                choosenEditCategory={choosenEditCategory}
                                setIsEditModalActive={setIsEditModalActive}
                                setIsAlertActive={setIsAlertActive}
                                currentPlan={currentPlan}
                                setBudgetPlans={setBudgetPlans} />
                        )}
                        {isDeleteCategoryModal && (
                            <DeleteCategoryModal
                                closeModal={setIsDeleteCategoryModal}
                                choosenEditCategory={choosenEditCategory}
                                currentPlan={currentPlan}
                                setIsAlertActive={setIsAlertActive}
                                setBudgetPlans={setBudgetPlans}
                                setCurrentTab={setCurrentTab} />)}
                        {isDeletePlanModal && (
                            <DeletePlanModal
                                closeModal={setIsDeletePlanModal}
                                currentPlan={currentPlan}
                                setIsAlertActive={setIsAlertActive}
                                setBudgetPlans={setBudgetPlans}
                                setCurrentTab={setCurrentTab} />
                        )}
                        {!budgetPlans &&
                            <SpinnerContainer>
                                <Spinner size={40} height={3} />
                            </SpinnerContainer>}
                        {currentIsModal && (
                            <DarkBackground
                                setIsModalActive={currentSetIsModal}
                                isModalActive={currentIsModal} />
                        )}
                        {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}