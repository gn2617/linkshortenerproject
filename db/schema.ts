import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  originalUrl: text('original_url').notNull(),
  shortCode: text('short_code').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type Link = InferSelectModel<typeof links>;
export type NewLink = InferInsertModel<typeof links>;
