import { FC, useCallback, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Body } from "../../shared/body/body";
import { SubBar } from "../../shared/subBar/subBar";
import { FinancialPlansTable } from "./components/table/table";
import { BudgetPlanning, CategoryPlanning, RootState } from "../../../redux/reducers/userStorageReduser/types";
import { useAppSelector } from "../../../redux/store/store";
import { Header } from "./components/header/header";
import { DeleteCategoryModal } from "./components/deleteCategoryModal/deleteCategoryModal";
import { AlertComponent, AlertComponentProps } from "../../shared/alert/alert";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { Spinner } from "../../shared/spinner/spinner";
import { DeletePlanModal } from "./components/deletePlanModal/deletePlanModal";
import { EmptyState } from "./components/emptyState/emptyState";
import { Container, SpinnerContainer, Tables, Wrapper } from "./styledFinancialPlans";
import { EditModal } from "./components/editModal/editModal";

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
                            <>
                                <EditModal
                                    choosenEditCategory={choosenEditCategory}
                                    setIsEditModalActive={setIsEditModalActive}
                                    setIsAlertActive={setIsAlertActive}
                                    currentPlan={currentPlan}
                                    setBudgetPlans={setBudgetPlans} />
                                <DarkBackground
                                    setIsModalActive={setIsEditModalActive}
                                    isModalActive={isEditModalActive} />
                            </>
                        )}
                        {isDeleteCategoryModal && (
                            <>
                                <DeleteCategoryModal
                                    closeModal={setIsDeleteCategoryModal}
                                    choosenEditCategory={choosenEditCategory}
                                    currentPlan={currentPlan}
                                    setIsAlertActive={setIsAlertActive}
                                    setBudgetPlans={setBudgetPlans}
                                    setCurrentTab={setCurrentTab} />
                                <DarkBackground
                                    setIsModalActive={setIsDeleteCategoryModal}
                                    isModalActive={isDeleteCategoryModal} />
                            </>)}
                        {isDeletePlanModal && (
                            <>
                                <DeletePlanModal
                                    closeModal={setIsDeletePlanModal}
                                    currentPlan={currentPlan}
                                    setIsAlertActive={setIsAlertActive}
                                    setBudgetPlans={setBudgetPlans}
                                    setCurrentTab={setCurrentTab} />
                                <DarkBackground
                                    setIsModalActive={setIsDeletePlanModal}
                                    isModalActive={isDeletePlanModal} />
                            </>)}
                        {!budgetPlans &&
                            <SpinnerContainer>
                                <Spinner size={40} height={3} />
                            </SpinnerContainer>}
                        {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}