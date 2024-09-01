import { FC, useEffect, useState } from 'react';
import { Chart } from "./commponents/chart/chart";
import { v4 as uuidV4 } from "uuid";
import { ChartDataObjectType } from "../../types";
import { BarChartComponent } from '../../../../shared/barChart/barChart';
import { useAppSelector } from '../../../../../redux/store/store';
import { RootState } from '../../../../../redux/reducers/userStorageReduser/types';
import { GridInner, Wrapper } from './styledContent';

interface ContentProps {
    chartData: ChartDataObjectType;
    statisticType: "expenses" | "income";
}

export const Content: FC<ContentProps> = ({ chartData, statisticType }) => {
    const [isBarChart, setIsBarChart] = useState<boolean>(false);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        storageData?.data[statisticType].length ?
            setIsBarChart(true) : setIsBarChart(false);
    }, [storageData, statisticType]);

    return (
        <div>
            <Wrapper>
                {isBarChart ? <BarChartComponent statisticType={statisticType} /> : null}
                <GridInner>
                    {chartData ? (
                        Object.entries(chartData).map((chart) => (
                            <Chart statisticType={statisticType} key={uuidV4()} data={chart} />
                        ))
                    ) : null}
                </GridInner>
            </Wrapper>
        </div>
    )
}