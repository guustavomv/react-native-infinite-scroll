import { Game } from "./Game";

export type GameApiResponse = {
  next: string;
  results: Game[]
}