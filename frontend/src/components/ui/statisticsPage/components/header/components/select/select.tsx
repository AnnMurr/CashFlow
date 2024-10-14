import { FC, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidV4 } from "uuid";
import { STATISTICS_OPTIONS } from '../../../../../../../consts';
import { ThemeContextType } from '../../../../../../../contexts/themeContext/types';
import { ThemeContext } from '../../../../../../../contexts/themeContext/themeContext';
import { Container } from './styledSelect';

interface SelectLabelsProps {
    openDatePickerModal: (value: boolean) => void;
    openMonthSelectModal: (value: boolean) => void;
    openYearSelectModal: (value: boolean) => void;
    openDateRangeModal: (value: boolean) => void;
    setChosenFilterType: (value: string | null) => void,
}

export const SelectLabels: FC<SelectLabelsProps> = ({
    setChosenFilterType,
    openDatePickerModal,
    openMonthSelectModal,
    openYearSelectModal,
    openDateRangeModal
}) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const selectStyles = {
        width: "100%",
        bacgroundColor: "#000",

        '& .MuiOutlinedInput-root': {
            padding: "10px 14px",
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: "none",
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "none",
        },
        '& .MuiSelect-select': {
            fontWeight: "600",
            fontSize: "18px",
            color: themeContext.themeStyles.color
        },
        '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
            padding: 0,
        },
        '& em': {
            fontStyle: 'normal',
            fontWeight: "600",
            fontSize: "18px"
        },
        '& .MuiInputBase-input': {
            padding: 0,
        },
        '&.MuiInputBase-root': {
            lineHeight: "1.4375em",
        },
    };

    const formControlStyles = {
        m: 1,
        width: "15rem",

        textAlign: "center",

        '&.MuiFormControl-root': {
            margin: "8px",
        },
        '&.MuiInputBase-root': {
            lineHeight: "1.4375em",
        },
    };

    const menuItemStyles = {
        color: themeContext.themeStyles.color,

        '&.Mui-selected.Mui-focusVisible': {
            backgroundColor: themeContext.themeStyles.selectHover,
        },
        '&.Mui-selected': {
            backgroundColor: themeContext.themeStyles.selectSelected,

            '&.MuiButtonBase-root.MuiMenuItem-root:hover': {
                backgroundColor: themeContext.themeStyles.selectSelected,
            },
        },
        '&.MuiButtonBase-root.MuiMenuItem-root:hover': {
            backgroundColor: themeContext.themeStyles.selectHover,
        },
        '& em': {
            fontStyle: 'normal',
        },
    };

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        const type = STATISTICS_OPTIONS[+value - 1];

        setChosenFilterType(null);
        setTimeout(() => { setChosenFilterType(type); }, 0);

        switch (type) {
            case "Day":
                openDatePickerModal(true);
                break;
            case "Month":
                openMonthSelectModal(true);
                break;
            case "Year":
                openYearSelectModal(true);
                break;
            case "Range":
                openDateRangeModal(true);
                break;
        }
    };

    return (
        <Container>
            <FormControl sx={formControlStyles}>
                <Select
                    sx={selectStyles}
                    IconComponent={() => null}
                    value={"0"}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: themeContext.themeStyles.modalBackground,
                            },
                        },
                    }}>
                    <MenuItem value={0} sx={menuItemStyles}>
                        <em>Filter</em>
                    </MenuItem>
                    {STATISTICS_OPTIONS.map((option, index) => (
                        <MenuItem
                            sx={menuItemStyles}
                            key={uuidV4()}
                            value={index + 1}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>
    );
}