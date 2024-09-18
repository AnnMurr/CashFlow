import { FC, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../../redux/store/store";
import { UserDataType } from "../../../../../../redux/reducers/userReducer/types";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { Description } from "./components/description/description";
import { EmailAdress } from "./components/emailAdress/emailAdress";
import { Container } from "./styledContent";

export const Content: FC = () => {
    const [email, setEmail] = useState<string | null>(null);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    useEffect(() => {
        userDataFromRedux && setEmail(userDataFromRedux?.email);
    }, [userDataFromRedux]);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <div>
                <Description />
                <EmailAdress email={email} />
            </div>
        </Container>
    )
}