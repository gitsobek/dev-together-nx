import { Profile } from "@dev-together/profile";

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  favorites: number;
  favorited: boolean;
  author: Profile;
}

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}