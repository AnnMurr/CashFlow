import { FC, useContext } from "react";
import { getFormatCurrency } from "../../../../../utils/getFormatCurrency";
import { useAppSelector } from "../../../../../redux/store/store";
import { TooltipProps } from 'recharts';
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Amount, Category, Container, Item, LabelInner, List } from "./styledTooltip";

interface CustomTooltipProps extends TooltipProps<any, any> {
    colors: Array<string>;
};

export const CustomTooltip: FC<CustomTooltipProps> = ({ payload, label, colors }) => {
    const { currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    if (!payload || payload.length === 0) return null;

    const legendInlineStyles = (index: number) => ({
        width: '8px',
        height: '8px',
        borderRadius: '20px',
        backgroundColor: colors[index % colors.length],
        marginRight: '5px',
        display: 'inline-block',
    });

    return (
        currency &&
        <Container themestyles={themeContext.themeStyles}>
            <LabelInner themestyles={themeContext.themeStyles}>
                <span>{label}</span>
            </LabelInner>
            <List themestyles={themeContext.themeStyles}>
                {payload.map((entry, index) => (
                    <Item themestyles={themeContext.themeStyles}>
                        <div>
                            <span style={legendInlineStyles(index)}></span>
                            <Category themestyles={themeContext.themeStyles}>
                                {entry.name}
                            </Category>
                        </div>
                        <Amount themestyles={themeContext.themeStyles}>{getFormatCurrency(entry.value, currency.code)}</Amount>
                    </Item>
                ))}
            </List>
        </Container>
    );
};