import { FC, useContext } from "react";
import { PieChartComponent } from "../../../../../../shared/pieChart/pieChart";
import { ChartDataType } from "../../../../../../ui/profilePage/types";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Container, Title, Wrapper } from "./styledChart";

interface ChartProps {
    data: [string, ChartDataType[]];
}

export const Chart: FC<ChartProps> = ({ data }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const goToChartPage = (event: any) => {

    }

    return (
        data ? <Container onClick={goToChartPage} themestyles={themeContext.themeStyles}>
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