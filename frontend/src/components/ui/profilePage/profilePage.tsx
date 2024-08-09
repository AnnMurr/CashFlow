import { FC, useEffect, useState } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Body } from "../../shared/body/body";
import { Content } from "./components/content/content";
import { useAppSelector } from "../../../redux/store/store";
import { RootState } from "../../../redux/reducers/userStorageReduser/types";
import { ChartDataObjectType } from "./types";
import { setChartDataByPeriod } from "../../../utils/chartUtils";
import { Container, Wrapper } from "./profilePageStyled";

export const ProfilePage: FC = () => {
    const [chartData, setChartData] = useState<ChartDataObjectType | null>(null);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        storageData && setChartDataByPeriod("expenses", storageData, setChartData)
    }, [storageData]);

    return (
        <>
            <Body>
                <section>
                    <Container>
                        <Wrapper>
                            <SubBar />
                            {chartData && <Content chartData={chartData} />}
                        </Wrapper>
                    </Container>
                </section>
            </Body>
        </>
    )
}