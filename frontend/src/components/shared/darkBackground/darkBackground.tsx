import { FC, useRef, useEffect } from "react";
import { addScroll, hideScroll } from "../../../utils/toggleScroll";
import { Container } from "./styledDarkBackground";

interface DarkBackgroundProps {
    setIsModalActive?: (value: boolean) => void;
    isModalActive?: boolean;
}

export const DarkBackground: FC<DarkBackgroundProps> = ({ setIsModalActive, isModalActive }) => {
    const darkBackgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutsideModal = (event: MouseEvent) => {
            if (darkBackgroundRef.current && darkBackgroundRef.current.contains(event.target as HTMLElement)) {
                isModalActive && setIsModalActive && setIsModalActive(false);
                addScroll();
            }
        }

        if (isModalActive) {
            window.addEventListener("click", handleClickOutsideModal);
            hideScroll();
        }

        return () => {
            window.removeEventListener("click", handleClickOutsideModal);
        };
    }, []);

    return (
        <Container ref={darkBackgroundRef}></Container>
    )
}
