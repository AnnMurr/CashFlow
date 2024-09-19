export const blockPreviousPage = (): void => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
        window.history.forward();
    };
}