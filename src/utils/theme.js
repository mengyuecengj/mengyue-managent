export function handleThemeStyle(theme) {
    document.documentElement.style.setProperty('--el-color-primary', theme);
    for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, getLightColor(theme, i / 10));
    }
    for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, getDarkColor(theme, i / 10));
    }
}
export function hexToRgb(str) {
    str = str.replace('#', '');
    const hexs = str.match(/../g);
    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        rgb[i] = parseInt(hexs[i], 16);
    }
    return rgb;
}
export function rgbToHex(r, g, b) {
    const hexs = [r.toString(16), g.toString(16), b.toString(16)];
    for (let i = 0; i < 3; i++) {
        if (hexs[i].length === 1) {
            hexs[i] = `0${hexs[i]}`;
        }
    }
    return `#${hexs.join('')}`;
}
export function getLightColor(color, level) {
    const rgb = hexToRgb(color);
    for (let i = 0; i < 3; i++) {
        rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
    }
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
export function getDarkColor(color, level) {
    const rgb = hexToRgb(color);
    for (let i = 0; i < 3; i++) {
        rgb[i] = Math.floor(rgb[i] * (1 - level));
    }
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
