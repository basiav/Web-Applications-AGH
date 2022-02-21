import { Dish } from "./dish.model";

export type Reservations = Map<Dish["id"], number>;

export type CartReservations = Map<Dish, number>;