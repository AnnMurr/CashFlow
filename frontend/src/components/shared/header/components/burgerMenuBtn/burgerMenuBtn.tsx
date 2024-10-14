import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface BurgerMenuBtnProps {
    color: string;
    setIsSideBarActive: (value: ((prev: boolean) => boolean)) => void;
}

export const BurgerMenuBtn: FC<BurgerMenuBtnProps> = ({ color, setIsSideBarActive }) => {
    return (
        <div>
            <button
                onClick={() => setIsSideBarActive((prev) => !prev)}
                type="button">
                <FontAwesomeIcon size="xl" color={color} icon={faBars} />
            </button>
        </div>
    )
}