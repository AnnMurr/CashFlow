import { AlertComponentProps } from "../components/shared/alert/alert";

type GetAlertType = (data: AlertComponentProps, setIsAlertActive: (value: AlertComponentProps | null) => void, delay: number) => void;

export const getAlert: GetAlertType = (data, setIsAlertActive, delay) => {
    setIsAlertActive({ type: data.type, text: data.text });
    setTimeout(() => setIsAlertActive(null), delay);
}