import { FC } from 'react';
import { Chart } from "./commponents/chart/chart";
import { v4 as uuidV4 } from "uuid";
import { ChartDataObjectType } from "../../types";
import { Container } from './styledContent';

interface ContentProps {
    chartData: ChartDataObjectType;
    statisticType: "expenses" | "income";
}

export const Content: FC<ContentProps> = ({ chartData, statisticType }) => {
    return (
        <Container>
            {chartData ? (
                Object.entries(chartData).map((chart) => (
                    <Chart statisticType={statisticType} key={uuidV4()} data={chart} />
                ))
            ) : null}
        </Container>
    )
}