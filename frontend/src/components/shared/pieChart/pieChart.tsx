import { FC, useContext, useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { ChartDataType } from "../../ui/profilePage/types";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { useAppSelector } from "../../../redux/store/store";
import { RootState } from "../../../redux/reducers/userStorageReduser/types";
import { INITIAL_CHARTS_COLORS } from "../../../consts";

interface PieChartComponentProps {
    data: Array<ChartDataType>;
    isLegendHidden: boolean;
}

export const PieChartComponent: FC<PieChartComponentProps> = ({ data, isLegendHidden }) => {
    const [colors, setColors] = useState<Array<string>>(INITIAL_CHARTS_COLORS);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

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

    useEffect(() => {
        storageData && setColors(storageData.settings.charts.pieChartColor);
    }, [storageData]);

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