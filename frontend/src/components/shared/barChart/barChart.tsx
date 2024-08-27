import { FC, useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppSelector } from "../../../redux/store/store";
import { RootState } from "../../../redux/reducers/userStorageReduser/types";
import { format } from 'date-fns';
import { v4 as uuidV4 } from "uuid";
import { INITIAL_CHARTS_COLORS } from "../../../consts";

interface BarChartComponentProps {
    statisticType: "expenses" | "income";
}

export const BarChartComponent: FC<BarChartComponentProps> = ({ statisticType }) => {
    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const [colors, setColors] = useState<Array<string>>(INITIAL_CHARTS_COLORS);

    const monthlyCategoryData = storageData?.data[statisticType]?.reduce((acc, item) => {
        const month = format(new Date(item.date), 'MMMM');
        acc[month] = acc[month] || {};
        acc[month][item.category] = (acc[month][item.category] || 0) + item.sum;
        return acc;
    }, {} as { [month: string]: { [category: string]: number } }) || {};

    const transformedData = Object.keys(monthlyCategoryData).map(month => ({
        month,
        ...monthlyCategoryData[month],
    }));

    const categories = Array.from(new Set(storageData?.data[statisticType]?.map(item => item.category) || []));

    const containerStyles: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '400px'
    };

    const legendContainerStyles: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        right: 0
    };

    const legendItemStyles = {
        marginBottom: '5px',
        display: 'flex',
        alignItems: 'center'
    };

    const legendInlineStyles = (index: number) => ({
        width: '20px',
        height: '20px',
        backgroundColor: colors[index % colors.length],
        marginRight: '5px'
    });

    useEffect(() => {
        storageData && setColors(storageData.settings.charts.barChartColor);
    }, [storageData])

    return (
        <div style={containerStyles}>
            <BarChart
                width={600}
                height={300}
                dataset={transformedData}
                xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={categories.map((category, index) => ({
                    type: 'bar',
                    dataKey: category,
                    color: colors[index % colors.length],
                }))}
                colors={colors} />
            <div style={legendContainerStyles}>
                {categories.map((category, index) => (
                    <div key={uuidV4()} style={legendItemStyles}>
                        <div style={legendInlineStyles(index)}></div>
                        <span>{category}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
