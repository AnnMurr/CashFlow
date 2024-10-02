import { AlertComponentProps } from "../components/shared/alert/alert";

type showAlertType = (
    data: AlertComponentProps,
    setIsAlertActive: (value: AlertComponentProps | null) => void,
    delay: number) => void;

export const showAlert: showAlertType = (data, setIsAlertActive, delay) => {
    setIsAlertActive({ type: data.type, text: data.text });
    setTimeout(() => setIsAlertActive(null), delay);
}