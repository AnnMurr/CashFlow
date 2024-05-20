import { Oval } from "react-loader-spinner";
import { FC } from "react";
interface LoadingProps {
  size: number;
  height: number;
}

export const Loading: FC<LoadingProps> = ({ size, height }) => {
  return (
    <Oval
      visible={true}
      height={size}
      width={size}
      strokeWidth={height}
      color="#464F41"
      secondaryColor="#464F41"
      ariaLabel="oval-loading"
      wrapperStyle={{margin: "0 auto", width: "fit-content"}}
    />
  )
}