import { Colour } from "./colour";

export interface Car {
    group(): any;
    brand: string;
    model: string;
    colours: Colour[];
}