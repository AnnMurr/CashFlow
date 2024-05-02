import { FC, useState } from "react";
import { OutlinedInput } from "@mui/material";
import { ButtonComponent } from "../../shared/button/button";
import { BtnClose } from "../../shared/btnClose/btnClose";
import { Container, Wrapper, BtnCloseInner } from "./styledEditUserDataModal";
import { getUserDataById, updateUserData } from "../../../api/authApi/authApi";
import { getDataFromLocalStorage } from "../../../storage/localStorage/localStorage";

interface EditUserDataModalProps {
    setIsModalActive: (value: boolean) => void;
    userData: string;
    changeUserData: (value: string) => void;
}

export const EditUserDataModal: FC<EditUserDataModalProps> = ({ setIsModalActive, userData, changeUserData }) => {
    const [value, setValue] = useState<string>(userData);

    const changeData = async () => {
        try {
            const token = getDataFromLocalStorage("token");
            const userData = await getUserDataById(token);

            const changedData = {
                ...userData,
                name: value
            }

            const response = await updateUserData(token, changedData);
            changeUserData(value);
            setIsModalActive(false);
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Wrapper>
                <BtnCloseInner>
                    <BtnClose func={() => setIsModalActive(false)} />
                </BtnCloseInner>
                <div>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            width: "100%",
                            fontSize: "14px"
                        }}
                        value={value}
                        onChange={(event) => setValue((prev => prev = event.target.value))}
                        size="small"
                        placeholder="Name" />
                </div>
                <div>
                    <ButtonComponent
                        disabledValue={userData === value ? true : false}
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Edit"
                        color="#fff"
                        type="button"
                        func={changeData} />
                </div>
            </Wrapper>
        </Container>
    )
}