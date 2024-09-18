import { FC, useEffect, useState } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Body } from "../../shared/body/body";
import { Content } from "./components/content/content";
import { useAppSelector } from "../../../redux/store/store";
import { RootState } from "../../../redux/reducers/userStorageReduser/types";
import { ChartDataObjectType } from "./types";
import { setChartDataBySpecificDates } from "../../../utils/chartUtils";
import { Header } from "./components/header/header";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { LogOutConfirmationModal } from "./components/logOutConfirmationModal/logOutConfirmationModal";
import { Spinner } from "../..//shared/spinner/spinner";
import { Container, LoadingInner, Wrapper } from "./styledProfilePage";

export const ProfilePage: FC = () => {
    const [chartData, setChartData] = useState<ChartDataObjectType | null>(null);
    const [isLogOutConfirmationModal, setIsLogOutConfirmationModal] = useState<boolean>(false);
    const [statisticType, setStatisticType] = useState<"expenses" | "income">("expenses");
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        storageData && statisticType &&
            setChartDataBySpecificDates(statisticType, storageData, setChartData);
    }, [storageData, statisticType]);

    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <Header
                            setIsLogOutConfirmationModal={setIsLogOutConfirmationModal}
                            statisticType={statisticType}
                            setStatisticType={setStatisticType} />
                        {chartData ? 
                            <Content statisticType={statisticType} chartData={chartData} /> :
                           (<LoadingInner>
                             <Spinner size={40} height={3} />
                             </LoadingInner>)}
                        {isLogOutConfirmationModal ?
                            <>
                                <DarkBackground
                                    setIsModalActive={setIsLogOutConfirmationModal}
                                    isModalActive={isLogOutConfirmationModal} />
                                <LogOutConfirmationModal
                                    setIsModalActive={setIsLogOutConfirmationModal} />
                            </>
                            : null}
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}