import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';

export const timestamp = {
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .$onUpdate(() => new Date())
    .defaultNow(),
  createdAt: t
    .timestamp('created_at', { withTimezone: true, mode: 'date' })
    .defaultNow(),
};

export const userStatus = t.pgEnum('userStatus', [
  'customer',
  'admin',
  'team-member',
]);

export const productStatus = t.pgEnum('productStatus', ['draft', 'published']);

export const orderStatus = t.pgEnum('orderStatus', [
  'paid',
  'cancelled',
  'pending',
]);

export const contactSubject = t.pgEnum('contactSubject', [
  'franchise',
  'supplier',
]);

export const UserTable = t.pgTable(
  'users',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    firstName: t.varchar('first_name', { length: 100 }).notNull(),
    lastName: t.varchar('last_name', { length: 100 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull(),
    clerkUserId: t.varchar('clerk_user_id', { length: 100 }).notNull().unique(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    status: userStatus('status').notNull().default('customer'),
    ...timestamp,
  },
  (table) => [t.uniqueIndex('user_clerk_id_idx').on(table.clerkUserId)],
);

export const AddressTable = t.pgTable('addresses', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  address1: t.varchar('address_1', { length: 100 }).notNull(),
  address2: t.varchar('address_2', { length: 100 }),
  city: t.varchar('city', { length: 50 }).notNull(),
  state: t.varchar('state', { length: 20 }).notNull(),
  zip: t.varchar('zip', { length: 20 }),
  country: t.varchar('country', { length: 50 }).notNull(),
  isDefault: t.boolean('is_default').notNull().default(false),
  ...timestamp,
});

export const ProductTable = t.pgTable('products', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  sku: t.varchar('sku', { length: 50 }).notNull().unique(),
  sanitySlug: t.varchar('sanity_slug', { length: 255 }).notNull().unique(),
  basePriceInCents: t.integer('base_price_in_cents').notNull(),
  imageUrl: t.varchar('image_url').notNull(),
  numberInStock: t.integer('number_in_stock').notNull(),
  brand: t.varchar('brand', { length: 50 }).notNull(),
  status: productStatus('status').notNull().default('draft'),
  isDeleted: t.boolean('is_deleted').notNull().default(false),
  ...timestamp,
});

export const ProductVariantTable = t.pgTable(
  'product_variants',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    originalProductId: t
      .uuid('original_product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .notNull(),
    sku: t.varchar('sku', { length: 50 }).notNull().unique(),
    basePriceInCents: t.integer('base_price_in_cents'),
    imageUrl: t.varchar('image_url').notNull(),
    numberInStock: t.integer('number_in_stock').notNull(),
    color: t.varchar('color', { length: 50 }).notNull(),
    size: t.varchar('size', { length: 50 }),
    fit: t.varchar('fit', { length: 20 }),

    ...timestamp,
  },
  (table) => [t.index('product_variant_idx').on(table.originalProductId)],
);

export const OrderTable = t.pgTable(
  'orders',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'set null' })
      .notNull(),
    stripeCheckoutSessionId: t
      .varchar('stripe_checkout_session_id', { length: 255 })
      .unique(),
    stripePaymentIntentId: t
      .varchar('stripe_payment_intent_id', { length: 255 })
      .unique(),
    status: orderStatus('status').notNull().default('pending'),
    totalInCentsSnapshot: t.integer('total_in_cents_snapshot').notNull(),
    ...timestamp,
  },
  (table) => [
    t.index('user_order_idx').on(table.userId),
    t.check('total_check', sql`${table.totalInCentsSnapshot} > 0`),
  ],
);

export const OrderItemTable = t.pgTable(
  'order-items',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    variantId: t
      .uuid('variant_id')
      .references(() => ProductVariantTable.id, { onDelete: 'cascade' })
      .notNull(),
    OrderId: t
      .uuid('order_id')
      .references(() => OrderTable.id, { onDelete: 'cascade' })
      .notNull(),
    quantity: t.integer('quantity').notNull().default(1),
    basePriceInCentsSnapshot: t
      .integer('base_price_in_cents_snapshot')
      .notNull(),
    ...timestamp,
  },
  (table) => [
    t.check('base_price_check', sql`${table.basePriceInCentsSnapshot} > 0`),
  ],
);

