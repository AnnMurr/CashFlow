import { FC, useContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { DateRangePicker } from "../../../../shared/dateRangePicker/dateRangePicker";
import { MultipleSelectPlaceholder } from "../../../../shared/select/select";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { getCurrentDate } from "../../../../../utils/dateUtils";
import { Spinner } from "../../../../shared/spinner/spinner";
import { ButtonComponent } from "../../../../shared/button/button";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { MONTH } from "../../../../../consts";
import { showAlert } from "../../../../../utils/showAlert";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { Container, Item, Wrapper, Tabs, BtnInner, PickerInner } from "./styledDateSelectorModal";
import { OutlinedInputComponent } from "../../../../shared/outlinedInput/outlinedInput";

interface DateSelectorModalProps {
    setDateRange: (value: string) => void;
    setIsDateSelectorModal: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
}

export const DateSelectorModal: FC<DateSelectorModalProps> = ({
    setDateRange, setIsDateSelectorModal, setIsAlertActive }) => {
    const tabNames = ["range", "month", "name"];
    const [activeTab, setActiveTab] = useState<number>(0);
    const [months, setMonths] = useState<Array<string> | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const applyDateRange = (activeTab: string) => {
        if (activeTab === "month" && selectedMonth) {
            setDateRange(selectedMonth);
            setIsDateSelectorModal(false);
        } else if (activeTab === "name" && name) {
            setDateRange(name);
            setIsDateSelectorModal(false);
        } else if (activeTab === "range") {
            if (!selectedStartDate || !selectedEndDate) {
                showAlert({ type: "warning", text: "Choose date" }, setIsAlertActive, 3000);
            } else if (selectedEndDate < selectedStartDate) {
                showAlert({ type: "error", text: "End date must be greater than start date" }, setIsAlertActive, 3000);
            } else {
                setDateRange(`${selectedStartDate} - ${selectedEndDate}`);
                setSelectedEndDate(null);
                setSelectedStartDate(null);
                setIsDateSelectorModal(false);
            }
        }
    }

    useEffect(() => {
        setMonths(MONTH);
        setSelectedMonth(MONTH[0]);
    }, []);

    const handleTabClick = (index: number) => {
        setSelectedStartDate(null)
        setSelectedEndDate(null)
        setActiveTab(index);
    };

    const handleDateRangeSelect = (startDate: Date | null, endDate: Date | null) => {
        setSelectedStartDate(startDate ? getCurrentDate(startDate).slice(0, -6) : null);
        setSelectedEndDate(endDate ? getCurrentDate(endDate).slice(0, -6) : null);
    };

    const tabs = [
        {
            label: (
                <span>
                    Range
                </span>
            ),
            content: <DateRangePicker onSelectDateRange={handleDateRangeSelect} />
        },
        {
            label: (
                <span>
                    Month
                </span>
            ),
            content: <MultipleSelectPlaceholder
                isDisabled={false}
                setCategoryName={setSelectedMonth}
                categoryName={selectedMonth}
                names={months} />
        },
        {
            label: (
                <span>
                    Custom Name
                </span>
            ),
            content: <OutlinedInputComponent
                value={name}
                placeholderValue={"Custom name"}
                type={"text"}
                maxLengthNumber={30}
                handleChange={(event) => setName(event.target.value.trimStart())}
            />
        },
    ];

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{
                        marginLeft: "auto",
                        marginBottom: "20px",
                    }}
                    closeBlock={setIsDateSelectorModal}
                    size="lg" />
                <div>
                    <Tabs>
                        {tabs.map((tab, index) => (
                            <Item
                                themestyles={themeContext.themeStyles}
                                active={(activeTab === index).toString()}
                                key={uuidV4()}>
                                <button onClick={() => handleTabClick(index)}>
                                    {tab.label}
                                </button>
                            </Item>
                        ))}
                    </Tabs>
                </div>
                <div>
                    {tabs[activeTab] ?
                        <PickerInner>
                            {tabs[activeTab].content}
                        </PickerInner>
                        : <Spinner size={40} height={3} />}
                </div>
                <BtnInner>
                    <ButtonComponent
                        text="Apply"
                        color="#fff"
                        type="button"
                        func={() => applyDateRange(tabNames[activeTab])} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}