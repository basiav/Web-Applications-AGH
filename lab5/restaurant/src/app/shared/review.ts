export interface Review {
    dishId: number;
    nick: string;
    name: string;
    body: string[];
    date?: Date;
}