import { FC, useContext } from "react";
import { Oval } from "react-loader-spinner";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface LoadingProps {
  size: number;
  height: number;
  color?: string;
}

export const Spinner: FC<LoadingProps> = ({ size, height, color }) => {
  const themeContext = useContext<ThemeContextType>(ThemeContext);

  return (
    <Oval
      visible={true}
      height={size}
      width={size}
      strokeWidth={height}
      color={color ? color : themeContext.themeStyles.loaderColor}
      secondaryColor={color ? color : themeContext.themeStyles.loaderColor}
      ariaLabel="oval-loading"
      wrapperStyle={{ margin: "0 auto", width: "fit-content" }}
    />
  )
}