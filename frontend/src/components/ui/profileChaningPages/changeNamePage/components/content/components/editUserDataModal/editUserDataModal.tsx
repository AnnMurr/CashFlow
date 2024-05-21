import { FC, useState } from "react";
import { updateUserData } from "../../../../../../../../redux/reducers/userReducer/userReducer";
import { UserDataType } from "../../../../../../../../redux/reducers/userReducer/types";
import { useAppDispatch, useAppSelector } from "../../../../../../../../redux/store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { OutlinedInput } from "@mui/material";
import { AlertComponentProps } from "../../../../../../../shared/alert/alert";
import { ButtonComponent } from "../../../../../../../shared/button/button";
import { BtnClose } from "../../../../../../../shared/btnClose/btnClose";
import { Container, Wrapper, BtnCloseInner } from "./styledEditUserDataModal";
interface EditUserDataModalProps {
    setIsModalActive: (value: boolean) => void;
    userData: string | undefined | null;
    changeUserData: (value: string) => void;
    setIsAlertActive: (value: null | AlertComponentProps) => void;
}

export const EditUserDataModal: FC<EditUserDataModalProps> = ({
    setIsModalActive,
    userData,
    changeUserData,
    setIsAlertActive }) => {

    const [value, setValue] = useState<string | undefined | null>(userData);
    const [error, setError] = useState<boolean>(false);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const dispatch = useAppDispatch();

    const changeData = async () => {
        value && value.length < 2 && setIsAlertActive({ type: "error", text: "Minimum length is 2 characters" });
        value && value.length > 20 && setIsAlertActive({ type: "error", text: "Maximum length is 20 characters" });

        if (value && value.length >= 2 && value.length <= 20) {
            try {
                if (userDataFromRedux) {
                    const changedData = {
                        ...userDataFromRedux,
                        name: value
                    }

                    const resultAction = await dispatch(updateUserData(changedData));
                    const response = unwrapResult(resultAction);

                    if (response) {
                        changeUserData(value);
                        setIsModalActive(false);

                        setIsAlertActive({
                            text: response,
                            type: "success"
                        });
                        setTimeout(() => setIsAlertActive(null), 2000);
                    }
                }
            } catch (error) {
                setIsAlertActive({
                    text: "failed to update",
                    type: "error"
                });
                setTimeout(() => setIsAlertActive(null), 2000);
                console.error(error);
            }
        } else {
            setError(true);
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
                        error={error}
                        maxRows={20}
                        value={value}
                        onChange={(event) => setValue((prev => prev = event.target.value.trimStart()))}
                        size="small"
                        placeholder="Name" />
                </div>
                <div>
                    <ButtonComponent
                        disabledValue={userData === value ? true : false}
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Save"
                        color="#fff"
                        type="button"
                        func={changeData} />
                </div>
            </Wrapper>
        </Container>
    )
}