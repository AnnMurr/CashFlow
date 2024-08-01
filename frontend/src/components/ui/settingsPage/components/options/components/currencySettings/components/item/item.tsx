import { FC, useContext } from "react";
import { UserStorageDataType } from "../../../../../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { Category, Container, Name, Symbol, Wrapper } from "./styledItem";

interface ItemProps {
    data: UserStorageDataType | null;
    category: string;
    setIsCurrencyChoosingModalActive: (value: boolean) => void;
}

export const Item: FC<ItemProps> = ({ data, category, setIsCurrencyChoosingModalActive }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container
            themestyles={themeContext.themeStyles}
            onClick={() => setIsCurrencyChoosingModalActive(true)}>
            <Wrapper >
                <div>
                    <Category themestyles={themeContext.themeStyles}>
                        {category}
                    </Category>
                </div>
                <div>
                    <Name themestyles={themeContext.themeStyles}>
                        {data?.settings.currency.name}
                    </Name>
                </div>
                <div>
                    <Symbol themestyles={themeContext.themeStyles}>
                        {data?.settings.currency.symbol}
                    </Symbol>
                </div>
            </Wrapper>
        </Container>
    )
}