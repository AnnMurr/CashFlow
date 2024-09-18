import { EMAIL_PATTERN } from "../consts/index";

type CheckEmailValidity =
    (email: string, setIsError: (setIsError: boolean) => void) => boolean;

export const checkEmailValidity: CheckEmailValidity = (email, setIsError) => {
    if (email.length > 0 && !!email.match(EMAIL_PATTERN)) {
        setIsError(false);
        return true;
    } else {
        setIsError(true);
        return false;
    }
}