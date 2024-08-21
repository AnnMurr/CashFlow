import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PieChartComponent } from "../../../../../../shared/pieChart/pieChart";
import { ChartDataType } from "../../../../../../ui/profilePage/types";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { EmptyState } from "./components/emptyState/emptyState";
import { Container, Title, Wrapper } from "./styledChart";
interface ChartProps {
    data: [string, ChartDataType[]];
    statisticType: "expenses" | "income";
}

export const Chart: FC<ChartProps> = ({ data, statisticType }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const navigate = useNavigate();

    const goToChartPage = (event: React.MouseEvent<HTMLDivElement>) => {
        data[1].length && navigate("/pie-chart", { state: { diapason: event.currentTarget.dataset.period, type: statisticType } });
    }

    return (
        data ?
            <Container
                data-period={data[0]}
                onClick={goToChartPage}
                themestyles={themeContext.themeStyles} >
                <Wrapper>
                    <Title themestyles={themeContext.themeStyles}>
                        <h3>
                            {data[0]}
                        </h3>
                    </Title>
                    {data[1].length ? <div>
                        <PieChartComponent isLegendHidden={true} data={data[1]} />
                    </div> :
                        <>
                            <EmptyState statisticType={statisticType} />
                        </>}
                </Wrapper>
            </Container>
            : null
    )
}