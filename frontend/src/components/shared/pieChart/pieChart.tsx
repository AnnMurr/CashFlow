import { FC, useContext } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { ChartDataType } from "../../ui/profilePage/types";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface PieChartComponentProps {
    data: Array<ChartDataType>;
    isLegendHidden: boolean;
}

export const PieChartComponent: FC<PieChartComponentProps> = ({ data, isLegendHidden }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const colors = ['#1aab2e', '#24d7ae', '#5fb7d4', '#007ed7', '#8e6cef', '#ff0000', '#ff7300', '#53d726', '#ffec01'];

    const pieChartStyles = {
        [`& .MuiChartsLegend-series tspan`]: {
            fill: themeContext.themeStyles.color,
            fontWeight: 'bold',
        },
        [`& .MuiChartsLegend-root`]: {
            transform: 'translateY(290px)',
        },
        overflow: "visible",
    };

    return (
        data ?
            <PieChart
                series={[
                    {
                        data: data,
                        cx: isLegendHidden ? 140 : 240,
                        cy: 150,
                        innerRadius: isLegendHidden ? 40 : 60,
                        outerRadius: isLegendHidden ? 80 : 120,
                    },
                ]}
                sx={pieChartStyles}
                slotProps={{
                    legend:
                    {
                        hidden: isLegendHidden,
                        position: { vertical: 'top', horizontal: 'middle' },
                        direction: 'row',
                        itemGap: 15
                    }
                }}
                colors={colors}
                height={isLegendHidden ? 300 : 500}
                width={isLegendHidden ? 300 : 500}
            /> : null
    )
}