export const ReviewTable = t.pgTable(
  'reviews',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    productId: t
      .uuid('product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .notNull(),
    title: t.text('title').notNull(),
    reviewedAt: t
      .timestamp('reviewed_at', { withTimezone: true, mode: 'date' })
      .notNull()
      .defaultNow(),
    body: t.text('body').notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    rating: t.integer('rating').notNull().default(1),
    ...timestamp,
  },
  (table) => [
    t.uniqueIndex('user_product_idx').on(table.userId, table.productId),
    t.check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
  ],
);

export const NewsletterSubscriptionTable = t.pgTable(
  'newsletter_subscriptions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    email: t.varchar('email', { length: 255 }).notNull().unique(),
    ...timestamp,
  },
);

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  fullName: t.varchar('fullname', { length: 100 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  phone: t.varchar('phone', { length: 255 }).notNull(),
  subject: contactSubject('subject').notNull().default('franchise'),
  message: t.text('message').notNull(),
  ...timestamp,
});

export const CareerTable = t.pgTable('careers', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  name: t.varchar('name', { length: 255 }).notNull(),
  isOpen: t.boolean('is_open').notNull().default(true),
  isDeleted: t.boolean('is_deleted').notNull().default(false),
  sanitySlug: t.varchar('sanity_slug', { length: 255 }).notNull().unique(),
  ...timestamp,
});

export const ApplicationTable = t.pgTable('applications', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  careerId: t
    .uuid('career_id')
    .references(() => CareerTable.id, { onDelete: 'cascade' })
    .notNull(),
  firstName: t.varchar('first_name', { length: 20 }).notNull(),
  lastName: t.varchar('last_name', { length: 20 }).notNull(),
  email: t.varchar('email', { length: 100 }).notNull(),
  phone: t.varchar('phone', { length: 20 }).notNull(),
  resumeUrl: t.varchar('resume_url', { length: 255 }).notNull(),
  ...timestamp,
});

export const PreviousEmployerTable = t.pgTable('previous_employers', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  applicationId: t
    .uuid('application_id')
    .references(() => ApplicationTable.id, { onDelete: 'cascade' })
    .notNull(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  phone: t.varchar('phone', { length: 20 }).notNull(),
  startDate: t
    .timestamp('start_date', { withTimezone: true, mode: 'date' })
    .notNull(),
  endDate: t.timestamp('end_date', { withTimezone: true, mode: 'date' }),
  reasonForLeaving: t.text('reason_for_leaving').notNull(),
  position: t.varchar('position', { length: 100 }).notNull(),
  ...timestamp,
});

// Relations
export const UserTableRelations = relations(UserTable, ({ many }) => ({
  addresses: many(AddressTable),
  orders: many(OrderTable),
  reviews: many(ReviewTable),
}));

export const AddressTableRelations = relations(AddressTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AddressTable.userId],
    references: [UserTable.id],
  }),
}));

export const ProductTableRelations = relations(ProductTable, ({ many }) => ({
  reviews: many(ReviewTable),
  variants: many(ProductVariantTable),
}));

export const ProductVariantTableRelations = relations(
  ProductVariantTable,
  ({ one, many }) => ({
    orderItems: many(OrderItemTable),
    product: one(ProductTable, {
      fields: [ProductVariantTable.originalProductId],
      references: [ProductTable.id],
    }),
  }),
);

export const OrderTableRelations = relations(OrderTable, ({ many }) => ({
  orderItems: many(OrderItemTable),
}));

export const OrderItemTableRelations = relations(OrderItemTable, ({ one }) => ({
  product: one(ProductVariantTable, {
    fields: [OrderItemTable.variantId],
    references: [ProductVariantTable.id],
  }),
  order: one(OrderTable, {
    fields: [OrderItemTable.OrderId],
    references: [OrderTable.id],
  }),
}));

export const CareerTableRelations = relations(CareerTable, ({ many }) => ({
  applications: many(ApplicationTable),
}));

export const ApplicationTableRelations = relations(
  ApplicationTable,
  ({ one, many }) => ({
    career: one(CareerTable, {
      fields: [ApplicationTable.careerId],
      references: [CareerTable.id],
    }),
    previousEmployers: many(PreviousEmployerTable),
  }),
);

export const PreviousEmployerTableRelations = relations(
  PreviousEmployerTable,
  ({ one }) => ({
    application: one(ApplicationTable, {
      fields: [PreviousEmployerTable.applicationId],
      references: [ApplicationTable.id],
    }),
  }),
);
