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

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
