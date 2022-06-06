export interface IHexWord {
    word: string;
    hex: string;
    score: number;
}

type SizeUnits = "em" | "ex" | "%" | "px" | "cm" | "mm" | "in" | "pt" | "pc" | "ch" | "rem" | "vh" | "vw" | "vmin" | "vmax";

export type Size = `${number}${SizeUnits}`;
export interface Snackbar {
    id?: number,
    message: string,
    closable?: boolean,
    timeout?: number,
}
