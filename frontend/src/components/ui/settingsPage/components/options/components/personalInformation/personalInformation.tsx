import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { Item } from "./component/item/item";
import { AuthorizedContext, AuthorizedContextType } from "../../../../../../../contexts/authorizedContext/authorizedContext";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { UserDataType } from "../../../../../../../redux/reducers/userReducer/types";
import { BtnLogOutInner, Container, List } from "./styledPersonalInformation";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";

export const PersonalInformation = () => {
    const [userData, setUserData] = useState<null | UserDataType>(null);
    const authorizedContext = useContext<AuthorizedContextType>(AuthorizedContext);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const navigate = useNavigate();

    const getLogOut = () => {
        authorizedContext.logOut();
        removeDataFromLocalStorage("token");
        navigate("/");
    }

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
            <BtnLogOutInner>
                <ButtonComponent
                    backgroundColor="#a71616"
                    BackgroundColorHover="#820e0e"
                    text="Log out"
                    color="#fff"
                    type="button"
                    func={getLogOut} />
            </BtnLogOutInner>
        </Container>
    )
}