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
    const windowWidth = window.innerWidth;

    const pieChartStyles = {
        [`& .MuiChartsLegend-series tspan`]: {
            fill: themeContext.themeStyles.color,
            fontWeight: 'bold',
        },
        [`& .MuiChartsLegend-root`]: {
            transform: 'translateY(290px)',
        },
        [`& .MuiPieArc-root`]: {
            stroke: themeContext.themeStyles.pieChartStroke
        },
        overflow: "visible",
    };

    useEffect(() => {
        storageData && setColors(storageData.settings.charts.pieChartColor);
    }, [storageData]);

    return (
        data && windowWidth ?
            <PieChart
                series={[
                    {
                        data: data,
                        cx: windowWidth <= 380 ? "83%" : isLegendHidden ? "75%" : "65%",
                        cy: !isLegendHidden ? "30%" : "50%",
                        innerRadius: windowWidth <= 380 ? "120%" : "40%",
                        outerRadius: windowWidth <= 380 ? "60%" : isLegendHidden ? "80%" : "75%",
                    },
                ]}
                sx={pieChartStyles}
                slotProps={{
                    legend:
                    {
                        hidden: isLegendHidden,
                        position: { vertical: 'top', horizontal: 'middle' },
                        direction: 'row',
                        itemGap: 15,
                    }
                }}
                colors={colors}
                height={isLegendHidden ? 300 : 500}
                width={windowWidth <= 380 ? 250 : isLegendHidden ? 300 : windowWidth <= 460 ? 350 : 450}
            /> : null
    )
}