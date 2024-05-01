import { FC, useState } from "react";
import { Container, Item } from "./styledTabs";
import { v4 as uuidV4 } from "uuid"

export const Tabs: FC<any> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: any) => {
        setActiveTab(index);
    };

    return (
        <Container>
            <div>
                <ul>
                    {tabs.map((tab: any, index: number) => (
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