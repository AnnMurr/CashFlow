import { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidV4 } from "uuid";
import { STATISTICS_OPTIONS } from '../../../../../../../consts';
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
    const selectStyles = {
        width: "100%",
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
        },
        '& em': {
            fontStyle: 'normal',
            fontWeight: "600",
            fontSize: "18px"
        },
        '& .MuiInputBase-input': {
            padding: "16.5px 14px"
        },
        '&.MuiInputBase-root': {
            lineHeight: "1.4375em",
        },
    };

    const formControlStyles = {
        m: 1,
        width: "15rem",
        paddingRight: 0,
        textAlign: "center",

        '&.MuiFormControl-root': {
            margin: "8px",
        },
        '&.MuiInputBase-root': {
            lineHeight: "1.4375em",
        },
    };

    const menuItemStyles = {
        '&.Mui-selected.Mui-focusVisible': {
            backgroundColor: "#56776c21",
        },
        '&.Mui-selected': {
            backgroundColor: "#56776c21",
        },
        '&.Mui-selected:hover': {
            backgroundColor: "#56776c21",
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
                    inputProps={{ 'aria-label': 'Without label' }}>
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