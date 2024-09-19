export const getOpacityFromRgba = (rgba: string): number | null => {
    const match = rgba.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);

    return match ? parseFloat(match[1]) : null;
}