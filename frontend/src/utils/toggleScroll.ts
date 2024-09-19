export const hideScroll = (): void => {
    document.body.style.overflowY = 'hidden';
}

export const addScroll = (): void => {
    document.body.style.overflowY = 'auto';
}