import { useContext, useEffect, useState } from "react";
import { getUserDataById } from "../../../../../../../api/authApi/authApi";
import { UserDataType } from "../../../../../../../api/authApi/authApiTypes";
import { getDataFromLocalStorage, removeDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { Item } from "./component/item/item";
import { BtnLogOutInner, Container, List } from "./styledPersonalInformation";
import { AuthorizedContext, AuthorizedContextType } from "../../../../../../../contexts/authorizedContext/authorizedContext";
import { useNavigate } from "react-router-dom";

export const PersonalInformation = () => {
    const [userData, setUserData] = useState<null | UserDataType>(null);
    const authorizedContext = useContext<AuthorizedContextType>(AuthorizedContext);
    const navigate = useNavigate()

    const getUserData = async () => {
        try {
            const token = getDataFromLocalStorage("token");
            const response = await getUserDataById(token);
            setUserData(response);
        } catch (error) {
            console.error(error);
        }
    }

    const getLogOut = () => {
        authorizedContext.logOut();
        removeDataFromLocalStorage("token");
        navigate("/");
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Container>
            <List>
                {userData ?
                    <>
                        <Item link={"/settings/change-name"} category={"Name"} value={userData.name} />
                        <Item link={"/settings/change-email"} category={"Email"} value={userData.email} />
                        <Item link={"/settings/change-password"} category={"Password"} value={userData.password} />
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