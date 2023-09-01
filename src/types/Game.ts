import { Platform } from "./Platform";
import { Tag } from "./Tag";

type Platforms = {
  platform: Platform
}

export type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  platforms: Platforms[];
  tags: Tag[];
}