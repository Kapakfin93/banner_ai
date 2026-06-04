import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const generationJobs = mysqlTable("generation_jobs", {
  id: serial("id").primaryKey(),
  brandName: varchar("brand_name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  tagline: varchar("tagline", { length: 500 }),
  contactInfo: text("contact_info"),
  bannerSize: varchar("banner_size", { length: 50 }).notNull(),
  designStyle: varchar("design_style", { length: 100 }).notNull(),
  primaryColor: varchar("primary_color", { length: 20 }).notNull(),
  secondaryColor: varchar("secondary_color", { length: 20 }).notNull(),
  visualElements: text("visual_elements"),
  targetAudience: varchar("target_audience", { length: 100 }).notNull(),
  mood: varchar("mood", { length: 100 }).notNull(),
  additionalNotes: text("additional_notes"),
  prompt: text("prompt").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  imageUrl: text("image_url"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});
