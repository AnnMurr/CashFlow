import { useContext, useEffect, useState } from "react";
import { Item } from "./component/item/item";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { UserDataType } from "../../../../../../../redux/reducers/userReducer/types";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Container, List } from "./styledPersonalInformation";

export const PersonalInformation = () => {
    const [userData, setUserData] = useState<null | UserDataType>(null);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    useEffect(() => {
        userDataFromRedux && setUserData(userDataFromRedux)
    }, [userDataFromRedux]);

    return (
        <Container>
            <List themestyles={themeContext.themeStyles}>
                {userData ?
                    <>
                        <Item
                            link={"/settings/change-name"}
                            category={"Name"}
                            value={userData.name} />
                        <Item
                            link={"/settings/change-email"}
                            category={"Email"}
                            value={userData.email} />
                        {userData.password &&
                            <Item
                                link={"/settings/change-password"}
                                category={"Password"}
                                value={userData.password} />}
                    </>
                    : null}
            </List>
        </Container>
    )
}