import { FC, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Container, Item } from "./styledTabs";
import { TabsType } from "../../options";

interface TabsProps {
    tabs: Array<TabsType>;
}

export const Tabs: FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <Container>
            <div>
                <ul>
                    {tabs.map((tab, index) => (
                        <Item active={(activeTab === index).toString()} key={uuidV4()}>
                            <button
                                onClick={() => handleTabClick(index)}>
                                {tab.label}
                            </button>
                        </Item>
                    ))}
                </ul>
            </div>
            <div>
                {tabs[activeTab].content}
            </div>
        </Container>
    )
}