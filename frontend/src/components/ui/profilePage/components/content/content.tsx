import { FC } from 'react';
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
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    return (
        <div>
            <Wrapper>
                {storageData?.data[statisticType] && <BarChartComponent statisticType={statisticType} />}
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