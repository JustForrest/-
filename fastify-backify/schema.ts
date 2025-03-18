import { pgTable, uuid, varchar, integer, text, jsonb, timestamp, foreignKey } from 'drizzle-orm/pg-core';

// Company Table
export const company = pgTable('company', {
  companyId: uuid('company_id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address'),
  phone: varchar('phone', { length: 20 }),
  customFields: jsonb('custom_fields').default({}),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Office Table
export const office = pgTable('office', {
  officeId: uuid('office_id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address'),
  phone: varchar('phone', { length: 20 }),
  companyId: uuid('company_id').notNull().references(() => company.companyId),
  customFields: jsonb('custom_fields').default({}),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Agent Table
export const agent = pgTable('agent', {
  agentId: uuid('agent_id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  licenseNumber: varchar('license_number', { length: 50 }),
  officeId: uuid('office_id').notNull().references(() => office.officeId),
  customFields: jsonb('custom_fields').default({}),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Property Table
export const property = pgTable('property', {
  propertyId: uuid('property_id').primaryKey().defaultRandom(),
  address: text('address').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  zip: varchar('zip', { length: 10 }).notNull(),
  price: integer('price').notNull(),
  bedrooms: integer('bedrooms'),
  bathrooms: integer('bathrooms'),
  agentId: uuid('agent_id').notNull().references(() => agent.agentId),
  officeId: uuid('office_id').notNull().references(() => office.officeId),
  companyId: uuid('company_id').notNull().references(() => company.companyId),
  customFields: jsonb('custom_fields').default({}),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// CustomFieldsDefinition Table
export const customFieldsDefinition = pgTable('custom_fields_definition', {
  definitionId: uuid('definition_id').primaryKey().defaultRandom(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // e.g., 'property', 'agent'
  fieldName: varchar('field_name', { length: 100 }).notNull(),
  fieldLabel: varchar('field_label', { length: 100 }).notNull(),
  fieldType: varchar('field_type', { length: 50 }).notNull(), // e.g., 'text', 'number'
  officeId: uuid('office_id').references(() => office.officeId),
  companyId: uuid('company_id').references(() => company.companyId),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Media Table
export const media = pgTable('media', {
  mediaId: uuid('media_id').primaryKey().defaultRandom(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // e.g., 'property', 'agent'
  entityId: uuid('entity_id').notNull(), // References the UUID of the entity
  mediaType: varchar('media_type', { length: 50 }).notNull(), // e.g., 'photo', 'video'
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});