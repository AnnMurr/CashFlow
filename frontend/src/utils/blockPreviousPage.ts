export const blockPreviousPage = () => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
        window.history.forward();
    };
}