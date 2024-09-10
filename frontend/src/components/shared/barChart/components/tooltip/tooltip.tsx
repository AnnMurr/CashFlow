import { FC, useContext } from "react";
import { getFormatCurrency } from "../../../../../utils/getFormatCurrency";
import { useAppSelector } from "../../../../../redux/store/store";
import { TooltipProps } from 'recharts';
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";

interface CustomTooltipProps extends TooltipProps<any, any> { };

export const CustomTooltip: FC<CustomTooltipProps> = ({ payload, label }) => {
    const { currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    if (!payload || payload.length === 0) return null;

    return (
        currency &&
        <div style={{
            backgroundColor: themeContext.themeStyles.modalBackground,
            borderColor: themeContext.themeStyles.modalBackground,
            borderWidth: 1,
            borderRadius: 4,
            fontSize: 14,
            color: themeContext.themeStyles.color,
            padding: '10px',
        }}>
            <p>{label}</p>
            {payload.map((entry, index) => (
                <p key={index} style={{ color: themeContext.themeStyles.color }}>
                    {entry.name}: {getFormatCurrency(entry.value, currency.code)}
                </p>
            ))}
        </div>
    );
};