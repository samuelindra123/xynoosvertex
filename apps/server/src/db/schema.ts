import { pgTable, uuid, varchar, boolean, timestamp, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  // Profile fields
  alias: varchar('alias', { length: 64 }).unique(),          // custom @handle
  bio: text('bio'),
  website: varchar('website', { length: 512 }),
  avatarUrl: varchar('avatar_url', { length: 1024 }),        // Appwrite URL later
  // Auth tokens
  verificationToken: varchar('verification_token', { length: 255 }),
  verificationTokenExpiresAt: timestamp('verification_token_expires_at'),
  resetToken: varchar('reset_token', { length: 255 }),
  resetTokenExpiresAt: timestamp('reset_token_expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
