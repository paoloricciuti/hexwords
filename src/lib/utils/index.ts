const isHex = (hex: string) => /^#?[0-9a-f]{3}[0-9a-f]?$/gi.test(hex) || /^#?[0-9a-f]{6}([0-9a-f]{2})?$/gi.test(hex);

const hexToRgb = (hex: string) => {
    let [, r, rr, g, gg, b, bb, a, aa] = hex;
    if (hex.length < 6) {
        [, r, g, b, a] = hex;
        rr = r;
        gg = g;
        bb = b;
        aa = a;
    }
    const retval = [parseInt(`${r}${rr}`, 16), parseInt(`${g}${gg}`, 16), parseInt(`${b}${bb}`, 16)];
    if (a && aa) {
        retval.push(parseInt(`${a}${aa}`, 16));
    }
    return retval;
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
    isHex,
    hexToRgb,
    distance,
};