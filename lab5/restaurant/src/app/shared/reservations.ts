import { Dish } from "./dish";

export type Reservations = Map<Dish["id"], number>;

export type CartReservations = Map<Dish, number>;