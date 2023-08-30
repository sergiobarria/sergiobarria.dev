import { mysqlTable, serial, varchar, int, uniqueIndex, mysqlEnum } from 'drizzle-orm/mysql-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

// ===== DATABASE SCHEMAS =====
export const posts = mysqlTable(
    'posts',
    {
        id: serial('id').primaryKey(),
        slug: varchar('slug', { length: 256 }).notNull().unique(),
        views: int('views').notNull().default(0),
        language: mysqlEnum('language', ['en', 'es']).notNull().default('en')
    },
    posts => ({
        slugIndex: uniqueIndex('slug_idx').on(posts.slug)
    })
);

// ===== DATABASE TYPES =====
export type DBPost = InferSelectModel<typeof posts>;
export type NewDBPost = InferInsertModel<typeof posts>;
