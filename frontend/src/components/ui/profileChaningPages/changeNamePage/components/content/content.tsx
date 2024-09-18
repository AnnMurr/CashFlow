import { FC, useContext, useEffect } from "react";
import { useAppSelector } from "../../../../../../redux/store/store";
import { UserDataType } from "../../../../../../redux/reducers/userReducer/types";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { Head } from "./components/head/head";
import { InfoBlock } from "./components/infoBlock/infoBlock";
import { Container, Wrapper } from "./styledContent";

interface ContentProps {
    setUserName: (value: string | null | undefined) => void;
    userName: string | null | undefined;
    setIsModalActive: (value: boolean) => void;
}

export const Content: FC<ContentProps> = ({ setUserName, userName, setIsModalActive }) => {
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    useEffect(() => {
        userDataFromRedux && setUserName(userDataFromRedux?.name)
    }, [userDataFromRedux]);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <Head
                    userName={userName}
                    setIsModalActive={setIsModalActive} />
                <InfoBlock />
            </Wrapper>
        </Container>
    )
}