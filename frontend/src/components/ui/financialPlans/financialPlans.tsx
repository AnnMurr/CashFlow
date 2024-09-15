import { FC, useEffect, useState } from "react";
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
import { Container, SpinnerContainer, Tables, Wrapper } from "./styledFinancialPlans";
import { Spinner } from "../../shared/spinner/spinner";

export const FinancialPlans: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [budgetPlans, setBudgetPlans] = useState<Array<BudgetPlanning> | null>(null);
    const [currentPlan, setCurrentPlan] = useState<BudgetPlanning | null>(null);
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [choosenEditCategory, setChoosenEditCategory] = useState<CategoryPlanning | null>(null);
    const [isDeleteCategoryModal, setIsDeleteCategoryModal] = useState<boolean>(false);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        storageData?.data?.planning.length && setBudgetPlans(storageData?.data.planning);
    }, [storageData]);

    useEffect(() => {
        budgetPlans?.length && setCurrentPlan(budgetPlans[currentTab]);
    }, [budgetPlans, currentTab]);

    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        {budgetPlans ? <>
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
                                    />
                                )}
                            </Tables>
                        </> :
                            <SpinnerContainer>
                                <Spinner size={40} height={3} />
                            </SpinnerContainer>}
                        {isDeleteCategoryModal && (
                            <>
                                <DeleteCategoryModal
                                    closeModal={setIsDeleteCategoryModal}
                                    choosenEditCategory={choosenEditCategory}
                                    currentPlan={currentPlan}
                                    setIsAlertActive={setIsAlertActive}
                                    setBudgetPlans={setBudgetPlans}
                                    setCurrentPlan={setCurrentPlan} />
                                <DarkBackground
                                    setIsModalActive={setIsDeleteCategoryModal}
                                    isModalActive={isDeleteCategoryModal} />
                            </>)}
                        {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}