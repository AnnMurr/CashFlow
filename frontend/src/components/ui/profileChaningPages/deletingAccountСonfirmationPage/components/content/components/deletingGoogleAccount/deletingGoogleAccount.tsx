import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../../../../shared/button/button";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { BtnInner, Description, SubTitle, Title } from "./styledDeletingGoogleAccount";

export const DeletingGoogleAccount: FC = () => {
  const themeContext = useContext<ThemeContextType>(ThemeContext);
  const navigate = useNavigate();

  const deleteGoogleAccount = () => {
    navigate("/settings/deleting-account");
  }

  return (
    <>
      <Description>
        <Title themestyles={themeContext.themeStyles}>
          <h3>Delete Your Account</h3>
        </Title>
        <SubTitle themestyles={themeContext.themeStyles}>
          <h5>Proceed with caution: Deleting your account will remove all personalized settings and data.</h5>
        </SubTitle>
      </Description>
      <BtnInner>
        <ButtonComponent
          backgroundColor="#a71616"
          BackgroundColorHover="#820e0e"
          text="Delete Google Account"
          color="#fff"
          type="button"
          func={deleteGoogleAccount}
        />
      </BtnInner>
    </>
  )
}