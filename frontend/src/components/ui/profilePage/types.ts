export interface ChartDataType {
    label: string;
    value: number;
}

export interface ChartDataObjectType {
    [key: string]: Array<ChartDataType>;
}