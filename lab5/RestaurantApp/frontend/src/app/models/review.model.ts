export interface Review {
    // dishId: number;
    // nick: string;
    // name: string;
    // body: string[];
    // date?: Date;
    // _id: string;
    dishId: number,
    author: string,
    reviewHead: string,
    reviewBody: string,
    purchaseDate?: Date
}