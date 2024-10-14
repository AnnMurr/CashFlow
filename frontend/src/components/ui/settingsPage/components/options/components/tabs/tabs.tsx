import { FC, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Spinner } from "../../../../../../shared/spinner/spinner";
import { TabsType } from "../../options";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Container, Item, List, SettingsContainer } from "./styledTabs";

interface TabsProps {
    tabs: Array<TabsType>;
}

export const Tabs: FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <Container>
            <div>
                <List themestyles={themeContext.themeStyles} >
                    {tabs.map((tab, index) => (
                        <Item
                            themestyles={themeContext.themeStyles}
                            active={(activeTab === index).toString()}
                            key={uuidV4()}>
                            <button
                                onClick={() => handleTabClick(index)}>
                                {tab.label}
                            </button>
                        </Item>
                    ))}
                </List>
            </div>
            <SettingsContainer>
                {tabs[activeTab] ? tabs[activeTab].content : <Spinner size={40} height={3} />}
            </SettingsContainer>
        </Container>
    )
}