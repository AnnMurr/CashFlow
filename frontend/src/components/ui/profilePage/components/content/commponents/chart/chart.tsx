import { FC, useContext } from "react";
import { PieChartComponent } from "../../../../../../shared/pieChart/pieChart";
import { ChartDataType } from "../../../../../../ui/profilePage/types";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Container, Title, Wrapper } from "./styledChart";
import { useNavigate } from "react-router-dom";

interface ChartProps {
    data: [string, ChartDataType[]];
}

export const Chart: FC<ChartProps> = ({ data }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const navigate = useNavigate();

    const goToChartPage = (event: any) => {
        navigate("/pie-chart", { state: { key: event.currentTarget.dataset.period } });
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
                    <div>
                        <PieChartComponent data={data[1]} />
                    </div>
                </Wrapper>
            </Container>
            : null
    )
}