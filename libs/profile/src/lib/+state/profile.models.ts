import { User } from '@dev-together/auth';

export type Profile = Omit<User, 'token' | 'email'> & { following: boolean };
