export const urlCleanup = () => {
    const currentUrl = window.location.href;
    const sl = currentUrl.split("#");
    const url = sl[0] + "#" + sl[1];

    if (sl.length > 2) {
        window.location.href = url;
    }
}