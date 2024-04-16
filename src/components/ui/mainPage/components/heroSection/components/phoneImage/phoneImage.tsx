import { FC } from "react";

interface PhoneImageType {
    link: string;
    altText: string;
}

export const PhoneImage: FC<PhoneImageType> = ({ link, altText }) => {
    return (
        <div>
            <img src={link} alt={altText} />
        </div>
    )
}