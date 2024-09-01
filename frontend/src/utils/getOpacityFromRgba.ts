export const getOpacityFromRgba = (rgba: string) => {
    const match = rgba.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);

    return match ? parseFloat(match[1]) : null;
}