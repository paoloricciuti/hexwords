const luminance = (r: number, g: number, b: number) => {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrast = (rgb1: number[], rgb2: number[]) => {
    var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05)
        / (darkest + 0.05);
};

const isHex = (hex: string) => /^#?[0-9a-f]{6}([0-9a-f]{2})?$/gi.test(hex);

const hexToRgb = (hex: string) => {
    const [pound, r, rr, g, gg, b, bb, a, aa] = hex;
    const retval = [parseInt(`${r}${rr}`, 16), parseInt(`${g}${gg}`, 16), parseInt(`${b}${bb}`, 16)];
    if (a && aa) {
        retval.push(parseInt(`${a}${aa}`, 16));
    }
    return retval;
};

const rgbToHex = (r: number, g: number, b: number, a?: number) => {
    return `#${r.toString(16)}${b.toString(16)}${g.toString(16)}${a !== undefined ? a.toString(16) : ''}`;
};

const mixAlpha = ([rr, gg, bb, aa]: number[], [r, g, b] = [255, 255, 255]) => {
    const factor = aa / 255;
    const retR = r * (1 - factor) + rr * factor;
    const retG = g * (1 - factor) + gg * factor;
    const retB = b * (1 - factor) + bb * factor;

    return [retR, retG, retB];
};

const distance = (color: string, color2: string) => {
    const colorRgb = hexToRgb(color);
    const color2Rgb = hexToRgb(color2);
    if (colorRgb.length === 3) {
        colorRgb.push(255);
    }
    if (color2Rgb.length === 3) {
        color2Rgb.push(255);
    }
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        sum += (colorRgb[i] - color2Rgb[i]) ** 2;
    }
    return Math.sqrt(sum);
};

export {
    luminance,
    contrast,
    isHex,
    hexToRgb,
    rgbToHex,
    mixAlpha,
    distance,
};