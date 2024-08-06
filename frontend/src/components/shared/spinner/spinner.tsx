import { FC, useContext } from "react";
import { Oval } from "react-loader-spinner";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface LoadingProps {
  size: number;
  height: number;
}

export const Spinner: FC<LoadingProps> = ({ size, height }) => {
  const themeContext = useContext<ThemeContextType>(ThemeContext);

  return (
    <Oval
      visible={true}
      height={size}
      width={size}
      strokeWidth={height}
      color={themeContext.themeStyles.loaderColor}
      secondaryColor={themeContext.themeStyles.loaderColor}
      ariaLabel="oval-loading"
      wrapperStyle={{ margin: "0 auto", width: "fit-content" }}
    />
  )
}