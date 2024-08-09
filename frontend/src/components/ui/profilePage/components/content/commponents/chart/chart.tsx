import { FC } from "react";
import { PieChartComponent } from "../../../../../../shared/pieChart/pieChart";
import { ChartDataType } from "../../../../../../ui/profilePage/types";
import { Container, Wrapper } from "./chartStyled";

interface ChartProps {
    data: [string, ChartDataType[]];
}

export const Chart: FC<ChartProps> = ({ data }) => {
    return (
        data ? <Container>
            <Wrapper>
                <div>
                    <h3>
                        {data[0]}
                    </h3>
                </div>
                <div>
                    <PieChartComponent data={data[1]} />
                </div>
            </Wrapper>
        </Container>
            : null
    )
}