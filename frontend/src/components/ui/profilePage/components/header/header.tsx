import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { VariantButtonGroup } from "../../../../shared/variantButtonGroup/variantButtonGroup";
import { LogOutBtn } from "./components/logOutBtn/logOutBtn";
import { Container, Wrapper } from "./styledHeader";
interface HeaderProps {
    setIsLogOutConfirmationModal: (value: boolean) => void;
    statisticType: "expenses" | "income";
    setStatisticType: (value: "expenses" | "income") => void;
}

export const Header: FC<HeaderProps> = ({ setIsLogOutConfirmationModal, statisticType, setStatisticType }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <VariantButtonGroup
                    statisticType={statisticType}
                    setStatisticType={setStatisticType} />
                <LogOutBtn setIsLogOutConfirmationModal={setIsLogOutConfirmationModal} />
            </Wrapper>
        </Container>
    )
}