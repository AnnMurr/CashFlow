import { FC } from 'react';
import { Chart } from "./commponents/chart/chart";
import { v4 as uuidV4 } from "uuid";
import { ChartDataObjectType } from "../../types";

interface ContentProps {
    chartData: ChartDataObjectType;
}

export const Content: FC<ContentProps> = ({ chartData }) => {
    return (
        <>
            {chartData ? (
                Object.entries(chartData).map((chart) => (
                    <Chart key={uuidV4()} data={chart} />
                ))
            ) : null}
        </>
    )
}