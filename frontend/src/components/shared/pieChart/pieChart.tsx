import { FC } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { ChartDataType } from "components/ui/profilePage/types";

interface PieChartComponentProps {
    data: Array<ChartDataType>;
}

export const PieChartComponent: FC<PieChartComponentProps> = ({ data }) => {
    return (
        data ? <PieChart
            series={[
                {
                    data: data,
                    cx: 80,
                    cy: 150,
                    innerRadius: 40,
                    outerRadius: 80,
                },
            ]}
            height={300}
            width={300}
        /> : null
    )
}