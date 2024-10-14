import { FC, useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useAppSelector } from "../../../redux/store/store";
import { RootState } from "../../../redux/reducers/userStorageReduser/types";
import { format } from 'date-fns';
import { v4 as uuidV4 } from "uuid";
import { INITIAL_CHARTS_COLORS } from "../../../consts";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { CustomTooltip } from "./components/tooltip/tooltip";
import { Category, Container, LegendContainerStyles } from "./styledBarChart";

interface BarChartComponentProps {
    statisticType: "expenses" | "income";
}

export const BarChartComponent: FC<BarChartComponentProps> = ({ statisticType }) => {
    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const [colors, setColors] = useState<Array<string>>(INITIAL_CHARTS_COLORS);
    const [containerParameters, setContainerParameters] = useState<any>({ width: 600, height: 300 });
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const windowWidth = window.innerWidth;

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
    }, [storageData]);

    useEffect(() => {
        const width = windowWidth >= 880 ? 600 : windowWidth >= 420 ? 420 : 320;
        const height = windowWidth >= 880 ? 300 : windowWidth >= 420 ? 220 : 200;

        setContainerParameters({ width: width, height: height })
    }, [windowWidth]);

    return (
        <Container>
            <BarChart
                width={containerParameters.width}
                height={containerParameters.height}
                data={transformedData}
                style={{ right: '20px' }}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }} >
                <XAxis
                    dataKey="month"
                    stroke={themeContext.themeStyles.color} />
                <YAxis
                    stroke={themeContext.themeStyles.color} />

                <Tooltip
                    cursor={{ fill: themeContext.themeStyles.pickersDayHover }}
                    content={<CustomTooltip colors={colors} />} />
                {categories.map((category, index) => (
                    <Bar
                        style={{
                            overflow: 'hidden',
                            height: '-webkit-fill-available'
                        }}
                        key={category}
                        dataKey={category}
                        fill={colors[index % colors.length]} />
                ))}
            </BarChart>
            <LegendContainerStyles>
                {categories.map((category, index) => (
                    <div key={uuidV4()} style={legendItemStyles}>
                        <div style={legendInlineStyles(index)}></div>
                        <Category themestyles={themeContext.themeStyles}>{category}</Category>
                    </div>
                ))}
            </LegendContainerStyles>
        </Container>
    );
};
