import { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidV4 } from "uuid";
import { STATISTICS_OPTIONS } from '../../../../../../../consts';
import { Container } from './styledSelect';
interface SelectLabelsProps {
    openDatePikerModal: (value: boolean) => void;
    openMonthSelectModal: (value: boolean) => void;
    openYearSelectModal: (value: boolean) => void;
    setChosenFilterType: (value: string | null) => void,
}

export const SelectLabels: FC<SelectLabelsProps> = ({ setChosenFilterType, openDatePikerModal, openMonthSelectModal, openYearSelectModal }) => {
    const [option, setOption] = useState<string>("0");

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
    }

    const formControlStyles = {
        m: 1,
        width: "15rem",
        paddingRight: 0,
        textAlign: "center"
    }

    const menuItemStyles = {
        '&.Mui-selected': {
            backgroundColor: "#56776c21",
        },
        '&.Mui-selected:hover': {
            backgroundColor: "#56776c21",
        },
        '& em': {
            fontStyle: 'normal',
        },
    }

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        const type = STATISTICS_OPTIONS[+value - 1];
        setOption(value);

        if (type === "Day") {
            openDatePikerModal(true);
            setChosenFilterType(type);
        } else if (type === "Week") {
            setChosenFilterType(type);
        } else if (type === "Month") {
            openMonthSelectModal(true);
            setChosenFilterType(type);
        } else if (type === "Year") {
            openYearSelectModal(true);
            setChosenFilterType(type);
        }
    };

    return (
        <Container>
            <FormControl sx={formControlStyles}>
                <Select
                    sx={selectStyles}
                    IconComponent={() => null}
                    value={option}
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