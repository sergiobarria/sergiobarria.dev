import { atom } from 'nanostores';

import type { Post } from 'notion/client';

export const posts = atom<Post[]>([]);
export const searchQuery = atom<string>('');
