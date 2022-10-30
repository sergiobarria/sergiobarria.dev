import type { MDXInstance } from 'astro';
import { atom } from 'nanostores';

import type { Post } from '~/shared/utils/blogPostsHelpers';

export const allPosts = atom<MDXInstance<Post>[]>([]);
export const searchQuery = atom<string>('');
