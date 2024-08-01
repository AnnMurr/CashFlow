import { FC, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../../../../redux/store/store";
import { UserDataType } from "../../../../../../redux/reducers/userReducer/types";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { Description, Email, EmailAdressInner, SubTitle, Title, Wrapper } from "./styledContent";

export const Content: FC = () => {
    const [email, setEmail] = useState<string | null>(null);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    useEffect(() => {
        userDataFromRedux && setEmail(userDataFromRedux?.email);
    }, [userDataFromRedux]);

    return (
        <div>
            <Wrapper themestyles={themeContext.themeStyles}>
                <Description>
                    <Title themestyles={themeContext.themeStyles}>
                        <h3>
                            Contact email
                        </h3>
                    </Title>
                    <SubTitle themestyles={themeContext.themeStyles}>
                        <h5>
                            The address to which information about the services used in this account is sent.
                        </h5>
                    </SubTitle>
                </Description>
                <EmailAdressInner themestyles={themeContext.themeStyles} to={"/settings/change-email-checking"}>
                    <Email themestyles={themeContext.themeStyles}>
                        <span>
                            {email}
                        </span>
                    </Email>
                    <div>
                        <FontAwesomeIcon color={themeContext.themeStyles.color} size="lg" icon={faAngleRight} />
                    </div>
                </EmailAdressInner>
            </Wrapper>
        </div>
    )
}