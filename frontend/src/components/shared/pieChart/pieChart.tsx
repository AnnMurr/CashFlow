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
            colors={['#1aab2e', '#24d7ae', '#5fb7d4', '#007ed7', '#8e6cef', '#ff0000', '#ff7300','#53d726', '#ffec01']}
            height={300}
            width={300}
        /> : null
    )
}