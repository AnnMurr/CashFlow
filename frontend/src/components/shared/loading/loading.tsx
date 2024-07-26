import { Oval } from "react-loader-spinner";
import { FC } from "react";
interface LoadingProps {
  size: number;
  height: number;
  color?: string;
}

export const Loading: FC<LoadingProps> = ({ size, height, color }) => {
  return (
    <Oval
      visible={true}
      height={size}
      width={size}
      strokeWidth={height}
      color={color ? color : "#464F41"}
      secondaryColor={color ? color : "#464F41"}
      ariaLabel="oval-loading"
      wrapperStyle={{ margin: "0 auto", width: "fit-content" }}
    />
  )
}