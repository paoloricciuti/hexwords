import { cubicOut } from 'svelte/easing';

/*
 * Drop in replacement for built-in fly with support for units (particularly `%`)
 * derived from: https://github.com/sveltejs/svelte/pull/6050
 */
export function fly(node: any, {
    delay = 0,
    duration = 400,
    easing = cubicOut,
    x = 0,
    y = 0,
    opacity = 0
}: { delay?: number, duration?: number, easing?: any, x?: string | number, y?: string | number, opacity?: number; }) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;

    const od = target_opacity * (1 - opacity);
    let xValue: number;
    let xUnit: string = 'px';
    if (typeof x === "number") {
        xValue = x;
    }
    if (typeof x === 'string') {
        const xMatch = x.match(/([-\d.]+)(\D+)/);
        xValue = Number(xMatch?.[1]);
        xUnit = xMatch?.[2] || "";
    }
    let yValue: number;
    let yUnit = 'px';
    if (typeof y === "number") {
        yValue = y;
    }
    if (typeof y === 'string') {
        const yMatch = y.match(/([-\d.]+)(\D+)/);
        yValue = Number(yMatch?.[1]);
        yUnit = yMatch?.[2] || "";
    }

    return {
        delay,
        duration,
        easing,
        css: (t: any, u: any) => `
				transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
				opacity: ${target_opacity - (od * u)}`
    };
}