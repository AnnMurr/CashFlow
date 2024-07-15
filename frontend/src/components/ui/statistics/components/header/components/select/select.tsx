import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidV4 } from "uuid";
import { Container } from './styledSelect';

export default function SelectLabels() {
    const STATISTICS_OPTIONS = ["Day", "Week", "Month", "Year", "All", "Range"];
    const [option, setOption] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value);
    };

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
                    <MenuItem value="" sx={menuItemStyles}>
                        <em>Filter</em>
                    </MenuItem>
                    {STATISTICS_OPTIONS.map((option, index) => (
                        <MenuItem sx={menuItemStyles} key={uuidV4()} value={index}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>
    );
}