import 'server-only';

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike, or } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Configuration de la base de données
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not set');
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool);

// Schéma de la base de données
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Types
export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export const insertProductSchema = createInsertSchema(products);

// Validation des entrées
const searchParamsSchema = z.object({
  search: z.string().optional(),
  offset: z.number().min(0).default(0),
  limit: z.number().min(1).max(100).default(10)
});

export async function getProducts(
  search: string,
  offset: number,
  limit: number = 10
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  const validatedParams = searchParamsSchema.parse({ search, offset, limit });

  const [result, countResult] = await Promise.all([
    db
      .select()
      .from(products)
      .where(
        or(
          ilike(products.name, `%${validatedParams.search}%`),
          ilike(products.imageUrl, `%${validatedParams.search}%`)
        )
      )
      .orderBy(products.name)
      .limit(validatedParams.limit)
      .offset(validatedParams.offset),

    db
      .select({ count: count() })
      .from(products)
      .where(
        or(
          ilike(products.name, `%${validatedParams.search}%`),
          ilike(products.imageUrl, `%${validatedParams.search}%`)
        )
      )
  ]);

  const total = countResult[0]?.count ?? 0;
  const newOffset = result.length > 0 ? validatedParams.offset + validatedParams.limit : null;

  return {
    products: result,
    newOffset,
    totalProducts: total
  };
}

export async function getProductsById(id: number): Promise<SelectProduct | null> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid product ID');
  }

  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function deleteProductById(id: number): Promise<void> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid product ID');
  }

  await db.delete(products).where(eq(products.id, id));
}
