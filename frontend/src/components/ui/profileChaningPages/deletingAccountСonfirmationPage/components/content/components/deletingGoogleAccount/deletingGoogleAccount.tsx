import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../../../../shared/button/button";
import { Description, SubTitle, Title } from "./styledDeletingGoogleAccount";

export const DeletingGoogleAccount: FC = () => {
  const navigate = useNavigate();
  const deleteGoogleAccount = () => {
    navigate("/settings/deleting-account");
  }

  return (
    <>
      <Description>
        <Title>
          <h3>Delete Your Account</h3>
        </Title>
        <SubTitle>
          <h5>Proceed with caution: Deleting your account will remove all personalized settings and data.</h5>
        </SubTitle>
      </Description>
      <ButtonComponent
        backgroundColor="#a71616"
        BackgroundColorHover="#820e0e"
        text="Delete Google Account"
        color="#fff"
        type="button"
        func={deleteGoogleAccount}
      />
    </>
  )
}