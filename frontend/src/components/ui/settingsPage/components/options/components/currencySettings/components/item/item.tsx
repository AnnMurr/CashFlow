import { FC } from "react";
import { UserStorageDataType } from "../../../../../../../../../redux/reducers/userStorageReduser/types";
import { Category, Container, Name, Symbol, Wrapper } from "./styledItem";

interface ItemProps {
    data: UserStorageDataType | null;
    category: string;
    setIsCurrencyChoosingModalActive: (value: boolean) => void;
}

export const Item: FC<ItemProps> = ({ data, category, setIsCurrencyChoosingModalActive}) => {
    return (
        <Container onClick={() => setIsCurrencyChoosingModalActive(true)}>
            <Wrapper >
                <div>
                    <Category>
                        {category}
                    </Category>
                </div>
                <div>
                    <Name>
                        {data?.settings.currency.name}
                    </Name>
                </div>
                <div>
                    <Symbol>
                        {data?.settings.currency.symbol}
                    </Symbol>
                </div>
            </Wrapper>
        </Container>
    )
}